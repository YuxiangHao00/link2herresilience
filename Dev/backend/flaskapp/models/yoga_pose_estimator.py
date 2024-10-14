"""
FIT5120: IE Studio experience project
Project: Link2 HerResilience
Team: Harmony (TA18)
Author: Mandeep Singh

Yoga pose estimation pipeline using human pose estimator model
& yoga pose classifier to support yoga_asana API
"""

import os
import pandas as pd
from models import EfficientPose
from models.EfficientPose import track
from os.path import join, normpath
from pymediainfo import MediaInfo
import numpy as np
import uuid
import csv
import time

class YogaPoseEstimation():
    """
    class to load pose estimation model
    """
    def __init__(self, sess_id="0", file_id="0", filename="", filepath="", path_sess_data="", 
                 model_name="II", framework="pytorch", b_visualize=True, b_store=True, b_verbose=False):
        """
        class constructor
        """
        self.sess_id = sess_id
        self.pose_estimator = model_name
        self.framework = framework
        self.b_visualize = b_visualize
        self.b_store = b_store
        if path_sess_data == "":
            self.parent_dirpath = os.path.dirname(os.getcwd())
            self.path_session_data = self.parent_dirpath + "/session_data"
        else:
            self.path_session_data = path_sess_data
        self.file_id = file_id
        
        self.b_from_csv = True
        # field names
        self.csv_fieldnames = ["sess_id", "file_id", "filename"]
        # update file_path
        if not len(filename):
            self.get_file_name(self.file_id)
        
        self.file_path = self.path_session_data + "/" + self.file_name

        self.b_verbose = b_verbose

    def analyse_pose(self,):
        """
        method to analyse the human pose in the file
        """
        # if 1: 
        try:
            if 'Image' in [track.track_type for track in MediaInfo.parse(self.file_path).tracks]:
                print("model_name:", self.pose_estimator)
                b_tracked = track.perform_tracking(video=False, file_path=normpath(self.file_path), 
                                model_name=self.pose_estimator, framework_name=self.framework, 
                                visualize=self.b_visualize, store=self.b_store, b_verbose=self.b_verbose)
                
                # update dict for saved tracked file 
                dictrow_csv_filenames = {"sess_id": self.sess_id}

                if self.b_visualize and b_tracked:
                    dictrow_csv_filenames["filename"] = self.file_name.split(".")[0]+"_tracked.png"
                    dictrow_csv_filenames["file_id"] = str(uuid.uuid4())[:8]
                    self.update_sess_filenames_csv(dictrow_csv_filenames)
                    
                return {
                    "pose_estimation": {
                        "success": b_tracked,
                        "msg": f"Success of pose estimation from {self.file_name} file: {b_tracked}",
                        "annotated_result": dictrow_csv_filenames
                    }
                }
        
            else:
                return {
                    "err_code": 201,
                    "msg": 'Ensure supplied file "{0}" is a video or image'.format(self.file_name)
                }
        # else: 
        except:
            return {
                "err_code": 101,
                "msg": f"exception in yoga pose estimator to analyse pose from {self.file_name} file"
            }
            

    def get_file_name(self, file_id):
        """
        method to get file path using file_id
        """
        # dataframe with session filenames w/ file_id
        df_sess_filenames = pd.read_csv(self.path_session_data+"/sess_filenames.csv")
        self.file_name = df_sess_filenames[df_sess_filenames["file_id"] == file_id]["filename"].values[0]


    def update_sess_filenames_csv(self, dictrow, b_firstrow=False):
        """
        method to update csv sess_filenames with dictrow
        """
        if self.b_from_csv:
            with open(self.path_session_data + "/sess_filenames.csv", "a") as file:
                dictwriter_obj = csv.DictWriter(file, fieldnames=self.csv_fieldnames)
                if b_firstrow:
                    dictwriter_obj.writeheader()
                dictwriter_obj.writerow(dictrow)
                file.close()


if __name__ == "__main__":
    # instance
    yogaPose = YogaPoseEstimation(sess_id="demo#01", file_id="20adb629", filename="", model_name="II",
                                  b_verbose=False)
    print(yogaPose.analyse_pose())
