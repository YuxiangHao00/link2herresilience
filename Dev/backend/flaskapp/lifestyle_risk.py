"""
FIT5120: IE Studio experience project
Project: Link2 HerResilience
Team: Harmony (TA18)
Author: Mandeep Singh

API to provide response for risk prediction of stressful lifestyle, 
addiction & substance abuse & provide actionable insights
"""

import os
import numpy as np
from flask import Flask, jsonify#, request
from flask_restful import Resource, Api, reqparse

# import json
import pandas as pd
# import pickle

from flask_cors import CORS

app7 = Flask(__name__)
CORS(app7, resources={r"/*": {"origins": "*"}})
api = Api(app7, prefix="/lifestyle/v1")

class RiskPrediction(Resource):
    '''
    class for risk prediction for addiction and substance abuse on health & well-being
    '''
    def __init__(self, b_from_csv=True):
        '''
        class constructor
        '''
        self.parent_dir_path = os.path.dirname(os.getcwd())
        self.session_id = None
        self.list_section_id = None
        self.list_question_id = None
        self.list_response_id = None

        self.b_from_files=True
        self.parser = reqparse.RequestParser()
        self.datadir_path = self.parent_dir_path + '/data/epic7/'

        if self.b_from_files:
            self.path_sess_data = os.getcwd() + '/session_data'
            self.df_sess_filenames = pd.read_csv(self.path_sess_data + "/sess_filenames.csv")

        # mapping of response_id to numerical value to get np vector used
        # in risk prediction for responses to questionnaire's questions in each section
        self.questionnaire_mapping = {
            2: {
                "3a": {
                    1: 1,
                    2: 3,
                    3: 3,
                    4: 4
                },
                "3b": {
                    1: 1,
                    2: 2,
                    3: 0
                },
                "3c": {
                    1: 1,
                    2: 2,
                    3: 3
                },
                "4": {
                    1: 1,
                    2: 3,
                    3: 4 if np.random.uniform() < 0.5 else 5
                }
            },
            3: {
                "2": {
                    1: 991,
                    2: 18 if np.random.uniform() > 0.5 else 991,
                    3: 18,
                    4: 18
                },
                "5": {
                    1: 2,
                    2: 1 if np.random.uniform() > 0.5 else 2,
                    3: 1,
                    4: 1
                },
                "6": {
                    1: 2,
                    2: 1 if np.random.uniform() > 0.5 else 2,
                    3: 1
                }
            },
            4: {
                "3": {
                    1: 2,
                    2: 94,
                    3: 1,
                    4: 1
                }
            },
            5: {
                "3": {
                    1: 2,
                    2: 1,
                    3: 2
                }
            },
            6: {
                "1": {
                    1: 1,
                    2: 2,
                    3: 1
                }
            }
        }

        # dict of suggestions risk level: 0, 1, 2
        self.dict_suggestions = {
            2: ["That's concerning! it's predicted that your lifestyle is having high risk. "+
                            "Please contact the health professional to chart out plan to proactively improve & maintain health & better lifestyle.",
                      "You are living a potentially highly risky lifestyle. It is advisable to be touch "+
                            "with health professional to proactively improve & maintian health & better lifestyle"],
            1: ["Your lifestyle is quite concerning right now with medium risk. Please actively engage in decreasing it.",
                      "It's not that great with your lifestyle of medium risk which if continued can have nagative impact on health."],
            0: ["You are living a normal/healthy lifestyle, continue with it & please check out other features to get insights on sleep quality & manage stress.",
                    "Great, you are on right track & having normal/healthy lifestyle which can be maintained by actively managing stress, better sleep quality"]
        }

        # dict of risk level numeric to text
        self.dict_risk_level_category = {
            2: "high",
            1: "medium",
            0: "low"
        }


    def get(self):
        '''
        GET request handler
        based on the imput types
        '''
        self.parser.add_argument('session_id', type=str, location="args", required=True)
        self.parser.add_argument('section_id', type=str, location="args", required=True)
        self.parser.add_argument('question_id', type=str, location="args", required=True)
        self.parser.add_argument('response_id', type=str, location="args", required=True)
        
        self.args = self.parser.parse_args()
        self.session_id = self.args['session_id']
        self.list_section_id = self.args['section_id']
        self.list_question_id = self.args['question_id']
        self.list_response_id = self.args['response_id']

        self.b_input_format = True
        self.err_msg = []
        self.check_n_parse_str_to_nparr()

        if self.b_input_format:
            # instance of RiskPredictorModel for current session 
            self.risk_predictor = None

            # # load classifier model
            # knn_classifier = pickle.load(open("./models/knn_clf/knn_clf.pkl", "rb"))
            # predict_class_prob = np.max(knn_classifier.predict_proba(coordinates))
            # predicted_class = knn_classifier.predict(coordinates)

            # {basic functionality} classification of the yoga pose 
            class_probability = np.random.uniform()
            predicted_class = (class_probability * 8.99)//3
            if np.random.uniform() > 0.5:
                suggestion_ind = 1
            else:
                suggestion_ind = 0
            suggestion = self.dict_suggestions[predicted_class][suggestion_ind] 

            # result of yoga pose estimation & classification
            result = jsonify({
                "class_probability": class_probability,
                "predicted_risk_level": self.dict_risk_level_category[predicted_class],
                "suggestion": suggestion
            })

            return result
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
        # try:    
        if 1:
            self.err_code = 0
            self.np_section_id = np.array([int(x) for x in self.list_section_id[1:-1].split(",")])
            self.np_question_id = np.array([x for x in self.list_question_id[1:-1].split(",")])
            self.np_response_id = np.array([int(x) for x in self.list_response_id[1:-1].split(",")])

            # check list length in all
            self.b_input_format = ((len(self.np_section_id) == len(self.np_question_id)) and\
                                        (len(self.np_question_id) == len(self.np_response_id)))
            
            # initialize vector of response np array
            self.np_response_vec = np.zeros(len(self.np_response_id))
            
            if not self.b_input_format:
                self.err_code = (1<<1) 
                self.err_msg.append("length of input lists is not same")

            if min(self.np_section_id) < 2 or max(self.np_section_id) > 6:
                self.b_input_format = False
                self.err_code = (1<<2) | self.err_code
                self.err_msg.append("input section_id out of range (2-6)")

            for i, section_id in enumerate(self.np_section_id):
                if not self.np_question_id[i] in self.questionnaire_mapping[section_id].keys():
                    self.b_input_format = False
                    self.err_code = (1<<3) | self.err_code
                    # print(self.np_section_id[i], "Q", self.np_question_id[i])
                    self.err_msg.append(f"input question_id out of range {self.questionnaire_mapping[section_id].keys()}"\
                                        f" for section: {section_id}")
                else:
                    if not self.np_response_id[i] in self.questionnaire_mapping[section_id][self.np_question_id[i]].keys():
                        self.b_input_format = False
                        self.err_code = (1<<4) | self.err_code
                        self.err_msg.append(f"input question_id out of range {self.questionnaire_mapping[section_id][self.np_question_id[i]].keys()}"\
                                        f" for section: {section_id}, question: {self.np_question_id[i]}")
                    else:
                        self.np_response_vec = self.questionnaire_mapping[section_id][self.np_question_id[i]][self.np_response_id[i]]

        
        # except:    
        else:
            self.b_input_format = False
            self.err_code = 1
            self.err_msg = "check_input_args failed to execute"


api.add_resource(RiskPrediction, '/analyse_risk')


if __name__ == '__main__':
    app7.run(port=5008)