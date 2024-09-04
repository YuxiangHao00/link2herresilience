"""
FIT5120: IE Studio experience project
Project: Link2 HerResilience
Team: Harmony (TA18)
Author: Mandeep Singh

API to provide response for the pollen grain count of the city using the historical
data collected from TERN's Weekly pollen count
"""

import os
import pandas as pd
from flask import Flask, jsonify  # , request
from flask_restful import Resource, Api, reqparse
import json
import datetime
from flask_cors import CORS

app2_2 = Flask(__name__)
CORS(app2_2, resources={r"/*": {"origins": "*"}})
api = Api(app2_2, prefix="/allergic_pollen/v1")


class AllergicPollen(Resource):
    """
    class for the requests related to the allergic pollen grains
    """

    def __init__(self):
        """
        class constructor
        """
        self.parent_dir_path = os.path.dirname(os.getcwd())
        self.state = None
        # self.state_code_map = {'nsw': 1, 'vic': 2, 'qld': 3,
        #                        'sa': 4, 'wa': 5, 'tas': 6,
        #                        'nt': 7}

        self.b_from_files = True
        self.parser = reqparse.RequestParser()
        self.datadir_path = self.parent_dir_path + "/data/epic2/2.2/"

    def get(self):
        """
        GET request handler
        """
        self.parser.add_argument("state", type=str, location="args")
        self.args = self.parser.parse_args()
        self.state = self.args["state"]

        if self.state is not None:
            self.state_pollen_list = self.get_state_pollen_list()

            return self.state_pollen_list
        else:
            return self.get_state_pollen_list()

    def get_state_pollen_list(self, format="json"):
        """
        method to read the states pollen grains data
        """
        # states pollen grains data
        self.all_state_pollen_grains = None

        # read data from json
        if self.b_from_files:
            # load in dataframe
            with open(self.datadir_path + "pollen_grains_in_state.json", "r") as file:
                self.all_state_pollen_grains = json.load(file)

            if self.state is not None:
                # select query for subset data as per request
                curr_state_pollen_grains = self.all_state_pollen_grains[self.state]

                return curr_state_pollen_grains
            else:
                return self.all_state_pollen_grains


class StatePollenCount(AllergicPollen):
    """
    class for the pollen count in the state
    """

    def __init__(self):
        """
        class constructor
        """
        super().__init__()
        self.state = None
        self.pollen_grain = None
        self.duration = None

    def get(self):
        """
        GET request handler
        """
        # super().get()
        # AC2
        self.parser.add_argument("state", type=str, required=True, location="args")
        self.parser.add_argument("pollen", type=str, location="args")
        self.parser.add_argument("duration", type=int, location="args")
        self.args = self.parser.parse_args()
        self.state = self.args["state"]
        self.pollen_grain = self.args["pollen"]
        self.duration = self.args["duration"]

        self.state_pollen_count = None

        if self.pollen_grain is not None:
            self.state_pollen_count = self.get_state_pollen_count_data()

            return self.state_pollen_count
        else:
            return self.get_state_pollen_count_data()

    def get_state_pollen_count_data(self, format="json"):
        """
        method to get the state pollen count data (based on duration)
        """
        # load curr state pollens count
        with open(self.datadir_path + self.state + "_pollens_count.json", "r") as file:
            self.state_pollens_count = json.load(file)

        self.state_pollen_list = self.get_state_pollen_list()

        if self.pollen_grain is not None:
            # select query for pollen data
            df_subset = pd.DataFrame(self.state_pollens_count[self.pollen_grain])

            if self.duration is not None:
                curr_week = datetime.date.today().isocalendar().week
                df_subset = df_subset[
                    df_subset["week_number"]
                    >= max(curr_week - min(max(int(self.duration), 0), 52), 0)
                ]
                df_subset = df_subset[df_subset["week_number"] <= curr_week]

            if format == "json":
                return {
                    "pollen_list": self.state_pollen_list,
                    "pollens_count": json.loads(df_subset.to_json(orient="records")),
                }
            else:
                return df_subset
        else:
            return jsonify(
                {
                    "pollen_list": self.state_pollen_list,
                    "pollens_count": self.state_pollens_count,
                }
            )


api.add_resource(AllergicPollen, "/pollens")
api.add_resource(StatePollenCount, "/stateCount")


if __name__ == "__main__":
    app2_2.run(port=5002)
