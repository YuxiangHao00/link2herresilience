"""
FIT5120: IE Studio experience project
Project: Link2 HerResilience
Team: Harmony (TA18)
Author: Mandeep Singh

API to provide response for image(s) captured by users to
analyze its pose in the current step of yoga sequence using 
pose estimation model to support the self-paced yoga practice
& provide actionable insights for pose correction
"""

import os
import numpy as np
from flask import Flask, jsonify#, request
from flask_restful import Resource, Api, reqparse
import werkzeug
# from werkzeug.utils import secure_filename
# from PIL import Image

from models import yoga_pose_estimator
from models.yoga_pose_estimator import YogaPoseEstimation

import json
import pandas as pd

from flask_cors import CORS

app6 = Flask(__name__)
CORS(app6, resources={r"/*": {"origins": "*"}})
api = Api(app6, prefix="/yoga_asana/v1")

class YogaAsana(Resource):
    '''
    class for yoga asana pose estimation
    '''
    def __init__(self, b_from_csv=True):
        '''
        class constructor
        '''
        self.parent_dir_path = os.path.dirname(os.getcwd())
        self.sess_id = None
        self.asana = None
        self.step = None
        self.type = None
        self.file_id = None

        self.b_from_files=True
        self.parser = reqparse.RequestParser()
        self.datadir_path = self.parent_dir_path + '/data/epic6/'

        # # dict of format types of files as input
        self.dict_FORMAT = {"image": ["jpeg", "jpg", "png"],
                            "video": ["mp4", "mpeg4"]}

        # dict of 12 yoga asana sequence & its list of wrong body postures in a particular step
        with open(self.datadir_path + "asanas_wrong_postures_in_step.json", 'r') as file:
            self.dict_yoga_sequence_wrong_postures = json.load(file)

        if self.b_from_files:
            self.path_sess_data = os.getcwd() + '/session_data'
            self.df_sess_filenames = pd.read_csv(self.path_sess_data + "/sess_filenames.csv")


    def get(self):
        '''
        GET request handler
        based on the imput types
        '''
        self.parser.add_argument('sess_id', type=str, location="args", required=True)
        self.parser.add_argument('asana', type=str, location="args", required=True)
        self.parser.add_argument('step', type=int, location="args", required=True)
        self.parser.add_argument('file_id', type=str, location="args", required=True)
        self.parser.add_argument('type', type=str, location="args", required=True)
        # self.parser.add_argument('images', type=werkzeug.datastructures.FileStorage, 
        #                          location='files', required=True)
        
        self.args = self.parser.parse_args()
        self.sess_id = self.args['sess_id']
        self.asana = self.args['asana']
        self.step = self.args['step']
        self.file_id = self.args['file_id']
        self.type = self.args['type']

        self.b_input_format = True
        self.err_msg = []
        self.check_n_parse_str_to_nparr()

        if self.b_input_format:
            # instance of YogaPoseEstimation for current session & yoga asana step
            self.pose_estimator = YogaPoseEstimation(sess_id=self.sess_id, 
                                                     file_id=self.file_id,
                                                     path_sess_data=self.path_sess_data,
                                                     model_name="II",
                                                     b_verbose=True)
            
            # yoga pose estimation
            pose_estimate_result = self.pose_estimator.analyse_pose()
            if not "err_code" in pose_estimate_result.keys():
                pose_estimate_result = pose_estimate_result["pose_estimation"]
            print(pose_estimate_result)

            # {basic functionality} classification of the yoga pose 
            class_probability = np.random.uniform()
            if class_probability > 0.5:
                classify_pose = -1
                suggestion = "Well done, that's performed right!"
            else:
                classify_pose = np.random.choice(len(self.dict_yoga_sequence_wrong_postures[self.asana][str(self.step)]))
                wrong_posture = self.dict_yoga_sequence_wrong_postures[self.asana][str(self.step)][classify_pose]
                suggestion = f"Oh, that's a wrong posture. Please try to look into {wrong_posture.lower()} to improve it further."

            # result of yoga pose estimation & classification
            result = jsonify({
                "pose_estimation": pose_estimate_result,
                "pose_classification": {
                    "class_probability": class_probability,
                    "right_posture": bool(classify_pose == -1)
                },
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
        try:    #if 1:
            self.err_code = 0
            # check list length in all
            df_subset = self.df_sess_filenames[self.df_sess_filenames["sess_id"] == self.sess_id]["file_id"]
            if self.file_id in df_subset.values:
                self.b_input_format = True
            else:
                self.b_input_format = False

            self.asana = self.asana.lower()
            self.step = int(self.step)
            
            if not self.b_input_format:
                self.err_code = (1<<1) 
                self.err_msg.append("sess_id/file_id is not present in file storage")

            if len(self.file_id) != 8:
                self.b_input_format = False
                self.err_code = (1<<2) | self.err_code
                self.err_msg.append("input file_id is not of correct length")

            if not self.asana in [x.lower() for x in self.dict_yoga_sequence_wrong_postures.keys()]:
                self.b_input_format = False
                self.err_code = (1<<3) | self.err_code
                self.err_msg.append("input asana is incorrect or not listed in the yoga practice")
            
            if self.step > len(self.dict_yoga_sequence_wrong_postures[self.asana]):
                self.b_input_format = False
                self.err_code = (1<<4) | self.err_code
                self.err_msg.append(f"input yoga step is out of range for a {self.asana} which has {len(self.dict_yoga_sequence_wrong_postures[self.asana])} steps")

            # print('3 args parsed')
            if not self.type.strip(".").lower() in self.dict_FORMAT["image"]:
                self.b_input_format = False
                self.err_code = (1<<5) | self.err_code
                self.err_msg.append("input file type (format) is not supported")
        
        except:    # else:
            self.b_input_format = False
            self.err_code = 1
            self.err_msg = "check_input_args failed to execute"


api.add_resource(YogaAsana, '/analyse')


if __name__ == '__main__':
    app6.run(port=5007, debug=True)