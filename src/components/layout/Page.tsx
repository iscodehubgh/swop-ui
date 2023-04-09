import React from 'react';
import { Layout, Menu, MenuProps, theme } from 'antd';
import Navbar from '../Header/Navbar';
import {
  PullRequestOutlined,
  MessageOutlined,
  PlusCircleOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import swop from '../../assets/logo/swop_dark.png';
import { authLoginIsLogged } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { showAddArticleModal } from '../../features/articles/articlesSlice';
import AddArticleModal from '../../features/articles/add/AddArticleModal';

const { Content, Sider } = Layout;

interface Props {
  children: React.ReactNode;
}

type MenuItem = Required<MenuProps>['items'][number];

const Page = ({ children }: Props): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector(authLoginIsLogged);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    onClick?: () => void
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      onClick,
    } as MenuItem;
  };

  const items: MenuItem[] = [
    getItem('Articles', '1', <OrderedListOutlined />, undefined, () =>
      navigate('/')
    ),
    getItem('Add article', '2', <PlusCircleOutlined />, undefined, () => {
      console.log('fired')
      dispatch(showAddArticleModal(true));
    }),
    getItem('My offers', '3', <MessageOutlined />, undefined, () =>
      navigate('/offers/my')
    ),
    getItem('Swop requests', '4', <PullRequestOutlined />, undefined, () =>
      navigate('/swop/requests')
    ),
  ];

  return (
    <Layout className="layout" hasSider>
      {isLogged && (
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div
            style={{
              height: 60,
              margin: '16px 16px 16px 16px',
              paddingLeft: '16px',
            }}
          >
            <Link to={'/'} className="x-logo">
              <img src={swop} alt="swop" height={60} />
            </Link>
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
          />
        </Sider>
      )}
      <Layout
        className="site-layout"
        style={{ marginLeft: isLogged ? 200 : 0 }}
      >
        <Navbar />
        <Content
          style={{
            padding: '2rem 6rem',
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>

      <AddArticleModal />
    </Layout>
  );
};

export default Page;
