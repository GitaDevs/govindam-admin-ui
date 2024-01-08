'use client'
import { useAppDispatch } from "@/redux/hooks";
import { selectUserInfo, selectUserRoleType } from "@/redux/selectors/user";
import { fetchUserRole } from "@/redux/thunk/user";
import { Avatar, Button, Col, Form, Input, Row } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const UserProfile:React.FC = () => {
  const dispatch = useAppDispatch();
  const userInfo = useSelector(selectUserInfo());
  const userRole = useSelector(selectUserRoleType());

  useEffect(() => {
    dispatch(fetchUserRole());
  }, []);

  return (
    <div style={{ marginTop: '50px'}}>
      <Row className="marginBottom20">
        <Col md={24} sm={24} className="centerAlign">
          <Avatar size={50} style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
        </Col>
      </Row>

      <Row className="marginTop20">
        <Form
          layout="vertical"
          initialValues={{username: userInfo?.username || "", email: userInfo?.email || "", address: userInfo?.address || "", phone_number: userInfo?.phone_number || "", role: userRole || ""}}
          style={{ width: '30em' }}
          disabled={true}
        >
          <Col md={24}>
            <Form.Item
              name={'username'}
              rules={[{ required: true, message: 'Missing username' }]}
              label="Username"
            >
              <Input size="large" value={userInfo?.username}/>
            </Form.Item>              
          </Col>

          <Col md={24}>
            <Form.Item
              name={'email'}
              rules={[{ required: true, message: 'Missing email' }]}
              label="Email"
            >
              <Input size="large"/>
            </Form.Item>
          </Col>

          <Col md={24}>
            <Form.Item
              name={'address'}
              rules={[{ required: false }]}
              label="Address"
            >
              <Input size="large"/>
            </Form.Item>
          </Col>

          <Col md={24}>
            <Form.Item
              name={'phone_number'}
              rules={[{ required: false }]}
              label="Phone Number"
            >
              <Input size="large"/>
            </Form.Item>
          </Col>

          <Col md={24}>
            <Form.Item
              name={'role'}
              label="Role"
            >
              <Input size="large"/>
            </Form.Item>
          </Col>

          <Col md={12} className="marginTop20">
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                Update Profile
              </Button>
            </Form.Item>
          </Col>
        </Form>
      </Row>
    </div>
  )
}

export default UserProfile;