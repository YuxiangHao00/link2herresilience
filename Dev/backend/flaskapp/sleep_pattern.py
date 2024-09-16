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
from model_sleep_quality_j48 import SleepQuality_j48

app3__2_3 = Flask(__name__)
CORS(app3__2_3, resources={r"/*": {"origins": "*"}})
api = Api(app3__2_3, prefix="/sleep_quality/v1.1")

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

        # mean values of args
        self.dict_MEAN = {
            'age': 42,
            'stress_level': 5.4,
            'heart_rate': 70.2, 
        }


    def get(self):
        '''
        GET request handler
        '''
        self.parser.add_argument('days', type=str, location="args", required=True)
        self.parser.add_argument('start', type=str, location="args", required=True)
        self.parser.add_argument('durations', type=str, location="args", required=True)
        self.parser.add_argument('stress_levels', type=str, location="args")
        self.parser.add_argument('heart_rates', type=str, location="args")
        self.parser.add_argument('age', type=str, location="args")
        
        self.args = self.parser.parse_args()
        self.days = self.args['days']
        self.start_time = self.args['start']
        self.durations = self.args['durations']
        self.stress_levels = self.args['stress_levels']
        self.heart_rates = self.args['heart_rates']
        
        self.np_days = None
        self.np_start_time = None
        self.np_durations = None
        
        self.b_input_format = True
        self.err_msg = []
        self.check_n_parse_str_to_nparr()

        if self.b_input_format:
            # self.analysis_model = {'t_l': 5, 't_h': 9}
            self.analysis_model = SleepQuality_j48()
            self.list_sleep_quality = []
            # self.pattern_analysis = self.analyse_sleep_pattern()

            return self.analyse_sleep_pattern()
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
        if 1:
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

            if min(self.np_start_time[:,0]) < 0 or max(self.np_start_time[:,0]) > 23 or\
                  min(self.np_start_time[:,1]) < 0 or max(self.np_start_time[:,1]) > 59:
                self.b_input_format = False
                self.err_code = (1<<3) | self.err_code
                self.err_msg.append("input start time out of range (0000-2359) for a HHMM format")
            
            if min(self.np_durations) < 0 or max(self.np_durations) > 24:
                self.b_input_format = False
                self.err_code = (1<<4) | self.err_code
                self.err_msg.append("input duration is out of range (0-24) for a day")

            # print('3 args parsed')
            if len(self.args.keys()) > 3:
                if self.stress_levels is not None:
                    self.np_stress_levels = np.array([float(x) for x in self.stress_levels[1:-1].split(",")])

                    if min(self.np_stress_levels) < 0 or max(self.np_stress_levels) > 10:
                        self.b_input_format = False
                        self.err_code = (1<<5) | self.err_code
                        self.err_msg.append("input stress levels is out of range (0-10) for a day")

                if self.heart_rates is not None:
                    self.np_heart_rates = np.array([float(x) for x in self.heart_rates[1:-1].split(",")])
                
                    if min(self.np_heart_rates) < 40 or max(self.np_heart_rates) > 140:
                        self.b_input_format = False
                        self.err_code = (1<<6) | self.err_code
                        self.err_msg.append("input heart rates is out of range (40-140) for a day")
                
                if self.args['age'] is not None:
                    self.age = float(self.args['age'])
                    if self.age < 0 or self.age > 150:
                        self.b_input_format = False
                        self.err_code = (1<<7) | self.err_code
                        self.err_msg.append("input age is out of range (0-150) for a day")
        
        else:
            self.b_input_format = False
            self.err_code = 1
            self.err_msg = "check_input_args failed to execute"

    
    def one_data_entry_in_np_arr(self, i):
        '''
        method to get one data entry (in input np arrays) of a day
        '''
        dict_args = dict()
        try:
            dict_args['stress_level'] = self.np_stress_levels[i]
        except:
            dict_args['stress_level'] = self.dict_MEAN['stress_level']
        dict_args['sleep_duration'] = self.np_durations[i]
        try:
            dict_args['heart_rate'] = self.np_heart_rates[i]
        except:
            dict_args['heart_rate'] = self.dict_MEAN['heart_rate']
        if 'age' not in dict_args.keys():
            dict_args['age'] = self.dict_MEAN['age']

        return dict_args 
        

    def analyse_sleep_pattern(self, format='json'):
        '''
        method to analyse sleep pattern from input request
        '''
        # [v1]{BASIC_TEST} list of sleep quality categories for duration
        # list_quality_category = list(map(lambda x: 'GOOD' 
        #                                  if x >= self.analysis_model['t_l'] and x <= self.analysis_model['t_h']
        #                                  else 'BAD', self.np_durations))
        # sleep quality estimate (mean)
        overall_quality_mean = 0

        for i, day in enumerate(self.np_days):
            curr_args = self.one_data_entry_in_np_arr(i)
            
            self.analysis_model.update_input(curr_args)
            self.analysis_model.update_sleep_quality()
            curr_sleep_quality = self.analysis_model.sleep_quality
            overall_quality_mean += 0.5*(curr_sleep_quality['high'] + curr_sleep_quality['low'])
            self.list_sleep_quality.append({
                "day": int(day),
                "quality": curr_sleep_quality.copy()})#self.analysis_model.sleep_quality})
        
        # overall quality estimate
        overall_quality_mean = overall_quality_mean/len(self.list_sleep_quality)
        # update overall sleep category & suggestion
        if overall_quality_mean < self.analysis_model.threshold_low:
            overall_quality_category = 'BAD'
        elif overall_quality_mean < self.analysis_model.threshold_high:
            overall_quality_category = 'NORMAL'
        else:
            overall_quality_category = 'GOOD'
        
        overall_suggestion = self.analysis_model.sleep_quality_suggestions[overall_quality_category]
        
        return jsonify({
                    "threshold_high": self.analysis_model.threshold_high,
                    "threshold_low": self.analysis_model.threshold_low,
                    "overall_quality_mean": overall_quality_mean,
                    "overall_quality": overall_quality_category,
                    "overall_suggestion": overall_suggestion,
                    "quality_category": self.list_sleep_quality,
                    "num_days": len(self.list_sleep_quality)
            })


api.add_resource(SleepQuality, '/analyse')


if __name__ == '__main__':
    app3__2_3.run(port=5004)
