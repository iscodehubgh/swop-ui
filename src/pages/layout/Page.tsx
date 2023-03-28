import React from 'react';
import { Layout, theme } from 'antd';
import Navbar from '../../components/Header/Navbar';

const { Footer, Content } = Layout;

interface Props {
  children: React.ReactNode;
}

const Page = ({ children }: Props): JSX.Element => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Navbar />
      <Content
        style={{
          padding: '6rem 6rem',
          background: colorBgContainer,
        }}
      >
        {children}
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          position: 'sticky',
          bottom: '0',
          width: '100%',
        }}
      >
        SWOP ©2023 Created by CodeHub.IS
      </Footer>
    </Layout>
  );
};

export default Page;
