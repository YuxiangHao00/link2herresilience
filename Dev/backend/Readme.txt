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