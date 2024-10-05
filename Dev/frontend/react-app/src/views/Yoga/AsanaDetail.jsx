import React, { useState, useRef, useEffect } from 'react';
import './yoga.less';

export default function AsanaDetail({ asana, onBack }) {
  const [capturedImage, setCapturedImage] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

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
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
  };

  const captureImage = () => {
    setIsCountingDown(true);
    let currentCount = countdown;
    let timer = setInterval(() => {
      currentCount -= 1;
      if (currentCount === 0) {
        clearInterval(timer);
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
        setCapturedImage(canvas.toDataURL('image/jpeg'));
        stopCamera();
        setIsCountingDown(false);
      } else {
        setCountdown(currentCount);
      }
    }, 1000);
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

  return (
    <div className="asana-detail">
      <p className="intro-text">
        A <strong>sick & restless</strong> human <strong>disperses pranas</strong>, whereas <strong>peaceful & healthy</strong> person keeps <strong>pranas within</strong> the body & live a good life!
      </p>
      <h1>{asana.name} ({asana.englishName})</h1>
      <div className="asana-content">
        <div className="left-container">
          <img src={require(`./images/Y_9.png`)} alt={asana.name} />
          <p className="bold-text">It is the first & foremost awareness of breath, where we focus our attention on our breath.</p>
          <p className="bold-text">This step involves sitting in a comfortable location (eg. ground) with cross-legged as the most common position.</p>
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
                <button 
                  onClick={startCamera} 
                  disabled={cameraStarted}
                >
                  Start Camera
                </button>
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
        </div>
      </div>
      <button onClick={onBack} className="back-button">Back to Asanas</button>
    </div>
  );
}