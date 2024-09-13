"""
FIT5120: IE Studio experience project
Project: Link2 HerResilience
Team: Harmony (TA18)
Author: Mandeep Singh

API to provide response for sleep pattern analysis that 
supports the sleep quality estimates in Australian states
"""

import os
import numpy as np
from flask import Flask, jsonify#, request
from flask_restful import Resource, Api, reqparse
# import json
from flask_cors import CORS

app3__2_3 = Flask(__name__)
CORS(app3__2_3, resources={r"/*": {"origins": "*"}})
api = Api(app3__2_3, prefix="/sleep_quality/v1")

class SleepQuality(Resource):
    '''
    class for sleep quality estimation
    '''
    def __init__(self):
        '''
        class constructor
        '''
        self.parent_dir_path = os.path.dirname(os.getcwd())
        self.days = None
        self.start_time = None
        self.durations = None

        self.b_from_files=True
        self.parser = reqparse.RequestParser()
        self.datadir_path = self.parent_dir_path + '/data/epic3/3.3/'
        # self.buff = StringIO()


    def get(self):
        '''
        GET request handler
        '''
        self.parser.add_argument('days', type=str, location="args", required=True)
        self.parser.add_argument('start', type=str, location="args", required=True)
        self.parser.add_argument('durations', type=str, location="args", required=True)
        self.args = self.parser.parse_args()
        self.days = self.args['days']
        self.start_time = self.args['start']
        self.durations = self.args['durations']
        self.np_days = None
        self.np_start_time = None
        self.np_durations = None
        
        self.b_input_format = True
        self.err_msg = []
        self.check_n_parse_str_to_nparr()

        if self.b_input_format:
            self.analysis_model = {'t_l': 5, 't_h': 9}

            self.pattern_analysis = self.analyse_sleep_pattern()

            return self.pattern_analysis
        else:
            return jsonify({
                "message": {
                    "400": "Bad request: inputs not in correct format",
                    "err_code": self.err_code,
                    "err": self.err_msg
                }
            })
        
        
    def check_n_parse_str_to_nparr(self):
        '''
        method to check and parse input str to np array
        '''
        try:
            self.err_code = 0
            self.np_days = np.array([int(x) for x in self.days[1:-1].split(",")])
            self.np_start_time = np.array([[int(x[:2]), int(x[2:])] for x in self.start_time[1:-1].split(",")])
            self.np_durations = np.array([float(x) for x in self.durations[1:-1].split(",")])
            # check list length in all
            self.b_input_format = ((len(self.np_days) == len(self.np_start_time)) and\
                                        (len(self.np_start_time) == len(self.np_durations)))
            
            if not self.b_input_format:
                self.err_code = (1<<1) 
                self.err_msg.append("length of input lists is not same")

            if min(self.np_days) < 1 or max(self.np_days) > 7:
                self.b_input_format = False
                self.err_code = (1<<2) | self.err_code
                self.err_msg.append("input days out of range (1-7) for a week")

            if min(self.np_start_time[0,:]) < 0 or max(self.np_start_time[0,:]) > 23 or\
                  min(self.np_start_time[1,:]) < 0 or max(self.np_start_time[1,:]) > 59:
                self.b_input_format = False
                self.err_code = (1<<3) | self.err_code
                self.err_msg.append("input start time out of range (0000-2359) for a HHMM format")
            
            if min(self.np_durations) < 0 or max(self.np_durations) > 24:
                self.b_input_format = False
                self.err_code = (1<<4) | self.err_code
                self.err_msg.append("input duration is out of range (0-24) for a day")
        
        except:
            self.b_input_format = False
            self.err_code = 1
            self.err_msg = "check_input_args failed to execute"
        


    def analyse_sleep_pattern(self, format='json'):
        '''
        method to analyse sleep pattern from input request
        '''
        # {BASIC_TEST} list of sleep quality categories for duration
        list_quality_category = list(map(lambda x: 'GOOD' 
                                         if x >= self.analysis_model['t_l'] and x <= self.analysis_model['t_h']
                                         else 'BAD', self.np_durations))

        return jsonify({
            "quality_category": list_quality_category
        })


api.add_resource(SleepQuality, '/analyse')


if __name__ == '__main__':
    app3__2_3.run(port=5004)
