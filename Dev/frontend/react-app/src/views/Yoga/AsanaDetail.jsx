import React, { useState, useRef, useEffect } from 'react';
import './yoga.less';
import { v4 as uuidv4 } from 'uuid';

// 压缩函数以使用 RGB PNG 格式
const compressImage = (file, maxSizeMB = 1) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // 计算缩放比例
        const maxSize = Math.max(width, height);
        if (maxSize > 1024) {
          const scale = 1024 / maxSize;
          width *= scale;
          height *= scale;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { alpha: false });
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, {
            type: 'image/png',
            lastModified: Date.now()
          }));
        }, 'image/png');
      };
    };
  });
};

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
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisTimeout, setAnalysisTimeout] = useState(null);

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
        const ctx = canvas.getContext('2d', { alpha: false }); // 确保使用 RGB
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(videoRef.current, 0, 0, 1024, 1024);
        canvas.toBlob(async (blob) => {
          const fileId = uuidv4().slice(0, 8);
          const fileName = `${sessionId}_${fileId}.png`;
          const file = new File([blob], fileName, { type: 'image/png' });
          
          const compressedFile = await compressImage(file);
          
          uploadImage(compressedFile, fileId);
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
      const response = await fetch('https://link2herresilience.com.au/media_files/v1/uploads', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.code === 200) {
        console.log('Image uploaded successfully', data);
        setCapturedImage(URL.createObjectURL(file));
        console.log(`File uploaded: ${sessionId}_${fileId}.png`);
        console.log(`API returned file_id: ${data.file_id}`);
        analyzePhoto(data.file_id);
      } else {
        console.error('Failed to upload image', data);
      }
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  const analyzePhoto = async (apiFileId) => {
    setIsAnalyzing(true);
    const timeoutId = setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({ error: 'Analysis timed out. Please try taking a clearer photo with less background clutter.' });
    }, 50000); // 50 seconds timeout
    setAnalysisTimeout(timeoutId);

    try {
      const url = `https://link2herresilience.com.au/yoga_asana/v1/analyse?sess_id=${sessionId}&asana=${asana.name}&step=${currentStep}&file_id=${apiFileId}&type=png`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      clearTimeout(timeoutId);
      setAnalysisResult(data);
    } catch (error) {
      console.error('Error analyzing photo', error);
      setAnalysisResult({ error: 'Failed to analyze photo. Please try again.' });
    } finally {
      clearTimeout(timeoutId);
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    return () => {
      if (analysisTimeout) {
        clearTimeout(analysisTimeout);
      }
    };
  }, [analysisTimeout]);

  const retakePhoto = () => {
    setCapturedImage(null);
    setCountdown(3);
    startCamera();
  };

  const getStepImage = () => {
    return `P_${asana.id}_${currentStep}.png`;
  };

  const isLastStep = asanaSequence ? currentStep === asanaSequence.stepsCount : false;

  const handleNextOrRepeat = () => {
    if (isLastStep) {
      onRepeat(); // 调用传入 onRepeat 函数
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

  // 添加这个新的组件来格式化分析结果
  const FormattedAnalysisResult = ({ result, asanaName }) => {
    if (!result) return null;

    if (result.error) {
      return (
        <div className="formatted-analysis-result error">
          <h3>Analysis Error</h3>
          <p>{result.error}</p>
        </div>
      );
    }

    const poseProbability = result.pose_classification?.class_probability;
    const isRightPosture = result.pose_classification?.right_posture;
    const probabilityComment = result.pose_classification?.probability_comment;
    const success = result.pose_estimation?.success;
    const suggestion = result.suggestion;

    const isPranayamaOrChakrasana = asanaName === 'Pranayama' || asanaName === 'Chakrasana';

    return (
      <div className="formatted-analysis-result">
        <h3>Analysis Result</h3>
        {!isPranayamaOrChakrasana && (
          <>
            {poseProbability !== undefined && (
              <p>Pose estimation: <strong>{Math.round(poseProbability * 100)}%</strong></p>
            )}
            {isRightPosture !== undefined && (
              <p>Correct Posture: <strong>{isRightPosture ? 'Yes' : 'No'}</strong></p>
            )}
            {probabilityComment && (
              <p className="probability-comment">{probabilityComment}</p>
            )}
          </>
        )}
        {success !== undefined && (
          <p>Analysis Successful: <strong>{success ? 'Yes' : 'No'}</strong></p>
        )}
        {suggestion && (
          <div className="suggestion">
            <h4>Suggestion:</h4>
            <p>{suggestion}</p>
          </div>
        )}
      </div>
    );
  };

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
                </div>
              </>
            )}
          </div>
          {capturedImage && (
            <div className="analysis-result">
              {isAnalyzing ? (
                <div className="analyzing-message">
                  <p>Analyzing your pose, please wait...</p>
                  <div className="loading-spinner"></div>
                </div>
              ) : analysisResult ? (
                <FormattedAnalysisResult result={analysisResult} asanaName={asana.name} />
              ) : (
                <p>No analysis result yet.</p>
              )}
            </div>
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