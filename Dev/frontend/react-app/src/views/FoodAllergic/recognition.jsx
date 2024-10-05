import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useZxing } from "react-zxing";
import { message, Input, Space, Alert, Spin, Button, Row, Col, Typography, Card, List, Tag, Upload } from 'antd';
import { ScanOutlined, StopOutlined, SwapOutlined, SearchOutlined, InfoCircleOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import Quagga from 'quagga'; // 需要安装 quagga 库：npm install quagga
import './Food.less';

const { Title, Text, Paragraph } = Typography;

export default function AllergenRecognition() {
  const [barcode, setBarcode] = useState('');
  const [productInfo, setProductInfo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [scanningError, setScanningError] = useState(false);
  const [mirrorMode, setMirrorMode] = useState(true);
  const [longScanningWarning, setLongScanningWarning] = useState(false);
  const scanningTimer = useRef(null);
  const [allergens, setAllergens] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleResult = useCallback((result) => {
    console.log("Barcode detected:", result.getText());
    setBarcode(result.getText());
    fetchProductInfo(result.getText());
    setScanning(false);
    clearTimeout(scanningTimer.current);
    setLongScanningWarning(false);
  }, []);

  const { ref, torch } = useZxing({
    onDecodeResult: handleResult,
    onError(error) {
      console.error("Scanning error:", error);
      setScanningError(true);
      message.warning('Unable to detect barcode. Please adjust the barcode position.');
    },
    paused: !scanning,
  });

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iPad|iPhone|iPod/i.test(userAgent)) {
      setIsMobile(true);
    }
    console.log("Component mounted, scanning:", scanning);
  }, []);

  useEffect(() => {
    if (scanning) {
      scanningTimer.current = setTimeout(() => {
        setLongScanningWarning(true);
      }, 10000); // 10 seconds
    } else {
      clearTimeout(scanningTimer.current);
      setLongScanningWarning(false);
    }

    return () => clearTimeout(scanningTimer.current);
  }, [scanning]);

  const fetchProductInfo = async (code) => {
    console.log("Fetching product info for barcode:", code);
    try {
      const response = await axios.get(`https://world.openfoodfacts.org/api/v3/product/${code}.json`);
      setProductInfo(response.data);
      
      // 提取过敏原信息
      const allergensData = response.data.product.allergens_tags || [];
      const formattedAllergens = allergensData.map(allergen => 
        allergen.replace('en:', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      );
      setAllergens(formattedAllergens);

      message.success('Product information fetched successfully!');
    } catch (error) {
      console.error('Error fetching product info:', error);
      message.error('Failed to fetch product information. Please try again.');
    }
  };

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
    setLongScanningWarning(false);
    if (!scanning) {
      setBarcode('');
      setProductInfo(null);
    }
  };

  const toggleMirrorMode = () => {
    setMirrorMode(!mirrorMode);
  };

  const handleImageUpload = (info) => {
    if (info.file.status === 'done') {
      setUploadedImage(info.file.originFileObj);
      message.success(`${info.file.name} file uploaded successfully`);
      processUploadedImage(info.file.originFileObj);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const processUploadedImage = (imageFile) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      Quagga.decodeSingle({
        decoder: {
          readers: ["ean_reader", "ean_8_reader", "code_128_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader"]
        },
        locate: true,
        src: e.target.result
      }, function(result) {
        if(result && result.codeResult) {
          console.log("Barcode detected from uploaded image:", result.codeResult.code);
          setBarcode(result.codeResult.code);
          fetchProductInfo(result.codeResult.code);
        } else {
          message.error("Unable to detect barcode from the uploaded image. Please try another image or enter the barcode manually.");
        }
      });
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="allergen-recognition">
      <Title level={2} className="title">Allergen Recognition</Title>
      <Paragraph>Scan, upload an image of a barcode, or enter a barcode to get product information</Paragraph>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="video-container">
          <video ref={ref} className={`video-element ${mirrorMode ? 'mirror-mode' : ''}`} playsInline />
          {scanning && <div className="scan-line"></div>}
        </div>
        {scanningError && (
          <Alert message="Unable to detect barcode. Please ensure the barcode is visible and well-lit." type="warning" showIcon />
        )}
        {longScanningWarning && (
          <Alert 
            message="We're having trouble scanning the barcode. Consider switching to a different device or manually entering the barcode." 
            type="info" 
            showIcon 
          />
        )}
        <Row gutter={[16, 16]} justify="center">
          <Col>
            <Button 
              type={scanning ? "primary" : "default"} 
              icon={scanning ? <StopOutlined /> : <ScanOutlined />} 
              onClick={toggleScanning}
            >
              {scanning ? 'Stop Scanning' : 'Start Scanning'}
            </Button>
          </Col>
          <Col>
            <Button 
              icon={<SwapOutlined />} 
              onClick={toggleMirrorMode}
            >
              {mirrorMode ? 'Disable Mirror' : 'Enable Mirror'}
            </Button>
          </Col>
          <Col>
            <Upload
              accept="image/*"
              showUploadList={false}
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok", file);
                }, 0);
              }}
              onChange={handleImageUpload}
            >
              <Button icon={<UploadOutlined />}>Upload Barcode Image</Button>
            </Upload>
          </Col>
        </Row>
        <Row gutter={[16, 16]} justify="center" className="input-group">
          <Col xs={24} sm={16}>
            <Input
              placeholder="Enter barcode manually"
              value={barcode}
              onChange={handleManualInput}
              className="manual-input"
            />
          </Col>
          <Col xs={24} sm={8}>
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSubmit} block>
              Submit
            </Button>
          </Col>
        </Row>
        {productInfo && (
          <>
            <Card title={<Title level={4}>Product Information</Title>} className="product-info-card">
              <List
                itemLayout="horizontal"
                dataSource={[
                  { label: "Product Name", value: productInfo.product.product_name },
                  { label: "Brand", value: productInfo.product.brands },
                  { 
                    label: "Allergens", 
                    value: allergens.length > 0 ? (
                      <Space wrap>
                        {allergens.map((allergen, index) => (
                          <Tag color="red" key={index}>{allergen}</Tag>
                        ))}
                      </Space>
                    ) : "No allergens information available"
                  },
                ]}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<InfoCircleOutlined />}
                      title={item.label}
                      description={item.value}
                    />
                  </List.Item>
                )}
              />
            </Card>
            <Alert
              message="Data Source Disclaimer"
              description={
                <span>
                  The information provided is sourced from <a href="https://world.openfoodfacts.org/" target="_blank" rel="noopener noreferrer">Open Food Facts</a> and may not be accurate. Please verify with the actual product information before making any decisions.
                </span>
              }
              type="warning"
              showIcon
            />
          </>
        )}
      </Space>
    </div>
  );
}

