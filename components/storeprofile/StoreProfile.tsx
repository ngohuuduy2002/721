"use client";
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Row, Col, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import Select from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

interface StoreProfileFormValues {
  storeName: string;
  storePhoneNumber: string;
  storeAddress: string;
  city: string;
  district: string;
  ward: string;
  customerName: string;
  customerPhoneNumber: string;
  customerZaloID: string;
}

const StoreProfile: React.FC = () => {
  const [storeImage, setStoreImage] = useState<string | null>(null);
  const [customerImage, setCustomerImage] = useState<string | null>(null);

  const [cities, setCities] = useState<OptionType[]>([]);
  const [districts, setDistricts] = useState<OptionType[]>([]);
  const [wards, setWards] = useState<OptionType[]>([]);

  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<OptionType | null>(null);
  const [selectedWard, setSelectedWard] = useState<OptionType | null>(null);

  useEffect(() => {
    // Fetch cities
    axios.get('/api/cities')  // Update this to your correct endpoint
      .then((response) => {
        const citiesData: OptionType[] = response.data.map((city: any) => ({
          value: city.id,
          label: city.name,
        }));
        setCities(citiesData);
      })
      .catch((error) => {
        message.error('Failed to fetch cities');
        console.error('Error fetching cities:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCity) {
      // Fetch districts when city changes
      axios.get(`/api/districts?city=${selectedCity.value}`)  // Update this to your correct endpoint
        .then((response) => {
          const districtsData: OptionType[] = response.data.map((district: any) => ({
            value: district.id,
            label: district.name,
          }));
          setDistricts(districtsData);
          setWards([]);
          setSelectedDistrict(null);
          setSelectedWard(null);
        })
        .catch((error) => {
          message.error('Failed to fetch districts');
          console.error('Error fetching districts:', error);
        });
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      // Fetch wards when district changes
      axios.get(`/api/wards?district=${selectedDistrict.value}`)  // Update this to your correct endpoint
        .then((response) => {
          const wardsData: OptionType[] = response.data.map((ward: any) => ({
            value: ward.id,
            label: ward.name,
          }));
          setWards(wardsData);
          setSelectedWard(null);
        })
        .catch((error) => {
          message.error('Failed to fetch wards');
          console.error('Error fetching wards:', error);
        });
    }
  }, [selectedDistrict]);

  const handleImageUpload = (file: File, setImage: (image: string | null) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    return false; // Prevents antd from uploading the file automatically
  };

  const handleSubmit = (values: StoreProfileFormValues) => {
    console.log('Received values: ', values);
    // Add form submission logic here
  };

  return (
    <Form<StoreProfileFormValues> onFinish={handleSubmit} layout="vertical" className="store-profile-form">
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Store's image *">
            <Upload
              beforeUpload={(file) => handleImageUpload(file, setStoreImage)}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Store Image</Button>
            </Upload>
            {storeImage && <img src={storeImage} alt="Store" style={{ marginTop: 10, maxWidth: '100px' }} />}
          </Form.Item>
          <Form.Item label="Store's name *" name="storeName" rules={[{ required: true, message: 'Please input the store name!' }]}>
            <Input placeholder="Store name" />
          </Form.Item>
          <Form.Item label="Store's phone number *" name="storePhoneNumber" rules={[{ required: true, message: 'Please input the store phone number!' }]}>
            <Input placeholder="Store phone number" />
          </Form.Item>
          <Form.Item label="Store's address *" name="storeAddress" rules={[{ required: true, message: 'Please input the store address!' }]}>
            <Input placeholder="Store address" />
          </Form.Item>
          <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please select a city!' }]}>
            <Select
              placeholder="Thành phố"
              options={cities}
              onChange={(option) => setSelectedCity(option as OptionType)}
              value={selectedCity}
            />
          </Form.Item>
          <Form.Item label="District" name="district" rules={[{ required: true, message: 'Please select a district!' }]}>
            <Select
              placeholder="Quận / Huyện"
              options={districts}
              onChange={(option) => setSelectedDistrict(option as OptionType)}
              value={selectedDistrict}
              isDisabled={!selectedCity}
            />
          </Form.Item>
          <Form.Item label="Ward" name="ward" rules={[{ required: true, message: 'Please select a ward!' }]}>
            <Select
              placeholder="Phường / Xã"
              options={wards}
              onChange={(option) => setSelectedWard(option as OptionType)}
              value={selectedWard}
              isDisabled={!selectedDistrict}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Customer's image">
            <Upload
              beforeUpload={(file) => handleImageUpload(file, setCustomerImage)}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Customer Image</Button>
            </Upload>
            {customerImage && <img src={customerImage} alt="Customer" style={{ marginTop: 10, maxWidth: '100px' }} />}
          </Form.Item>
          <Form.Item label="Customer's name *" name="customerName" rules={[{ required: true, message: 'Please input the customer name!' }]}>
            <Input placeholder="Customer name" />
          </Form.Item>
          <Form.Item label="Customer's phone number *" name="customerPhoneNumber" rules={[{ required: true, message: 'Please input the customer phone number!' }]}>
            <Input placeholder="Customer phone number" />
          </Form.Item>
          <Form.Item label="Customer's Zalo ID *" name="customerZaloID" rules={[{ required: true, message: 'Please input the customer Zalo ID!' }]}>
            <Input placeholder="Customer Zalo ID" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StoreProfile;
