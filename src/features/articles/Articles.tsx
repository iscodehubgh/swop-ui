import React, { useEffect, useState } from 'react';
import {
  EllipsisOutlined,
  SendOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import swop from '../../assets/logo/swop_dark.png';
import Filter from '../filter/Filter';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchArticles, articlesListFetched } from './articlesSlice';

const { Meta } = Card;

const Articles: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const articles = useAppSelector(articlesListFetched);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <div>
      <Filter />
      <Row style={{ marginTop: '2rem' }} gutter={24}>
        {articles.map((item, index) => (
          <Col span={6} key={index}>
            <Card
              loading={false}
              hoverable
              style={{ width: '100%', marginBottom: '24px' }}
              cover={<img alt="logo" src={swop} />}
              actions={[
                <EllipsisOutlined title="More actions" key="ellipsis" />,
                <SendOutlined
                  title="Send swop request"
                  onClick={() => navigate('/swop/draft/1')}
                  key="request"
                />,
                <ShareAltOutlined title="Share" key="share" />,
              ]}
            >
              <Meta
                title={item.title}
                description={item.description}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Articles;
