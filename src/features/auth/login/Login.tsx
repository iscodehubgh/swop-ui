import React, { useEffect } from 'react';
import {
  Col,
  Modal,
  Row,
  Form,
  Input,
  Button,
  Divider,
  notification,
} from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  authLogin,
  showLoginModal,
  isLoginModalOpen,
  authLoginStatus,
  showRegisterModal,
} from '../authSlice';
import { Credentials } from '../../../types/auth';

const LoginModal = () => {
  const isModalOpen = useAppSelector(isLoginModalOpen);
  const status = useAppSelector(authLoginStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'failed') {
      notification.error({
        placement: 'topRight',
        message: 'Login failed',
        description: 'Username or password not correct. Please try again.',
      });
    }
  }, [status]);

  return (
    <Modal
      title="Login"
      open={isModalOpen}
      onCancel={() => dispatch(showLoginModal(false))}
      footer={null}
    >
      <Row>
        <Col span={24}>
          <Form
            name="x-login"
            layout="vertical"
            onFinish={(data: Credentials) =>
              dispatch(
                authLogin({ username: data.username, password: data.password })
              )
            }
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please enter valid email.',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter password.' }]}
              style={{ marginBottom: '4px' }}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item name="forgot_password">
              <a style={{ float: 'right' }}>Forgot password?</a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={status === 'loading'}
              >
                Login
              </Button>
            </Form.Item>
            <Divider plain>OR</Divider>
            <Form.Item>
              <Button
                icon={<GoogleOutlined />}
                type="default"
                htmlType="submit"
                block
              >
                Login with Google
              </Button>
            </Form.Item>
            <Form.Item name="register" style={{ marginBottom: '0px' }}>
              <div style={{ textAlign: 'center' }}>
                <span>New to XChange? </span>
                <a
                  onClick={() => {
                    dispatch(showLoginModal(false));
                    dispatch(showRegisterModal(true));
                  }}
                >
                  Register here
                </a>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default LoginModal;
