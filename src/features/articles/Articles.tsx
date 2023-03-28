import React from 'react';
import { Card, Col, Row } from 'antd';
import swop from '../../assets/logo/swop_dark.png';

const { Meta } = Card;

const Articles: React.FC = () => (
  <Row style={{ marginTop: '6rem' }}>
    {[0, 1, 2, 4, 5, 6, 7, 8, 9].map((item, index) => (
      <Col span={6} key={index}>
        <Card
          hoverable
          style={{ width: "90%", marginBottom: "24px" }}
          cover={<img alt="logo" src={swop} />}
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
      </Col>
    ))}
  </Row>
);

export default Articles;
