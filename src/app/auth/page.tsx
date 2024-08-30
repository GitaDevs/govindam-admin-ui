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
import { IUpdatePassword, UserParams, UserRegisterParams, authenticateUser, fetchUserRole, getUserActiveSubscription, registerNewUser, resetPassword, updatePassword } from '@/redux/thunk/user';
import { selectUserLoading, selectUserRoleType, selectUserToken } from '@/redux/selectors/user';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { COOK, CUSTOMER } from '@/redux/types/user';
import { updateToast } from '@/redux/actions/app';
import Spin from 'antd/es/spin';
import { CDN_IMAGES } from '../helpers/constants';
import { userLoading } from '@/redux/actions/user';

const style = {
  backgroundImage: `url(${CDN_IMAGES.loginBg})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '100%'
}

enum LoginType {
  SIGN_IN = "sign_in",
  SIGN_UP = "sign_up",
  RESET_PSWD = "reset_pswd",
  UPDATE_PSWD = "update_pswd",
}

const buttonText: {[key in LoginType]: string } = {
  [LoginType.SIGN_IN]: "Sign In",
  [LoginType.SIGN_UP]: "Sign Up",
  [LoginType.RESET_PSWD]: "Reset Password",
  [LoginType.UPDATE_PSWD]: "Update Password",
};

const Auth: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loginType, setLoginType] = useState<LoginType>(LoginType.SIGN_IN);
  const userRoleType = useAppSelector(selectUserRoleType());
  const isUserLoading = useAppSelector(selectUserLoading());
  const userToken = useAppSelector(selectUserToken());

  useEffect(() => {
    dispatch(userLoading({ loading : false }));
    if(searchParams.get('code')) {
      setLoginType(LoginType.UPDATE_PSWD);
    }

    if(searchParams.get('confirmed') !== 'true') return;
    dispatch(updateToast({ type: 'success', message: 'Email is confirmed!', open: true}))
  }, []);

  useEffect(() => {
    if(!userToken || userRoleType) return;

    dispatch(fetchUserRole());
  }, [userToken]);

  useEffect(() => {
    if(!userToken || !userRoleType) return;

    if(userRoleType === COOK) {
      router.push("/cook/home");
    } else if(userRoleType === CUSTOMER) {
      dispatch(getUserActiveSubscription());
      router.push("/user/home");
    }
  }, [userToken, userRoleType]);

  const onFinish = (values: any) => {
    if(loginType === LoginType.SIGN_IN) {
      dispatch(authenticateUser(values as UserParams));
    } else if(loginType === LoginType.SIGN_UP) {
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
    } else if (loginType === LoginType.RESET_PSWD) {
      dispatch(resetPassword(values.identifier))
    } else if(loginType === LoginType.UPDATE_PSWD) {
      const body: IUpdatePassword = {
        code: searchParams.get('code') || '',
        password: values.password,
        passwordConfirmation: values.confirmPassword
      };

      dispatch(updatePassword(body));
      redirect("/auth")
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const toggleLoginType = (type: LoginType) => {
    setLoginType(type);
  }

  const authActionTypeRender = (loginType: LoginType) => {
    switch(loginType) {
      case LoginType.SIGN_IN:
        return <a href="#" onClick={e => toggleLoginType(LoginType.SIGN_UP)}>New here? Create Account</a>;
      
      case LoginType.SIGN_UP:
        return <a href="#" onClick={e => toggleLoginType(LoginType.SIGN_IN)}>Already have an Account? Sign In</a>;

      case LoginType.RESET_PSWD:
        return <a href="#" onClick={e => toggleLoginType(LoginType.RESET_PSWD)}>Forgot Password</a>;
    }
  }
  
  const updatePasswordRender = () => {
    return (
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
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password type="password" size="large" placeholder='Password' />
          </Form.Item>

          <Form.Item
            label=""
            name="confirmPassword"
            rules={[{ required: true, message: 'Please input your confirm password!' }]}
            >
            <Input.Password type="password" size="large" placeholder='Confirm Password' />
          </Form.Item>          

          <Form.Item>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button type="primary" htmlType="submit" block size='large' disabled={isUserLoading}>
                {buttonText[loginType]}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>      
    );
  }

  const authScreenRender = () => {
    return (
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

          {
            loginType !== LoginType.RESET_PSWD && (
              <Form.Item
                label=""
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password type="password" size="large" placeholder='Password' />
              </Form.Item>
            )
          }

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

          {
            loginType !== LoginType.RESET_PSWD && (
              <div style={{marginBottom: '10px', textAlign: 'end'}}>
                {authActionTypeRender(loginType)}
              </div>  
            )
          }

          <Form.Item>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button type="primary" htmlType="submit" block size='large' disabled={isUserLoading}>
                {buttonText[loginType]}
              </Button>
            </Space>
          </Form.Item>

          <div style={{marginTop: '30px', textAlign: 'end'}}>
            {
              loginType === LoginType.RESET_PSWD ?
              authActionTypeRender(LoginType.SIGN_IN) : 
              authActionTypeRender(LoginType.RESET_PSWD)                                    
            }
          </div>
        </Form>
      </Col>
    );
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

          {
            loginType === LoginType.UPDATE_PSWD ? updatePasswordRender() : authScreenRender()
          }
        </Row>
      </Col>      
    </Row>
  );
}

export default Auth;