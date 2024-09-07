import React, { useState, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function SleepQuality() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const recordingTimeRef = useRef(0);
  const recordingUUID = useRef('');

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const options = { 
        audioBitsPerSecond : 128000,  // 设置比特率为 128 kbps
        mimeType : 'audio/webm'
      };
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      
      audioChunksRef.current = [];
      recordingUUID.current = uuidv4();
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = handleStop;

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setErrorMessage('');
      setSuccessMessage('');

      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        recordingTimeRef.current = elapsedTime;
        setRecordingTime(elapsedTime);
        if (elapsedTime >= 30000) {
          stopRecording();
        }
      }, 10);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setErrorMessage('Unable to access microphone. Please ensure you have granted permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      clearInterval(timerRef.current);
      setIsRecording(false);
    }
  };

  const handleStop = async () => {
    const finalRecordingTime = recordingTimeRef.current;
    console.log('Final recording time:', finalRecordingTime);

    if (finalRecordingTime < 10000) {
      setErrorMessage('Recording time is less than 10 seconds. Please try again.');
      setSuccessMessage('');
      setRecordingTime(0);
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
    } catch (error) {
      console.error('Error sending audio to server:', error);
      setErrorMessage('Error uploading audio file. Please try again later.');
      setSuccessMessage('');
    }

    setRecordingTime(0);
  };

  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = time % 1000;
    return `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sleep Quality</h1>
      <div className="mb-4">
        <button
          className={`px-4 py-2 rounded ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-[#00BD90] hover:bg-[#00A77D]'
          } text-white font-bold transition duration-300 ease-in-out`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <span className="ml-4">
          Recording Time: <span className="text-red-500 font-bold">{formatTime(recordingTime)}</span> seconds
        </span>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
}

export default SleepQuality;