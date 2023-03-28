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
import { LockOutlined, GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  authRegister,
  isRegisterModalOpen,
  showRegisterModal,
  authRegisterStatus,
} from '../authSlice';
import { Registration } from '../../../types/auth';

const RegisterModal = (): JSX.Element => {
  const isModalOpen = useAppSelector(isRegisterModalOpen);
  const status = useAppSelector(authRegisterStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'failed') {
      notification.error({
        placement: 'topRight',
        message: 'Registration failed',
        description: 'Something went wrong. Please try again.',
      });
    }
  }, [status]);

  return (
    <Modal
      title="Registration"
      open={isModalOpen}
      onCancel={() => dispatch(showRegisterModal(false))}
      footer={null}
    >
      <Row>
        <Col span={24}>
          <Form
            name="x-register"
            layout="vertical"
            onFinish={(data: Registration) =>
              dispatch(
                authRegister({
                  firstName: data.firstName,
                  lastName: data.lastName,
                  email: data.email,
                  password: data.password,
                  confirmPassword: data.confirmPassword,
                })
              )
            }
          >
            <Form.Item
              label="First name"
              name="firstName"
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please enter first name.',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last name"
              name="lastName"
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please enter last name.',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please enter valid email.',
                },
              ]}
            >
              <Input prefix={<MailOutlined />} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter password.' }]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
              label="Confirm password"
              name="confirmPassword"
              rules={[{ required: true, message: 'Please enter password.' }]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={status === 'loading'}
              >
                Register
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
                Register with Google
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default RegisterModal;
