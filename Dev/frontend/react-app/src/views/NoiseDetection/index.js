import React, { useState, useRef } from 'react';
import axios from 'axios';

function NoiseDetection() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      audioChunksRef.current = []; // Clear previous audio chunks
      
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
    const finalRecordingTime = recordingTime;
    if (finalRecordingTime < 10000) {
      setErrorMessage('Recording time is less than 10 seconds. Please try again.');
      setSuccessMessage(''); // Clear success message
      setRecordingTime(0);
      return;
    }

    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');

    try {
      const response = await axios.post('https://link2herresilience.com.au/api/noise-detection', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Server response:', response.data);
      setSuccessMessage('Audio successfully uploaded and processed.');
      setErrorMessage(''); // Clear error message
      // Handle server response here
    } catch (error) {
      console.error('Error sending audio to server:', error);
      setErrorMessage('Error uploading audio file. Please try again later.');
      setSuccessMessage(''); // Clear success message
    }

    setRecordingTime(0);
  };

  // Format time to display seconds with milliseconds
  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = time % 1000;
    return `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Noise Detection</h1>
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

export default NoiseDetection;