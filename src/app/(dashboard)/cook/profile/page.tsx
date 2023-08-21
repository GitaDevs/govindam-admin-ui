'use client'
import { Avatar, Button, Col, Form, Input, Row, Select } from "antd";

const UserProfile:React.FC = () => {
  return (
    <div style={{ marginTop: '50px'}}>
      <Row className="marginBottom20">
        <Col md={24} sm={24} className="centerAlign">
          <Avatar size={50} style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
        </Col>
      </Row>

      <Row className="marginTop20">
        <Col md={24}>
          <Form name="form_item_path" layout="vertical">
            <Form.Item
              name={'first'}
              rules={[{ required: true, message: 'Missing first name' }]}
              label="First Name"
            >
              <Input size="large"/>
            </Form.Item>
          </Form>
        </Col>

        <Col md={24}>
          <Form name="form_item_path" layout="vertical">
            <Form.Item
              name={'last'}
              rules={[{ required: true, message: 'Missing last name' }]}
              label="Last Name"
            >
              <Input size="large"/>
            </Form.Item>
          </Form>
        </Col>

        <Col md={24}>
          <Form name="form_item_path" layout="vertical">
            <Form.Item
              name={'age'}
              rules={[{ required: false, message: 'Missing Age' }]}
              label="Age"
            >
              <Input type="number" size="large"/>
            </Form.Item>
          </Form>
        </Col>

        <Col md={24}>
          <Form name="form_item_path" layout="vertical">
            <Form.Item
              name={'gender'}
              rules={[{ required: true, message: 'Missing Gender' }]}
              label="Gender"
            >
              <Select
                style={{ width: "100%" }}
                size="large"
                options={[
                  {value: "male", label: "Male"},
                  {value: "female", label: "Female"},
                ]}
              />
            </Form.Item>
          </Form>
        </Col>

        <Col md={12} className="marginTop20">
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Update Profile
            </Button>
          </Form.Item>        
        </Col>
      </Row>
    </div>
  )
}

export default UserProfile;