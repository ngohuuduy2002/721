
import React from 'react';
import { Form, Input, Button, Upload, Row, Col, Select, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const StoreProfile: React.FC = () => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{ remember: true }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="storeImage"
            label="Store's image"
            valuePropName="fileList"
            getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
          >
            <Upload listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="storeName"
            label="Store's name"
            rules={[{ required: true, message: "Please enter the store's name" }]}
          >
            <Input placeholder="Store name" />
          </Form.Item>
          <Form.Item
            name="storePhoneNumber"
            label="Store's phone number"
            rules={[{ required: true, message: "Please enter the store's phone number" }]}
          >
            <Input placeholder="Store phone number" />
          </Form.Item>
          <Form.Item
            name="storeAddress"
            label="Store's address"
            rules={[{ required: true, message: "Please enter the store's address" }]}
          >
            <Space.Compact>
              <Select placeholder="Thành phố" style={{ width: '30%' }}>
                <Option value="city1">City 1</Option>
                <Option value="city2">City 2</Option>
              </Select>
              <Select placeholder="Quận / Huyện" style={{ width: '30%' }}>
                <Option value="district1">District 1</Option>
                <Option value="district2">District 2</Option>
              </Select>
              <Select placeholder="Phường / Xã" style={{ width: '40%' }}>
                <Option value="ward1">Ward 1</Option>
                <Option value="ward2">Ward 2</Option>
              </Select>
            </Space.Compact>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="customerImage"
            label="Customer's image"
            valuePropName="fileList"
            getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
          >
            <Upload listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="customerName"
            label="Customer's name"
            rules={[{ required: true, message: "Please enter the customer's name" }]}
          >
            <Input placeholder="Customer name" />
          </Form.Item>
          <Form.Item
            name="customerPhoneNumber"
            label="Customer's phone number"
            rules={[{ required: true, message: "Please enter the customer's phone number" }]}
          >
            <Input placeholder="Customer phone number" />
          </Form.Item>
          <Form.Item
            name="customerZaloID"
            label="Customer's Zalo ID"
            rules={[{ required: true, message: "Please enter the customer's Zalo ID" }]}
          >
            <Input placeholder="Zalo ID" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginTop: '16px' }}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StoreProfile;
