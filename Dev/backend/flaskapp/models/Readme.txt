* EfficientPose:
** Pose estimation model methods used: 
	(source: https://github.com/daniegr/EfficientPose.git)
	- updates in the module imports, path join & parameters like b_verbose added 


* Addition of yoga_pose_estimator module:
>> API call format:
	http://0.0.0.0:5007/yoga_asana/v1/analyse?sess_id=demo_F1n@l&asana=Anantasana&step=4&file_id=aea3da9d&type=.jpg
	> parameters:
	- sess_id: yoga practice session id, consistent w/ frontend & backend file system
	- asana: type of yoga asana (out of 12)
	- step: current step number of a particular asana
	- file_id: set by backend media_files_app API
	- type: file format for images (jpg, png) w/ RGB channels (maximum resolution - 1024x1024)

** YogaPoseEstimation class for yoga pose estimation using EfficientPose model
	- Parameters: {sess_id, file_id, filename, filepath, path_sess_data, model_name, framework, b_visualize, b_store}
	default values: {sess_id="0", file_id="0", filename="", filepath="", path_sess_data="", model_name="II", framework="pytorch", b_visualize=True, b_store=True, b_verbose=False}
	eg. sess_id="demo#01", file_id="20adb629", filename="", model_name="II", b_verbose=False

** Yoga posture classification using kNN classifier: 
	- Each yoga asana has multiple steps in its yoga sequence to practice
		- Multi-classification done on each yoga step for 1 right posture & N wrong posture(s) classes where N is for each step
	eg. 
	API request call for 1 data instance:
	http://0.0.0.0:5007/yoga_asana/v1/analyse?sess_id=demo_F1n@l&asana=Anantasana&step=4&file_id=aea3da9d&type=.jpg
	Response:
	{
    	"pose_classification": {
        	"class_probability": 1.0,
        	"probability_comment": "Estimation of class probability out of 1 right posture class and 1 wrong posture(s) classes",
        	"right_posture": false
    	},
    	"pose_estimation": {
        	"annotated_result": {
            	"file_id": "ad554db0",
            	"filename": "20230317_080315_tracked.png",
            	"sess_id": "demo_F1n@l"
        	},
        	"msg": "Success of pose estimation from 20230317_080315.jpg file: True",
        	"success": true
    	},
    	"suggestion": "You didn't performed with a right posture. Please try to look into hand to improve it further."
	}

	- NOTE: Yoga posture classification has 10 yoga asanas as per "Yoga Dataset" with images & videos, 2 extra yoga asanas are {Pranayama, Chakrasana}
	Source: Suryawanshia, Y. et al., "Yoga dataset: A resource for computer vision-based analysis of Yoga asanas
	Dataset link: https://data.mendeley.com/datasets/jc4mmnvcdk/1 ((http://creativecommons.org/licenses/by/4.0/))
	"