import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Button, message, Card, Tag } from 'antd';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';

function CustomProgressBar({ percent, recordingTime }) {
  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = time % 1000;
    return `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
  };

  return (
    <div className="relative w-full h-4 bg-gray-200 rounded">
      <div 
        className="absolute top-0 left-0 h-full bg-blue-500 rounded-l"
        style={{ width: `${Math.min(percent, 33.33)}%` }}
      ></div>
      <div 
        className="absolute top-0 left-0 h-full bg-green-500"
        style={{ width: `${Math.min(Math.max(percent - 33.33, 0), 66.67)}%`, marginLeft: '33.33%' }}
      ></div>
      {percent >= 33.33 && (
        <div className="absolute top-0 left-1/3 w-0.5 h-full bg-red-500"></div>
      )}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs text-black font-bold">
        {formatTime(recordingTime)}s
      </div>
    </div>
  );
}

function NoiseDetection() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAnalyzeEnabled, setIsAnalyzeEnabled] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const recordingUUID = useRef('');
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopAudioStream();
    };
  }, []);

  const resetRecordingState = () => {
    setRecordingTime(0);
    setErrorMessage('');
    setSuccessMessage('');
    setIsAnalyzeEnabled(false);
    audioChunksRef.current = [];
    setIsRecording(false);
    setIsPaused(false);
    recordingUUID.current = uuidv4();
  };

  const stopAudioStream = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const startRecording = async () => {
    try {
      stopAudioStream();
      if (timerRef.current) clearInterval(timerRef.current);

      resetRecordingState();
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const options = { 
        audioBitsPerSecond : 128000,
        mimeType : 'audio/webm'
      };
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      startTimer();
    } catch (error) {
      console.error('Unable to access microphone:', error);
      setErrorMessage('Unable to access microphone. Please ensure you have granted permission.');
    }
  };

  const startTimer = () => {
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      setRecordingTime(elapsedTime);
      if (elapsedTime >= 30000) {
        stopRecording();
      }
    }, 10);
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      clearInterval(timerRef.current);
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      startTimer();
      setIsPaused(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      clearInterval(timerRef.current);
      setIsRecording(false);
      setIsPaused(false);
      setIsAnalyzeEnabled(true);
      stopAudioStream();
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    clearInterval(timerRef.current);
    stopAudioStream();
    resetRecordingState();
  };

  const analyzeRecording = async () => {
    if (recordingTime < 10000) {
      message.error('Recording time is less than 10 seconds. Unable to analyze.');
      return;
    }

    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
    const formData = new FormData();
    const fileName = `SQ_Recording_${recordingUUID.current}.wav`;
    formData.append('audio', audioBlob, fileName);

    try {
      const response = await axios.post('https://link2herresilience.com.au/api/noise-detection', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Server response:', response.data);
      setSuccessMessage(`Audio successfully uploaded and processed. File name: ${fileName}`);
      setErrorMessage('');
      setAnalysisResult(response.data); // Store the analysis result
    } catch (error) {
      console.error('Error sending audio to server:', error);
      setErrorMessage('Error uploading audio file. Please try again later.');
      setSuccessMessage('');
    }
  };

  const getNoiseLevel = (level) => {
    if (level === 'high') return 'red';
    if (level === 'medium') return 'yellow';
    return 'green';
  };

  const getNoiseLevelText = (level) => {
    if (level === 'high') return 'High';
    if (level === 'medium') return 'Medium';
    return 'Low';
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Recording Card */}
      <Card className="mb-4">
        <div className="flex flex-col items-center space-y-4">
          {/* Recording controls */}
          <div className="flex items-center space-x-4 w-full">
            <div className="flex-shrink-0">
              {!isRecording ? (
                <Button 
                  type="primary" 
                  shape="circle" 
                  icon={<PlayCircleFilled />} 
                  onClick={startRecording}
                  size="large"
                  className="bg-[#00BD90] hover:bg-[#00A77D]"
                />
              ) : (
                isPaused ? (
                  <Button 
                    shape="circle" 
                    icon={<PlayCircleFilled />} 
                    onClick={resumeRecording}
                    size="large"
                    className="bg-[#00BD90] hover:bg-[#00A77D]"
                  />
                ) : (
                  <Button 
                    shape="circle" 
                    icon={<PauseCircleFilled />} 
                    onClick={pauseRecording}
                    size="large"
                    className="bg-[#00BD90] hover:bg-[#00A77D]"
                  />
                )
              )}
            </div>
            <div className="flex-grow">
              <CustomProgressBar 
                percent={(recordingTime / 30000) * 100}
                recordingTime={recordingTime}
              />
            </div>
          </div>
          
          {/* Control buttons */}
          <div className="flex justify-center items-center space-x-4">
            <Button 
              onClick={stopRecording} 
              disabled={!isRecording}
              className="bg-[#00BD90] text-white hover:bg-[#00A77D]"
            >
              Stop
            </Button>
            <Button 
              onClick={cancelRecording} 
              className="bg-[#00BD90] text-white hover:bg-[#00A77D]"
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              onClick={analyzeRecording} 
              disabled={!isAnalyzeEnabled}
              className="bg-[#00BD90] text-white hover:bg-[#00A77D]"
            >
              Analyze
            </Button>
          </div>
          
          {/* Error and success messages */}
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
        </div>
      </Card>
      
      {/* Analysis Result Card */}
      <Card className="mb-4">
        <div className="p-4">
          {analysisResult ? (
            <>
              {/* Noise level indicator */}
              <div className="flex justify-center mb-4">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-${getNoiseLevel(analysisResult.noiseLevel)}-500`}>
                  <span className="text-white font-bold">
                    {getNoiseLevelText(analysisResult.noiseLevel)}
                  </span>
                </div>
              </div>
              
              {/* Source tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {analysisResult.sources.map((source, index) => (
                  <Tag key={index} color="blue">{source}</Tag>
                ))}
              </div>
              
              {/* Explanation */}
              <p className="text-center">{analysisResult.explanation}</p>
            </>
          ) : (
            <p className="text-center text-gray-500">Analysis results will be displayed here</p>
          )}
        </div>
      </Card>
    </div>
  );
}

export default NoiseDetection;