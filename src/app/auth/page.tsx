'use client'
import React, { useEffect, useState } from 'react';
import Button from "antd/es/button";
import Form from "antd/es/form";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Input from "antd/es/input";
import Space from "antd/es/space";
import styles from './style.module.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { UserParams, UserRegisterParams, authenticateUser, fetchUserRole, registerNewUser } from '@/redux/thunk/user';
import { selectUserLoading, selectUserRoleType, selectUserToken } from '@/redux/selectors/user';
import { useRouter, useSearchParams } from 'next/navigation';
import { COOK, CUSTOMER } from '@/redux/types/user';
import { updateToast } from '@/redux/actions/app';
import Spin from 'antd/es/spin';
import { CDN_IMAGES } from '../helpers/constants';

const style = {
  backgroundImage: `url(${CDN_IMAGES.loginBg})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '100%'
}

enum LoginType {
  SIGN_IN = "sign_in",
  SIGN_UP = "sign_up"
}

const Auth: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loginType, setLoginType] = useState<LoginType>(LoginType.SIGN_IN);
  const userToken = useAppSelector(selectUserToken());
  const userRoleType = useAppSelector(selectUserRoleType());
  const isUserLoading = useAppSelector(selectUserLoading());

  useEffect(() => {
    if(searchParams.get('confirmed') !== 'true') return;

    dispatch(updateToast({ type: 'success', message: 'Email is confirmed!', open: true}))
  }, []);

  useEffect(() => {
    if(!userToken || userRoleType) return;

    dispatch(fetchUserRole());
  }, [userToken])

  useEffect(() => {
    if(!userToken || !userRoleType) return;

    if(userRoleType === COOK) {
      router.push("/cook/home");
    } else if(userRoleType === CUSTOMER) {
      router.push("/user/home");
    }
  }, [userToken, userRoleType]);

  const onFinish = (values: any) => {
    if(loginType === LoginType.SIGN_IN) {
      dispatch(authenticateUser(values as UserParams));
    } else {
      if(values.password !== values.confirmPassword) {
        dispatch(updateToast({ type: 'error', message: 'Password not matched!', open: true}))
        return;
      }

      const user: UserRegisterParams = {
        email: values.identifier,
        username: values.username,
        password: values.password,
        name: values.username
      }

      dispatch(registerNewUser(user as UserRegisterParams));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const toggleLoginType = (type: LoginType) => {
    setLoginType(type);
  }

  return (
    <Row className={styles.main}>
      {
        isUserLoading && (
          <div className={styles.spinCenter}>
            <Space align='center'>
              <Spin size="large" />
            </Space>
          </div>
        )
      }
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

              {
                loginType === LoginType.SIGN_UP && (
                  <Form.Item
                  label=""
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input type="text" size="large" placeholder='Username' />
                  </Form.Item>
                )
              }

              <Form.Item
                label=""
                name="identifier"
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
                  <Button type="primary" htmlType="submit" block size='large' disabled={isUserLoading}>
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