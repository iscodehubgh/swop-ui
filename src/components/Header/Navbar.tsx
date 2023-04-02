import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Layout, Space } from 'antd';
import { DownOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import './Navbar.less';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authLoginStatus, showLoginModal } from '../../features/auth/authSlice';
import LoginModal from '../../features/auth/login/Login';
import RegisterModal from '../../features/auth/register/Register';

const { Header } = Layout;

const Navbar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(authLoginStatus);

  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLogged(!!authToken);
  }, [status]);

  return (
    <Header
      className="x-navbar"
      style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}
    >
      <div className="x-navbar-content">
        <div />
        <div className="x-menu">
          {isLogged && (
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
                  <Space style={{ color: 'white' }}>
                    <span>Mileta Stanisic</span>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          )}
          {!isLogged && (
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
