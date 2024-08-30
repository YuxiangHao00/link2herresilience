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