"""
FIT5120: IE Studio experience project
Project: Link2 HerResilience
Team: Harmony (TA18)
Author: Mandeep Singh

Sleep pattern analysis using J48 pruned tree and attributes with high 
correlation with sleep quality
"""

# import os

class SleepQuality_j48():
    '''
    class to get estimate of sleep quality category based on user's 
    inputs by using J48 pruned tree
    '''
    def __init__(self, args=dict()):
        self.input = self.update_input(args)
        self.sleep_quality = dict()
        self.sleep_quality['low'] = 0.0
        self.sleep_quality['high'] = 10.0
        self.sleep_quality['fraction'] = 0.0
        self.sleep_quality['category'] = 'NORMAL'
        self.sleep_quality['suggestion'] = None

        self.sleep_quality_suggestions = {
            "BAD": "Your sleep quality is being affected by the factors like " +\
                "sleep duration and/or stress level. It is recommended by medical " +\
                "institutes & practioners to decrease stress levels & have 6-8 hours of sleep",
            "NORMAL": "Currently, your sleep quality is in normal range which can be enhanced " +\
                "by mindfully reducing stress & regular sleep of 6-8 hours.",
            "GOOD": "That's wonderful that your are having quality sleep. You can maintain that " +\
                "by having comfortable bed with reduced light exposure atleast 30 min. before " +\
                "sleeping and being mindful."
        }

    
    def update_input(self, args=dict()):
        '''
        method to update input dict
        '''
        self.input = args

    
    def update_sleep_quality(self):
        '''
        method to update high, low of sleep_quality
        '''
        threshold_low = 6.1
        threshold_high = 8.5

        # trained J48 pruned tree
        if self.input['stress_level'] <= 6:
            if self.input['sleep_duration'] <= 7.9:
                if self.input['sleep_duration'] <= 6.9:
                    if self.input['heart_rate'] <= 75:
                        self.sleep_quality['high'] = 7
                        self.sleep_quality['low'] = 6.5
                        self.sleep_quality['fraction'] = 31.0/374.0
                    else:
                        self.sleep_quality['high'] = 6
                        self.sleep_quality['low'] = 5.5
                        self.sleep_quality['fraction'] = 4.0/374.0
                else:
                    if self.input['stress_level'] <= 5:
                        if self.input['heart_rate'] <= 76:
                            self.sleep_quality['high'] = 8
                            self.sleep_quality['low'] = 7.5
                            self.sleep_quality['fraction'] = 105.0/374.0
                        else:
                            self.sleep_quality['high'] = 7
                            self.sleep_quality_low = 6.5
                            self.sleep_quality['fraction'] = 4.0/374.0
                    else:
                        if self.input['sleep_duration'] <= 7.4:
                            if self.input['sleep_duration'] <= 7.1:
                                self.sleep_quality['high'] = 7
                                self.sleep_quality['low'] = 6.5
                                self.sleep_quality['fraction'] = 3.0/374.0
                            else:
                                self.sleep_quality['high'] = 8
                                self.sleep_quality['low'] = 7.5
                                self.sleep_quality['fraction'] = 4.0/374.0
                        else:
                            self.sleep_quality['high'] = 7
                            self.sleep_quality['low'] = 6.5
                            self.sleep_quality['fraction'] = 32.0/374.0
            else:
                self.sleep_quality['high'] = 10.0
                self.sleep_quality['low'] = 8.5
                self.sleep_quality['fraction'] = 71.0/374.0                    
                        
        else:
            if self.input['age'] <= 51:
                if self.input['sleep_duration'] <= 5.9:
                    self.sleep_quality['high'] = 4.5
                    self.sleep_quality['low'] = 0.0
                    self.sleep_quality['fraction'] = 6.0/374.0
                else:
                    if self.input['heart_rate'] <= 76:
                        if self.input['sleep_duration'] <= 6.5:
                            self.sleep_quality['high'] = 6
                            self.sleep_quality['low'] = 5.5
                            self.sleep_quality['fraction'] = 96.0/374.0
                        else:
                            self.sleep_quality['high'] = 5
                            self.sleep_quality['low'] = 4.5
                            self.sleep_quality['fraction'] = 3.0/374.0
                    else:
                        if self.input['sleep_duration'] <= 6.6:
                            self.sleep_quality['high'] = 5
                            self.sleep_quality['low'] = 4.5
                            self.sleep_quality['fraction'] = 6.0/374.0
                        else:
                            self.sleep_quality['high'] = 6
                            self.sleep_quality['low'] = 5.5
                            self.sleep_quality['fraction'] = 3.0/374.0
            else:
                self.sleep_quality['high'] = 7
                self.sleep_quality['low'] = 6.5
                self.sleep_quality['fraction'] = 6.0/374.0

        # update sleep category & suggestion
        if (self.sleep_quality['high'] + self.sleep_quality['low'])/2 < threshold_low:
            self.sleep_quality['category'] = 'BAD'
        elif (self.sleep_quality['high'] + self.sleep_quality['low'])/2 < threshold_high:
            self.sleep_quality['category'] = 'NORMAL'
        else:
            self.sleep_quality['category'] = 'GOOD'
        
        self.sleep_quality['suggestion'] = self.sleep_quality_suggestions[self.sleep_quality['category']]