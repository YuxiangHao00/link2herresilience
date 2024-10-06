import React, { useState, useRef, useEffect } from 'react';
import './yoga.less';
import { v4 as uuidv4 } from 'uuid';

export default function AsanaDetail({ asana, asanaSequence, currentStep, onBack, onNextStep, sessionId, onRepeat }) {
  const [capturedImage, setCapturedImage] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
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

  useEffect(() => {
    async function getCameras() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setCameras(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedCamera(videoDevices[0].deviceId);
        }
      } catch (err) {
        console.error("Error getting cameras", err);
      }
    }
    getCameras();
  }, []);

  const startCamera = async () => {
    console.log("Starting camera...");
    try {
      console.log("Requesting user media...");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
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
    console.log("Stopping camera...");
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log("Track stopped:", track);
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraStarted(false);
    console.log("Camera stopped successfully");
  };

  const switchCamera = async () => {
    stopCamera();
    const currentIndex = cameras.findIndex(camera => camera.deviceId === selectedCamera);
    const nextIndex = (currentIndex + 1) % cameras.length;
    setSelectedCamera(cameras[nextIndex].deviceId);
    await startCamera();
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
          const fileId = uuidv4().slice(0, 8);
          const fileName = `${sessionId}_${fileId}.png`;
          const file = new File([blob], fileName, { type: 'image/png' });
          uploadImage(file, fileId);
        }, 'image/png');
        stopCamera();
        setIsCountingDown(false);
      } else {
        setCountdown(currentCount);
      }
    }, 1000);
  };

  const uploadImage = async (file, fileId) => {
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
        console.log(`File uploaded: ${sessionId}_${fileId}.png`);
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
    // 自动重新开始拍照流程
    retakePhoto();
  };

  useEffect(() => {
    // 当步骤改变时，重置摄像头状态
    setCapturedImage(null);
    setCountdown(3);
    if (cameraStarted) {
      stopCamera();
      startCamera();
    }
  }, [currentStep]);

  return (
    <div className="asana-detail">
      <div className="asana-content">
        <div className="left-container">
          <div className="step-image-container fixed-size">
            <img src={require(`./images/${getStepImage()}`)} alt={`${asana.name} - Step ${currentStep}`} className="step-image" />
          </div>
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
          <div className="camera-section">
            {!capturedImage ? (
              <>
                <div className="video-container fixed-size">
                  {cameraStarted ? (
                    <>
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline
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
                    <button onClick={startCamera} className="primary-button">
                      Start Camera
                    </button>
                  ) : (
                    <>
                      <button onClick={stopCamera} className="secondary-button">
                        Stop Camera
                      </button>
                      <button onClick={switchCamera} disabled={cameras.length <= 1} className="secondary-button">
                        Switch Camera
                      </button>
                    </>
                  )}
                  <button onClick={captureImage} disabled={!cameraStarted || isCountingDown} className="primary-button">
                    {isCountingDown ? `Capturing in ${countdown}...` : 'Capture'}
                  </button>
                </div>
                <div className="countdown-control">
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
                <div className="captured-image-container fixed-size">
                  <img src={capturedImage} alt="Captured" className="captured-image" />
                </div>
                <div className="camera-controls">
                  <button onClick={retakePhoto} className="secondary-button">Retake Photo</button>
                  <button onClick={analyzePhoto} className="primary-button">Analyze</button>
                </div>
              </>
            )}
          </div>
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