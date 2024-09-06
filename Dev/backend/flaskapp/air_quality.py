"""
FIT5120: IE Studio experience project
Project: Link2 HerResilience
Team: Harmony (TA18)
Author: Mandeep Singh

API to provide response for the air quality of the city & suburbs using the 
data collected from the EPA air monitoring sites in Australian states
"""

import os
import pandas as pd
from flask import Flask, jsonify  # , request
from flask_restful import Resource, Api, reqparse
import json
from flask_cors import CORS

app2_1 = Flask(__name__)
CORS(app2_1, resources={r"/*": {"origins": "*"}})
api = Api(app2_1, prefix="/air_quality/v1")


class AirQuality(Resource):
    """
    class for the requests related to the bicycle crash
    """

    def __init__(self):
        """
        class constructor
        """
        self.parent_dir_path = os.path.dirname(os.getcwd())
        self.state = None
        self.state_code_map = {
            "nsw": 1,
            "vic": 2,
            "qld": 3,
            "sa": 4,
            "wa": 5,
            "tas": 6,
            "nt": 7,
        }

        self.b_from_files = True
        self.parser = reqparse.RequestParser()
        self.datadir_path = self.parent_dir_path + "/data/epic2/2.1/"
        self.list_aq_parameters = [
            "pm2_5",
            "pm10",
            "co",
            "no2",
            "so2",
            "aqc",
            "visibility",
        ]
        # self.buff = StringIO()

    def get(self):
        """
        GET request handler
        """
        self.parser.add_argument("state", type=str, location="args")
        self.args = self.parser.parse_args()
        self.state = self.args["state"]
        # print(self.state)
        # return {'data': self.state,
        #         'state_code': self.state_code_map[self.state]}
        if self.state is not None:
            self.state_aq_summary = self.get_state_aq_data(
                self.state_code_map[self.state]
            )

            return self.state_aq_summary
        else:
            return self.get_state_aq_data()

    def get_state_aq_data(self, state_code=1, format="json"):
        """
        method to read the states AQ data
        """
        # states AQ data path
        self.states_aqi = None

        # read data from csv/xlsx
        if self.b_from_files:
            # load in dataframe
            df_state_aq = pd.read_csv(self.datadir_path + "states_aq_data.csv")

            # aqi for all states
            self.states_aqi = df_state_aq[["state_code", "state", "date", "aqi", "aqc"]]

            if self.state is not None:
                # select query for subset data as per request
                df_subset = df_state_aq[df_state_aq["state_code"] == state_code]

                if format == "json":
                    return json.loads(
                        df_subset[["state", "date"] + self.list_aq_parameters].to_json(
                            orient="records", lines=True
                        )
                    )
                else:
                    return df_subset
            else:
                return json.loads(self.states_aqi.to_json(orient="records"))


class SuburbAirQuality(AirQuality):
    """
    class for the AQ in the suburb
    """

    def __init__(self):
        """
        class constructor
        """
        super().__init__()
        self.location = dict()
        self.location["lat"] = None
        self.location["long"] = None
        self.suburb = None
        self.suburb_code = None

    def get(self):
        """
        GET request handler
        """
        # super().get()
        # AC3
        self.parser.add_argument("state", type=str, required=True, location="args")
        self.parser.add_argument("suburb_code", type=int, location="args")
        self.parser.add_argument("suburb", type=str, location="args")
        self.args = self.parser.parse_args()
        self.state = self.args["state"]
        self.suburb_code = self.args["suburb_code"]
        self.suburb = self.args["suburb"]
        try:
            self.parser.add_argument("lat", type=float, required=True, location="args")
            self.parser.add_argument("long", type=float, required=True, location="args")
            self.location["lat"] = self.args["lat"]
            self.location["long"] = self.args["long"]
        except:
            # read from suburb data {TO DO}
            self.location["lat"] = -37.82
            self.location["long"] = 144.97
        # self.time = time
        self.suburb_aq_summary = self.get_suburb_aq_data()

        return self.suburb_aq_summary

    def get_suburb_aq_data(self, format="json"):
        """
        method to get the AQ data for suburb
        """
        # load curr state AQ dataframe
        self.df_curr_state_aq = pd.read_csv(
            self.datadir_path + self.state + "/" + self.state + "_aq_data.csv"
        )
        if self.suburb is not None:
            # select query for suburb data
            df_subset = self.df_curr_state_aq[
                self.df_curr_state_aq["site"] == self.suburb
            ][["site", "date"] + self.list_aq_parameters]

            if format == "json":
                return json.loads(df_subset.to_json(orient="records"))
            else:
                return df_subset
        else:
            return json.loads(
                self.df_curr_state_aq[
                    ["site", "date"] + self.list_aq_parameters
                ].to_json(orient="records")
            )


api.add_resource(AirQuality, "/states")
api.add_resource(SuburbAirQuality, "/suburbs")


if __name__ == "__main__":
    app2_1.run()
