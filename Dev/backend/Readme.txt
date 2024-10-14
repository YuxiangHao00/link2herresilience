Utility app:
** Media files upload/fetch API call
	- upload image: POST method with following parameters (form-type): ["sess_id", "file"]
		http://0.0.0.0:5010/media_files/v1/fetch?sess_id=demo%2301&file_id=a7c5e7a9
	- fetch image: GET method with parameters: ["sess_id", "file_id"]
		http://0.0.0.0:5010/media_files/v1/fetch?sess_id=demo%2301&file_id=a7c5e7a9
	
	Note:
	- sess_id: <string> for unique session id
	- file_id: <string> of length=8, generated using uuid while uploading
	- file: <File> in format: {"jpg", "png"}, size limit 3*1024*1024


Epic2:
* Air quality API calls:
	- all states AQI, AQC for each day:
		127.0.0.1:5001/air_quality/v1/states
	- 1 state AQI along w/ AQ parameter values: ['pm2_5', 'pm10', 'co', 'no2', 'so2', 'aqc', 'visibility']:
		127.0.0.1:5001/air_quality/v1/states?state=vic
	- 1 state, all suburbs AQ parameter values 
		127.0.0.1:5001/air_quality/v1/suburbs?state=vic
	- 1 state, 1 suburb AQ parameter values for all days
		127.0.0.1:5001/air_quality/v1/suburbs?state=vic&suburb_code=20314&suburb=Box Hill

* Allergic Pollen grains API calls:
	- List of pollen grains in all AUS states:
		127.0.0.1:5002/allergic_pollen/v1/pollens
	- Pollen grains in 1 state:
		127.0.0.1:5002/allergic_pollen/v1/pollens?state=vic
	- List of all pollen grains with count in 1 state:
		127.0.0.1:5002/allergic_pollen/v1/stateCount?state=vic
	- List of 1 pollen grain's count along with pollen grains list in that state:
		127.0.0.1:5002/allergic_pollen/v1/stateCount?state=vic&pollen=betula
	- List of 1 pollen grain's count (for a duration of <int:N> weeks) along with pollen grains list in that state:
		127.0.0.1:5002/allergic_pollen/v1/stateCount?state=vic&pollen=betula&duration=4


Epic3:
* Sleep Quality
** API call for Sleep Pattern analysis:
	-  0.0.0.0:5004/sleep_quality/v1.1/analyse?days=[2,3,4]&start=[2122,1133,1134]&durations=[4,5.1,2]
	
	Note:
	- days, start, durations: str type which is parsed when in correct format
	- days range: [1, 7] (int)
	- start range: 0000 - 2359 (HHMM format)
	- durations range: 0.0 - 24.0  (float)
	- included request input checks w/ err_codes having range: [0, 31]

** API call for sleep quality estimation using J48 pruning tree
	- http://0.0.0.0:5004/sleep_quality/v1.1/analyse?days=[2,3,4]&start=[2122,1133,1134]&durations=[6,5,5.5]&stress_levels=[5,5,9]
	- http://0.0.0.0:5004/sleep_quality/v1.1/analyse?days=[2,3,4]&start=[2122,1133,1134]&durations=[6,5,5.5]&stress_levels=[5,5,9]&age=30
	- http://0.0.0.0:5004/sleep_quality/v1.1/analyse?days=[2,3,4]&start=[2122,1133,1134]&durations=[6,5,5.5]&stress_levels=[5,5,9]&age=30&heart_rates=[70,73,75]

	Note:
	- Included other factors: stress_levels, heart_rates, age which have significant correlation with the sleep quality (with option to have inputs from user for any combination of these 3)
	- stress_levels range: [0, 10] (float)
	- heart_rates range: [40, 140] (float)
	- age range: [0, 150] (float)


Epic4:
* Sexual Health Education
** API call to fetch quiz questions on a topic from {'sexual health', 'prevention'}
	- http://0.0.0.0:5005/health_education/v1/quiz?topic=prevention

** API call to get score & report details based on the user response for set of 5 questions
	- http://0.0.0.0:5005/health_education/v1/quiz?topic=sexual health&questions=[7,1,16,3,14]&answers=[B),B),A),C),C)]
	- http://0.0.0.0:5005/health_education/v1/quiz?topic=prevention&questions=[7,1,16,3,14]&answers=[B),B),A),C),A)]

	Note:
	- topic range: {'sexual health', 'prevention'}
	- questions: must be in range of [0, total_questions_on_topic-1]
	- answers range: {'A)', 'B)', 'C)', 'D)' 'E)'} (should match "question_id" from quiz)

Epic6:
* Yoga Asana
** API call to provide response for image(s) captured by users to analyze its pose in the current step of yoga sequence using pose estimation model to support the self-paced yoga practice & provide actionable insights for pose correction
	- http://0.0.0.0:5007/yoga_asana/v1/analyse?sess_id=demo%2301&asana=Anantasana&step=1&file_id=2cf2efad&type=.jpg
	
	Note:
	- sess_id: <string>
	- asana: <string> out of 12 yoga asanas (in lower case): {'anantasana', 'ardhakati chakrasana', 'vajrasana', 'tadasana', 'marjariasana', 'parvatasana', 'bhujangasana', 'viparita karani', 'kati chakrasana', 'sarvangasana'}
	- step: <int> respective step of yoga sequence
	- file_id: <string> unique file id of length 8, to index uploaded images
	- type: (supported format) <string> {"image": ["jpeg", "jpg", "png"], "video": ["mp4", "mpeg4"]}


Epic7:
* Predictive model for addiction &/or substance abuse risk
** API call to provide response for risk prediction of stressful lifestyle, addiction & substance abuse & provide actionable insights
	- http://0.0.0.0:5008/lifestyle/v1/analyse_risk?session_id=demo_F1n@l&section_id=[2,2,2,2,3,3,3,4,5,6]&question_id=[3a,3b,3c,4,2,5,6,3,3,1]&response_id=[2,1,1,3,3,2,1,3,2,1]

	Note:
	- session_id: <str> from client side
	- section_id: mandatory sections: (range 2-6)
	- question_id: mandatory questions: [3a,3b,3c,4,2,5,6,3,3,1]
	- response_id: range (1-3 or 1-4 as per NSDUH attribute)