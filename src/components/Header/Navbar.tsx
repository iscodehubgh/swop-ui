import React from 'react';
import { Layout } from 'antd';
import './Navbar.less';

const { Header } = Layout;

const Navbar = (): JSX.Element => {
  const showLoginModal = (): void => {
    console.log('click')
  }

  return (
    <Header className='x-navbar'>
      <div className='x-navbar-content'>
        <span className='x-logo'>XChange</span>
        <div className='x-menu'>
          <span className='x-login'>Sign in</span>
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
