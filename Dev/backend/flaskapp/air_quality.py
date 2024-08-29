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
from flask import Flask, jsonify, request
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)
api = Api(app, prefix="/air_quality/v1")

class AirQuality(Resource):
    '''
    class for the requests related to the bicycle crash
    '''
    def __init__(self):
        '''
        class constructor
        '''
        self.parent_dir_path = os.path.dirname(os.getcwd())
        self.state = 'nsw'
        self.state_code_map = {'nsw': 1, 'vic': 2, 'qld': 3,
                               'sa': 4, 'wa': 5, 'tas': 6, 'nt': 7}

        self.b_from_files=True
        self.parser = reqparse.RequestParser()


    def get(self):
        '''
        GET request handler
        '''
        self.args = self.parser.parse_args()
        self.state = self.args['state']
        self.state_aq_summary = self.get_state_aq_data(self.state_code_map[self.state])

        return self.state_aq_summary


    def get_state_aq_data(self, state_code=1, format='json'):
        '''
        method to read the states AQ data
        '''
        # states AQ data path
        self.datadir_path = self.parent_dir_path + '/data/epic2/2.1/'
        self.states_aqi = None

        # read data from csv/xlsx
        if self.b_from_files:
            # load in dataframe 
            df_state_aq = pd.read_csv(self.datadir_path + 'states_aq_data.csv')

            # select query for subset data as per request
            df_subset = df_state_aq[df_state_aq['state_code'] == state_code]

            # aqi for all states
            self.states_aqi = df_state_aq[['state_code', 'state', 'aqi']]

            if format == 'json':
                return df_subset[0].to_json()
            else:
                return df_subset


class SuburbAirQuality(AirQuality):
    '''
    class for the AQ in the suburb
    '''
    def __init__(self, location, b_from_csv=True):
        '''
        class constructor
        '''
        super().__init__(location, b_from_csv)
        self.location['lat'] = None
        self.location['long'] = None
        self.suburb=None
        self.suburb_code=None


    def get(self):
        '''
        GET request handler 
        '''
        super().get()
        # AC3
        self.suburb_code=self.args['suburb_code']
        self.suburb = self.args['suburb']
        try:
            self.location['lat'] = self.args['lat']
            self.location['lon'] = self.args['lon']
        except:
            # read from suburb data {TO DO}
            self.location['lat'] = -37.82
            self.location['lon'] = 144.97
        # self.time = time
        self.suburb_aq_summary = self.get_suburb_aq_data()

        return self.state_aq_summary
            

    def get_suburb_aq_data(self, format='json'):
        '''
        method to get the AQ data for suburb
        '''
        # load curr state AQ dataframe
        df_curr_state_aq = pd.read_csv(self.datadir_path + self.state +\
                                        '/' + self.state + '_aq_data.csv')

        # select query for suburb data
        df_subset = df_curr_state_aq[df_curr_state_aq['site'] == self.suburb]

        if format == 'json':
            return df_subset[0].to_json()
        else:
            return df_subset


api.add_resource(AirQuality, '/state')
api.add_resource(SuburbAirQuality, '/suburb')


if __name__ == '__main__':
    app.run(debug=True, port=5000)
