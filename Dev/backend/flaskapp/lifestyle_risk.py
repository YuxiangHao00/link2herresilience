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

import json
import pickle
import heapq
import pandas as pd
import re
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
        self.model_dirpath = os.getcwd() + "/models"

        if self.b_from_files:
            self.path_sess_data = os.getcwd() + '/session_data'
            self.df_sess_filenames = pd.read_csv(self.path_sess_data + "/sess_filenames.csv")

        # mapping of response_id to numerical value to get np vector used
        # in risk prediction for responses to questionnaire's questions in each section
        self.questionnaire_mapping = {
            2: {
                "3a": {
                    1: 1,
                    2: 12,
                    3: 52,
                    4: 104
                },
                "3b": {
                    1: 5,
                    2: 0,
                    3: 3
                },
                "3c": {
                    1: 1,
                    2: 91,
                    3: 5
                },
                "4": {
                    1: 1,
                    2: 3,
                    3: 4 if np.random.uniform() < 0.5 else 5
                },
                "5": {
                    1: 1,
                    2: 2,
                    3: 3,
                    4: 4 if np.random.uniform() < 0.5 else 5
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

        # to map response np array to input vector to classifier
        self.response_to_vector_indexing = {
            2: {
                "3a": ['iralcfy'],
                "3b": ['irmjfy'],
                "3c": ['cig30use'],
                "4": ['ciginctl'],
                "5": ['cigcrave']
            },
            3: {
                "2": ['pnrrsotrs2'],
                "5": ['yowrslep'],
                "6": ['adwrdiet']
            },
            4: {
                "3": ['pnrlwd3sx']
            },
            5: {
                "3": ['talkprob', 'yetlknon']
            },
            6: {
                "1": ['auoptyr', 'aualtyr']
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

            # print("np_response_vec:", self.np_response_vec)

            # load X_Y_columns json
            with open('./models/mlp_clf/X_Y_columns.json', 'r') as file:
                dict_X_Y_col = json.load(file)

            # df of np_response_vec
            dict_x = {}
            for i, col in enumerate(dict_X_Y_col["X_col"]):
               dict_x[col] = self.np_response_vec[i] 
            df_x = pd.DataFrame(dict_x, index=[0])

            # load column transformer for pre-processing
            with open('./models/mlp_clf/X_column_transformer.pkl', 'rb') as file:
                X_preprocess = pickle.load(file)

            x_transformed = X_preprocess.transform(df_x)

            # causal effect variable options: 1=Yes, 2=No, 91=never used/misused, 93=didn't misuse in past 12 months
            list_y_pred_prob = []

            # heap of top5 prediction probability for each classes
            heap_y_pred_prob_top5 = []
            heapq.heappush(heap_y_pred_prob_top5, (0, -1))

            # load dict of mlp_clf models
            dict_clf = pickle.load(open("./models/mlp_clf/dict_mlp.pkl", 'rb'))

            # overall probability for adverse effects
            overall_y_pred_prob = None
            for i, col in enumerate(dict_X_Y_col["Y_col"]):
                # # load all classifier models & predict
                # print(">>>>loading mlp_clf model for "+col)
                curr_mlp_classifier = dict_clf[col]['clf']

                # prediction probability
                list_y_pred_prob.append(curr_mlp_classifier.predict_proba(x_transformed))

                # print("max_p:", np.max(list_y_pred_prob[-1]), ', HEAP+++ ', heap_y_pred_prob_top5[0][0])
                # update queue of top5 effects
                if np.max(list_y_pred_prob[-1]) > heap_y_pred_prob_top5[0][0]:
                    if len(heap_y_pred_prob_top5) == 5:
                        heapq.heappop(heap_y_pred_prob_top5)
                    heapq.heappush(heap_y_pred_prob_top5, (np.max(list_y_pred_prob[-1]), i))
                    heapq.heapify(heap_y_pred_prob_top5)

                if overall_y_pred_prob is None:
                    overall_y_pred_prob = list_y_pred_prob[-1]
                else:
                    overall_y_pred_prob = overall_y_pred_prob + list_y_pred_prob[-1]

            # overall y_pred_prob
            overall_y_pred_prob = overall_y_pred_prob/len(list_y_pred_prob)

            np_y_pred_prob = np.asarray(overall_y_pred_prob)

            # joint probability
            joint_prob = np.sum([list_y_pred_prob[i] for p, i in heap_y_pred_prob_top5])/len(heap_y_pred_prob_top5)

            # total probability
            total_prob = np_y_pred_prob * joint_prob

            # classification of the predicted adverse effect 
            class_probability = np.max(total_prob)  # np_y_pred_prob
            
            # predicted class
            predicted_class = np.argmax(total_prob) # np_y_pred_prob

            # list of possible effects
            list_possible_effects = []

            # categorise in High, Medium, Low
            if predicted_class == 0:
                # load name of substance with possible_effects
                dict_nsduh_attr_substances = {}
                with open("./models/mlp_clf/nsduh_attr_naming.json", 'r') as file:
                    dict_nsduh_attr_substances = json.load(file)

                # load description of possible_effects
                dict_desc_nsduh_attr = {}
                with open("./models/mlp_clf/description_nsduh_attr.json", 'r') as file:
                    dict_desc_nsduh_attr = json.load(file)
                # load possible effects
                while len(heap_y_pred_prob_top5) > 0:
                    # curr possible effect
                    curr_possible_effect = heapq.heappop(heap_y_pred_prob_top5)

                    # its nsduh attribute name
                    curr_effect_nsduh_attr = dict_X_Y_col["Y_col"][curr_possible_effect[1]]
                    init_str_curr_effect_nsduh_attr = curr_effect_nsduh_attr[:-5]
                    end_str_curr_effect_nsduh_attr = curr_effect_nsduh_attr[-5:]

                    # curr_effect_nsduh_attr description
                    # print('curr_effect_nsduh_attr: ', curr_effect_nsduh_attr)
                    # print(f'dict_nsduh_attr_substances[{init_str_curr_effect_nsduh_attr}]', dict_nsduh_attr_substances[init_str_curr_effect_nsduh_attr])
                    # print('curr_effect_nsduh_attr[-5:]:', end_str_curr_effect_nsduh_attr)
                    # print('test>>>>>', dict_desc_nsduh_attr.keys())
                    # print(f'dict_desc_nsduh_attr[{end_str_curr_effect_nsduh_attr}]:', dict_desc_nsduh_attr[end_str_curr_effect_nsduh_attr])
                    desc_nsduh_attr = re.sub(r'\$substance\$', dict_nsduh_attr_substances[init_str_curr_effect_nsduh_attr], dict_desc_nsduh_attr[end_str_curr_effect_nsduh_attr])

                    list_possible_effects.append({"predicted_probability": curr_possible_effect[0],
                                                  "nsduh_attribute": curr_effect_nsduh_attr,
                                                  "effect_description": desc_nsduh_attr})
                    
                if class_probability > 1./3.: # high
                    predicted_class_hml = 2
                else: # medium
                    predicted_class_hml = 1
            else: # low
                predicted_class_hml = 0
            
            # predicted_class = (class_probability * 8.99)//3
            if np.random.uniform() > 0.5:
                suggestion_ind = 1
            else:
                suggestion_ind = 0
            suggestion = self.dict_suggestions[predicted_class_hml][suggestion_ind] 

            # result of yoga pose estimation & classification
            result = jsonify({
                "class_probability": class_probability,
                "predicted_risk_level": self.dict_risk_level_category[predicted_class_hml],
                "suggestion": suggestion,
                "possible_effect": list_possible_effects
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

            # print(os.path.exists(self.model_dirpath + "/mlp_clf/X_Y_columns.json"))
            with open(self.model_dirpath + "/mlp_clf/X_Y_columns.json", 'r') as file:
                dict_X_Y_columns = json.load(file)
            
            # initialize vector of response np array
            self.np_response_vec = np.ones(len(dict_X_Y_columns['X_col']))
            # self.np_response_vec = np.zeros(len(self.np_response_id))
            
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
                        # list of NSDUH survey attributes associated with the question
                        list_nsduh_attr = self.response_to_vector_indexing[section_id][self.np_question_id[i]]
                        for attr in list_nsduh_attr:
                            # index of current question
                            ques_index = dict_X_Y_columns['X_col'].index(attr)
                            # update np_response_vec
                            self.np_response_vec[ques_index] = self.questionnaire_mapping[section_id][self.np_question_id[i]][self.np_response_id[i]]

        
        # except:    
        else:
            self.b_input_format = False
            self.err_code = 1
            self.err_msg = "check_input_args failed to execute"


api.add_resource(RiskPrediction, '/analyse_risk')


if __name__ == '__main__':
    app7.run(port=5008, debug=True)