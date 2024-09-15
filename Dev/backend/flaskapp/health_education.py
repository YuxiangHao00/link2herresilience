"""
FIT5120: IE Studio experience project
Project: Link2 HerResilience
Team: Harmony (TA18)
Author: Mandeep Singh

API to provide response for the questionaires related queries to
supports the sexual health education, family planning in Australian states & preventive measures
for STIs & related issues.
"""

import os
import numpy as np
from flask import Flask, jsonify#, request
from flask_restful import Resource, Api, reqparse
import json
from flask_cors import CORS

app4 = Flask(__name__)
CORS(app4, resources={r"/*": {"origins": "*"}})
api = Api(app4, prefix="/health_education/v1")

class SexualHealthEducation(Resource):
    '''
    class for sleep quality estimation
    '''
    def __init__(self):
        '''
        class constructor
        '''
        self.topic = None
        self.dict_QnA = None
        self.dir_path = os.path.dirname(os.getcwd()) + "/data/epic4/"
        self.num_QnA = 5

        self.parser = reqparse.RequestParser()


    def get(self):
        '''
        GET request handler
        '''
        self.parser.add_argument('topic', type=str, location="args", required=True)
        self.parser.add_argument('questions', type=str, location="args")
        self.parser.add_argument('answers', type=str, location="args")
        
        self.args = self.parser.parse_args()
        self.topic = self.args['topic']
        self.user_questions = self.args['questions']
        self.user_answers = self.args['answers']

        if self.user_questions is not None:
            if self.user_answers is not None:
                # update dict_QnA as per topic
                self.get_dict_QnA()

                self.b_input_format = True
                self.err_msg = []
                self.check_n_parse_str_to_list()

                if self.b_input_format:
                    return self.get_score()
                
                else:
                    return jsonify({
                        "message": {
                            "400": "Bad request: inputs not in correct format",
                            "err_code": self.err_code,
                            "err": self.err_msg
                        }
                    })
            else:
                return jsonify({
                    "message": {
                        "400": "Bad request: score can't be processed",
                        "err": "kindly include the user's answers"
                    }
                })
        else:
            return self.get_quiz_questions()
        

    def check_n_parse_str_to_list(self):
        '''
        method to check and parse input str to list
        '''
        try:
            self.err_code = 0
            self.list_user_questions = [int(x) for x in self.user_questions[1:-1].split(",")]
            self.list_user_answers = [x.upper() for x in self.user_answers[1:-1].split(",")]
            
            # check list length in all
            self.b_input_format = (len(self.list_user_questions) == len(self.list_user_answers))
            
            if not self.b_input_format:
                self.err_code = (1<<1) 
                self.err_msg.append("length of input lists is not same")

            if min(self.list_user_questions) < 0 or\
                  max(self.list_user_questions) > len(self.dict_QnA["ques"])-1:
                self.b_input_format = False
                self.err_code = (1<<2) | self.err_code
                self.err_msg.append("input question id out of range [0, total_questions-1]")

            for option in self.list_user_answers:
                if option not in {'A)', 'B)', 'C)', 'D)' 'E)'}:
                    self.b_input_format = False
                    self.err_code = (1<<3) | self.err_code
                    self.err_msg.append("input answers out of range of options (A - E)")
                    break

        except:
            self.b_input_format = False
            self.err_code = 1
            self.err_msg = "check_input_args failed to execute"
        

    def get_dict_QnA(self,):
        '''
        method to read dict_QnA
        '''
        if self.topic.lower() == "sexual health":    
            quiz_file_path = self.dir_path + "4.1_quiz.json"
        elif self.topic.lower() == "prevention":
            quiz_file_path = self.dir_path + "4.2_quiz.json"

        # read quiz QnA
        with open(quiz_file_path, 'r') as file:
            self.dict_QnA = json.load(file)


    def get_quiz_questions(self,):
        '''
        method to process GET request for questions on self.topic
        '''
        # read dict_QnA as per topic
        self.get_dict_QnA()
        
        # randomly select num_QnA questions based on the topic
        ques_indices = np.random.choice(len(self.dict_QnA["ques"]), 
                                        self.num_QnA, replace=False)#.astype(int)
        
        # dict of selected questions
        dict_ques = {
            "topic": self.topic, 
            "questions": [
                {
                    "question_id": int(i),
                    "question": self.dict_QnA["ques"][i]["question"],
                    "options": self.dict_QnA["ques"][i]["options"]
                }
                for i in ques_indices
            ]
        }
        
        # return quiz questions
        return jsonify(dict_ques)
    

    def get_score(self,):
        '''
        method to get the score of user's response to the quiz questions
        '''
        # calculate score
        score = 0

        # list of response summary based on right or wrong answer
        list_response_summary = []

        for i, ques_id in enumerate(self.list_user_questions):
            # curr question check
            b_user_ans_right = False
            check_ans = ""
            if self.list_user_answers[i] == self.dict_QnA["ans"][ques_id]["right_ans"][:2]:
                score += 1
                b_user_ans_right = True
                check_ans = 'right_ans'
            else:
                check_ans = 'wrong_ans'

            list_response_summary.append(
                {
                    "question_id": ques_id,
                    "is_right": b_user_ans_right,
                    "response": self.dict_QnA["ans"][ques_id][check_ans]
                }
            )

        return jsonify({
            "topic": self.topic,
            "score": score,
            "percentage": float(score/len(self.list_user_questions))*100,
            "details": list_response_summary
        })


api.add_resource(SexualHealthEducation, '/quiz')


if __name__ == '__main__':
    app4.run(port=5005)