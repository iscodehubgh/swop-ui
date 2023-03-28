import React from 'react';
import { Card, Col, Divider, Row } from 'antd';
import swop from '../../assets/logo/swop_dark.png';

const { Meta } = Card;

const SwopRequestForm = (): JSX.Element => {
  return (
    <Row>
      <Col span={12}>
        <div>
          <h3>Requested items</h3>
          <div>
            <Card
              style={{ width: '200px', marginBottom: '24px' }}
              cover={<img alt="logo" src={swop} />}
            >
              <Meta
                title={`Item 1`}
                description="PlayStation PS5 Console - God of War Ragnarök Bundle"
              />
            </Card>
          </div>
          <Divider />
          <div>
            <h3>More items from @pa_lemii</h3>
          </div>
          <Row>
            {[0, 1, 2].map((item, index) => (
              <Col key={index} span={8}>
                <Card
                  style={{ width: '200px', marginBottom: '24px' }}
                  cover={<img alt="logo" src={swop} />}
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
      </Col>
      <Col span={12}>
        <div>
          <h3>My items</h3>
          <Row>
            {[0, 1, 2].map((item, index) => (
              <Col key={index} span={8}>
                <Card
                  style={{ width: '200px', marginBottom: '24px' }}
                  cover={<img alt="logo" src={swop} />}
                >
                  <Meta
                    title={`My Item ${item}`}
                    description="PlayStation PS5 Console - God of War Ragnarök Bundle"
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default SwopRequestForm;
