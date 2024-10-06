import React, { useState, useRef, useEffect } from 'react';
import './yoga.less';
import { v4 as uuidv4 } from 'uuid';

export default function AsanaDetail({ asana, asanaSequence, currentStep, onBack, onNextStep, sessionId, onRepeat }) {
  const [capturedImage, setCapturedImage] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (cameraStarted && videoRef.current && streamRef.current) {
      console.log("Camera started, setting video source");
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraStarted]);

  const startCamera = async () => {
    console.log("Starting camera...");
    try {
      console.log("Requesting user media...");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1024 },
          height: { ideal: 1024 }
        } 
      });
      console.log("Stream obtained:", stream);
      if (videoRef.current) {
        console.log("Setting video source...");
        videoRef.current.srcObject = stream;
      } else {
        console.error("Video ref is null");
      }
      streamRef.current = stream;
      setCameraStarted(true);
      console.log("Camera started successfully");
    } catch (err) {
      console.error("Error accessing the camera", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setCameraStarted(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    setIsCountingDown(true);
    let currentCount = countdown;
    let timer = setInterval(() => {
      currentCount -= 1;
      if (currentCount === 0) {
        clearInterval(timer);
        const canvas = canvasRef.current;
        canvas.width = 1024;
        canvas.height = 1024;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0, 1024, 1024);
        canvas.toBlob((blob) => {
          const file = new File([blob], `${uuidv4()}.png`, { type: 'image/png' });
          uploadImage(file);
        }, 'image/png');
        stopCamera();
        setIsCountingDown(false);
      } else {
        setCountdown(currentCount);
      }
    }, 1000);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('sess_id', sessionId);
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5010/media_files/v1/uploads', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.code === 200) {
        console.log('Image uploaded successfully', data);
        setCapturedImage(URL.createObjectURL(file));
      } else {
        console.error('Failed to upload image', data);
      }
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setCountdown(3);
    startCamera();
  };

  const analyzePhoto = () => {
    // 这里添加分析功能
    console.log("Analyzing photo...");
  };

  const getStepImage = () => {
    return `P_${asana.id}_${currentStep}.png`;
  };

  const isLastStep = asanaSequence ? currentStep === asanaSequence.stepsCount : false;

  const handleNextOrRepeat = () => {
    if (isLastStep) {
      onRepeat(); // 调用传入的 onRepeat 函数
    } else {
      onNextStep();
    }
  };

  return (
    <div className="asana-detail">
      <div className="asana-content">
        <div className="left-container">
          <img src={require(`./images/${getStepImage()}`)} alt={`${asana.name} - Step ${currentStep}`} />
          {asanaSequence && (
            <div className="step-description">
              <h3>Step {currentStep}</h3>
              <p>{asanaSequence.steps[currentStep - 1]?.description}</p>
            </div>
          )}
          {asanaSequence?.annotation && (
            <p className="annotation">{asanaSequence.annotation}</p>
          )}
        </div>
        <div className="right-container">
          {!capturedImage ? (
            <>
              <div className="video-container">
                {cameraStarted ? (
                  <>
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    {isCountingDown && (
                      <div className="countdown-overlay">
                        {countdown}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="placeholder-box">
                    Click "Start Camera" to begin
                  </div>
                )}
              </div>
              <div className="camera-controls">
                {!cameraStarted ? (
                  <button onClick={startCamera}>
                    Start Camera
                  </button>
                ) : (
                  <button onClick={stopCamera}>
                    Stop Camera
                </button>
                )}
                <button onClick={captureImage} disabled={!cameraStarted || isCountingDown}>
                  {isCountingDown ? `Capturing in ${countdown}...` : 'Capture'}
                </button>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={countdown}
                  onChange={(e) => setCountdown(Number(e.target.value))}
                  disabled={isCountingDown}
                />
                <span>{countdown}s</span>
              </div>
            </>
          ) : (
            <>
              <img src={capturedImage} alt="Captured" className="captured-image" />
              <div className="camera-controls">
                <button onClick={retakePhoto}>Retake Photo</button>
                <button onClick={analyzePhoto}>Analyze</button>
              </div>
            </>
          )}
          <button 
            onClick={handleNextOrRepeat} 
            className="next-step-button"
          >
            {isLastStep ? 'Repeat' : 'Next Step'}
          </button>
        </div>
      </div>
      <button onClick={onBack} className="back-button">Back to Asanas</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}