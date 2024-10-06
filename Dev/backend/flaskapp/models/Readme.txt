* EfficientPose:
** Pose estimation model methods used: 
	(source: https://github.com/daniegr/EfficientPose.git)
	- updates in the module imports, path join & parameters like b_verbose added 


* Addition of yoga_pose_estimator module:
** YogaPoseEstimation class for yoga pose estimation using EfficientPose model
	- Parameters: {sess_id, file_id, filename, filepath, path_sess_data, model_name, framework, b_visualize, b_store}
	default values: {sess_id="0", file_id="0", filename="", filepath="", path_sess_data="", model_name="II", framework="pytorch", b_visualize=True, b_store=True, b_verbose=False}
	eg. sess_id="demo#01", file_id="20adb629", filename="", model_name="II", b_verbose=False