'use client'
import React, { useState } from 'react';
import { Button, Form, Input, Row, Col, Space } from 'antd';
import styles from './style.module.css';
import bgV from '../../../public/bg_vertical.jpg';

const style = {
  backgroundImage: `url('${bgV.src}')`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '100%'
}

enum LoginType {
  SIGN_IN = "sign_in",
  SIGN_UP = "sign_up"
}

const Auth: React.FC = (props) => {
  const [loginType, setLoginType] = useState<LoginType>(LoginType.SIGN_IN);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const toggleLoginType = (type: LoginType) => {
    setLoginType(type);
  }

  return (
    <Row className={styles.main}>
      <Col md={11} style={style}>
      </Col>

      <Col md={13} xs={24}>
        <Row>
          <Col xs={24} md={24} className={styles.appHeading}>
            <h1>
              Govindam Prasadam
            </h1>
          </Col>

          <Col md={24} xs={24}>
            <Form
              className={styles.loginForm}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                label=""
                name="email"
                rules={[{ required: true, message: 'Please input your emailId!' }]}
              >
                <Input type='email' size='large' placeholder='Email'/>
              </Form.Item>

              <Form.Item
                label=""
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password type="password" size="large" placeholder='Password' />
              </Form.Item>

              {
                loginType === LoginType.SIGN_UP && (
                  <Form.Item
                  label=""
                  name="confirmPassword"
                  rules={[{ required: true, message: 'Please input your confirm password!' }]}
                  >
                    <Input.Password type="password" size="large" placeholder='Confirm Password' />
                  </Form.Item>                  
                )
              }

              <div style={{marginBottom: '10px', textAlign: 'end'}}>
                {
                  loginType === LoginType.SIGN_IN ? 
                  <a href="#" onClick={e => toggleLoginType(LoginType.SIGN_UP)}>New here? Create Account</a>
                  : <a href="#" onClick={e => toggleLoginType(LoginType.SIGN_IN)}>Already have an Account? Sign In</a>
                }
              </div>

              <Form.Item>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button type="primary" htmlType="submit" block size='large'>
                    {loginType === LoginType.SIGN_IN ? 'Sign In' : 'Sign Up'}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>      
    </Row>
  );
}

export default Auth;