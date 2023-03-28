import React, { useState } from 'react';
import {
  EllipsisOutlined,
  SendOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import swop from '../../assets/logo/swop_dark.png';
import Filter from '../filter/Filter';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const Articles: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  // testing
  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <div>
      <Filter />
      <Row style={{ marginTop: '2rem' }} gutter={24}>
        {[0, 1, 2, 4, 5, 6, 7, 8, 9].map((item, index) => (
          <Col span={6} key={index}>
            <Card
              loading={loading}
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
                title={`Item ${item}`}
                description="PlayStation PS5 Console - God of War Ragnarök Bundle"
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Articles;
