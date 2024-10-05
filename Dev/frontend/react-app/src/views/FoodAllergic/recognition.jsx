import React, { useState, useEffect } from 'react';
import { useZxing } from "react-zxing";
import { message, Input, Space, Alert, Spin, Button } from 'antd';
import axios from 'axios';
import './Food.less';

export default function AllergenRecognition() {
  const [barcode, setBarcode] = useState('');
  const [productInfo, setProductInfo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [scanningError, setScanningError] = useState(false);

  const { ref } = useZxing({
    onDecodeResult(result) {
      console.log("Barcode detected:", result.getText());
      setBarcode(result.getText());
      fetchProductInfo(result.getText());
      setScanning(false);
    },
    onError(error) {
      console.error("Scanning error:", error);
      setScanningError(true);
      message.warning('Unable to detect barcode. Please adjust the barcode position.');
    },
  });

  useEffect(() => {
    // Detect if the device is mobile
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iPad|iPhone|iPod/i.test(userAgent)) {
      setIsMobile(true);
    }

    // 添加调试日志
    console.log("Component mounted, scanning:", scanning);
  }, []);

  // Function to fetch product information using barcode
  const fetchProductInfo = async (code) => {
    console.log("Fetching product info for barcode:", code);
    try {
      const response = await axios.get(`https://world.openfoodfacts.org/api/v3/product/${code}.json`);
      setProductInfo(response.data);
      message.success('Product information fetched successfully!');
    } catch (error) {
      console.error('Error fetching product info:', error);
      message.error('Failed to fetch product information. Please try again.');
    }
  };

  // Handle manual input if needed
  const handleManualInput = (e) => {
    setBarcode(e.target.value);
  };

  const handleSubmit = () => {
    if (barcode) {
      fetchProductInfo(barcode);
    } else {
      message.warning('Please enter a barcode');
    }
  };

  const toggleScanning = () => {
    setScanning(!scanning);
    setScanningError(false);
  };

  return (
    <div className="allergen-recognition">
      <h1 className="title">Allergen Recognition</h1>
      <p>Scan or enter a barcode to get product information</p>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="video-container">
          {scanning && <div className="scanning-overlay">Scanning for barcode...<Spin /></div>}
          <video ref={ref} className="video-element" playsInline />
        </div>
        {scanningError && (
          <Alert message="Unable to detect barcode. Please ensure the barcode is visible and well-lit." type="warning" showIcon />
        )}
        <Space className="input-group">
          <Input
            placeholder="Enter barcode manually"
            value={barcode}
            onChange={handleManualInput}
            className="manual-input"
          />
          <Button type="primary" onClick={handleSubmit}>Submit</Button>
        </Space>
        <Button onClick={toggleScanning}>{scanning ? 'Stop Scanning' : 'Start Scanning'}</Button>
        {productInfo && (
          <div>
            <h2>Product Information:</h2>
            <pre className="product-info">
              {JSON.stringify(productInfo, null, 2)}
            </pre>
          </div>
        )}
      </Space>
    </div>
  );
}

