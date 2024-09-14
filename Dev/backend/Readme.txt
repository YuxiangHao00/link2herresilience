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
	-  0.0.0.0:5004/sleep_quality/v1/analyse?days=[2,3,4]&start=[2122,1133,1134]&durations=[4,5.1,2]
	
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