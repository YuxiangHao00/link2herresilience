"""
FIT5120: IE Studio experience project
Project: Link2 HerResilience
Team: Harmony (TA18)
Author: Mandeep Singh

API to upload media file(s) to server directory/db or fetch image(s) to be 
send to the client side
"""

import os
import pandas as pd
import csv
from flask import Flask, send_from_directory, jsonify
from flask_restful import Resource, Api, request, reqparse
import werkzeug
from werkzeug.utils import secure_filename
import uuid
import imghdr
# import json
from flask_cors import CORS

app0 = Flask(__name__)
CORS(app0, resources={r"/*": {"origins": "*"}})
api = Api(app0, prefix="/media_files/v1")

app0.config["MAX_CONTENT_LENGTH"] = 3 * 1024 * 1024
app0.config["UPLOAD_EXTENSIONS"] = [".jpg", ".png"]
app0.config["UPLOAD_PATH"] = "./session_data"


def check_image_format(stream):
    """
    method to check the header content of the stream for it to be of 
    correct image format
    """
    # read first 512 B for the header
    header = stream.read(512)
    stream.seek(0)
    format = imghdr.what(None, header)
    if not format:
        return None
    return "." + (format if format != "jpeg" else "jpg")


class Images(Resource):
    """
    class to handle image(s) related requests
    """
    def __init__(self, b_from_csv = True):
        """
        class constructor
        """
        self.b_from_csv = b_from_csv
        if self.b_from_csv:
            if not os.path.isdir("./session_data"):
                os.mkdir("./session_data")
            self.path_sess_filenames = "./session_data/sess_filenames.csv"

            # field names
            self.csv_fieldnames = ["sess_id", "file_id", "filename"]
            dict_base = {"sess_id": "0", "file_id": "0", "filename": "NA"}

            if not os.path.isfile(self.path_sess_filenames):
                # pd.DataFrame(dict_base, columns=self.csv_fieldnames).to_csv(self.path_sess_filenames)
                self.update_sess_filenames_csv(dict_base, True)
    
    def update_sess_filenames_csv(self, dictrow, b_firstrow=False):
        """
        method to update csv sess_filenames with dictrow
        """
        if self.b_from_csv:
            with open(self.path_sess_filenames, "a") as file:
                dictwriter_obj = csv.DictWriter(file, fieldnames=self.csv_fieldnames)
                if b_firstrow:
                    dictwriter_obj.writeheader()
                dictwriter_obj.writerow(dictrow)
                file.close()


    def post(self):
        """
        POST request handler
        """
        # session info: ID
        sess_id = request.form.get("sess_id")
        # image_name = request.form.get("file_name")
        uploaded_image = request.files.get("file")

        unique_str = str(uuid.uuid4())[:8]
        # append random string if UPLOAD_PATH has existing filename
        if self.b_from_csv:
            df_sess_filenames = pd.read_csv(self.path_sess_filenames)
            if sess_id in df_sess_filenames[["sess_id"]].values and\
                secure_filename(uploaded_image.filename) in \
                    df_sess_filenames[df_sess_filenames["sess_id"] == sess_id][["filename"]].values:
                uploaded_image.filename = f"{unique_str}_{uploaded_image.filename}"
        else:
            if secure_filename(uploaded_image.filename) in os.listdir(app0.config["UPLOAD_PATH"]):
                uploaded_image.filename = f"{unique_str}_{uploaded_image.filename}"

        #  handling file uploads
        filename = secure_filename(uploaded_image.filename)
        if filename:
            file_extension = os.path.splitext(filename)[1]
            if file_extension not in app0.config["UPLOAD_EXTENSIONS"] or \
                    file_extension != check_image_format(uploaded_image.stream):
                return {"error": "File format type is not supported"}, 400

            uploaded_image.save(os.path.join(app0.config["UPLOAD_PATH"], filename))
            # update dictrow to be saved in sess_filenames
            dictrow = dict()
            dictrow["sess_id"] = sess_id
            dictrow["file_id"] = unique_str
            dictrow["filename"] = filename

            # index it in csv 
            if self.b_from_csv:
                self.update_sess_filenames_csv(dictrow)

            return jsonify({
                "code": 200,
                "msg": "File uploaded successfully",
                "file_id": unique_str})
        
    def get(self,):
        """
        GET request handler
        """
        parser = reqparse.RequestParser()
        parser.add_argument('sess_id', type=str, location="args", required=True)
        parser.add_argument('file_id', type=str, location="args", required=True)
        parser.add_argument('filename', type=str, location="args")
        args = parser.parse_args()
        
        # path to the file
        if self.b_from_csv:
            df_sess_filenames = pd.read_csv(self.path_sess_filenames)
            df_subset = df_sess_filenames[df_sess_filenames["sess_id"] == args["sess_id"]].copy()
            filename = df_subset[df_subset["file_id"] == args["file_id"]]["filename"].values
            if filename.size == 0:
                return jsonify({
                    "code": 200,
                    "msg": f'File with sess_id: {args["sess_id"]}, file_id: {args["file_id"]} not present'
                })
            return send_from_directory(app0.config["UPLOAD_PATH"], filename[0])
        

api.add_resource(Images, "/uploads", endpoint="ImgUpload")
api.add_resource(Images, "/fetch", endpoint="FetchImg")

if __name__ == "__main__":
    app0.run(port=5010)
