"""
FIT5120: IE Studio experience project
Project: Link2 HerResilience
Team: Harmony (TA18)
Author: Mandeep Singh

Utility function for data pre-processing & enrichment of text files for questionnaires 
"""

import os
import re
import json

dir_path = os.getcwd() + '/epic4/'

def read_txt_write_json(filename, k=1):
    '''
    method to read text & convert to json file
    '''
    re_ques = re.compile(r"\d\.\s([•\w\W)]+?)\nRight")#("\d\.\s([•A-Za-z ?\n\t).’!,\d]+)\nRight")
    re_ans = re.compile("Right Answer:? [\W\w]+?\n[\n\d]")
    with open(dir_path+filename, 'r') as file:
        quiz_txt = file.read()

    print(f"Successfully read {filename}")

    list_ques = re.findall(re_ques, quiz_txt)
    list_ans = re.findall(re_ans, quiz_txt)

    print(f"Total number of Q/A: {len(list_ques)}, {len(list_ans)}")
    # del quiz_txt

    dict_QnA = {"ques": [], "ans": []}
    for i, ques in enumerate(list_ques):
        print(f"Q {i}: ", ques)
        curr_options = re.findall(r"([ABCDE]\)[()A-Za-z? \d,“”'’‘:.-]+)\n?", ques)
        dict_ques = {
            "question": re.findall(r"([A-Za-z? \d,“”'’‘:.]+)\n", ques)[0],
            "options": {}
                     }
        for option in curr_options:
            dict_ques["options"][option[:2]] = option[3:]

        print(f"A {i}: ", list_ans[i])
        if k == 1:
            dict_ans = {
                "right_ans": re.findall(r"Right Answer \(([ABCDE]\): [\W\w]+?) Wrong", list_ans[i])[0],
                "wrong_ans": re.findall(r"Wrong Answer: ([\W\w]+?)\n", list_ans[i])[0]
            }
        else:
            dict_ans = {
                "right_ans": re.findall(r"Right Answer \(([ABCDE]\): .*)\nWrong", list_ans[i])[0],
                "wrong_ans": re.findall(r"Wrong Answer: ([\W\w]+?)\n", list_ans[i])[0]
            }

        print("**Q**", dict_ques)
        print("**A**", dict_ans)
        # append the list of dict_QnA
        dict_QnA["ques"].append(dict_ques)
        dict_QnA["ans"].append(dict_ans)

    print(f"Total number of Q/A: {len(list_ques)}")

    with open(dir_path+filename[:-4]+'.json', 'w') as file:
        json.dump(dict_QnA, file)

    print(f">>Dictionary of Q/A saved in {filename[:-4]+'.json'}")


if __name__ == "__main__":
    # 4.1 quiz
    read_txt_write_json('4.1_quiz.txt', k=1)
    # 4.2 quiz
    read_txt_write_json('4.2_quiz.txt', k=2)
    