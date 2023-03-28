import React from 'react';
import { Avatar, Dropdown, Layout, Space } from 'antd';
import {
  DownOutlined,
  PullRequestOutlined,
  MessageOutlined,
  UserOutlined,
  PlusCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './Navbar.less';
import { useAppDispatch } from '../../app/hooks';
import { showLoginModal } from '../../features/auth/authSlice';
import LoginModal from '../../features/auth/login/Login';
import RegisterModal from '../../features/auth/register/Register';
import swop from '../../assets/logo/swop_dark.png';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const Navbar = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <Header
      className="x-navbar"
      style={{
        textAlign: 'center',
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex: 100,
      }}
    >
      <div className="x-navbar-content">
        <Link to={'/'} className="x-logo">
          <img src={swop} alt="swop" height={60} />
        </Link>
        <div className="x-menu">
          {true && (
            <div>
              <Avatar
                style={{
                  backgroundColor: 'darkgreen',
                  verticalAlign: 'middle',
                  cursor: 'pointer',
                  marginRight: '8px',
                }}
                size="large"
              >
                MS
              </Avatar>

              <Dropdown
                placement="bottomLeft"
                menu={{
                  items: [
                    {
                      key: '0',
                      label: 'Add article',
                      icon: <PlusCircleOutlined />,
                    },
                    {
                      key: '1',
                      label: 'My offers',
                      icon: <MessageOutlined />,
                    },
                    {
                      key: '2',
                      label: 'Trade requests',
                      icon: <PullRequestOutlined />,
                    },
                    {
                      key: '3',
                      label: 'My account',
                      icon: <UserOutlined />,
                    },
                    {
                      type: 'divider',
                    },
                    {
                      key: '4',
                      danger: true,
                      label: 'Sign out',
                      icon: <LogoutOutlined />,
                    },
                  ],
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space style={{ color: "white" }}>
                    <span>Mileta Stanisic</span>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          )}
          {false && (
            <span
              className="x-login"
              onClick={() => dispatch(showLoginModal(true))}
            >
              Sign in
            </span>
          )}
        </div>
      </div>
      <LoginModal />
      <RegisterModal />
    </Header>
  );
};

export default Navbar;
