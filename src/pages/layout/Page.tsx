import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
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
      <Content style={{ padding: '0 50px' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center', position: 'fixed', bottom: '0', width: '100%' }}>
        XChange ©2023 Created by XChange AB
      </Footer>
    </Layout>
  );
};

export default Page;
