import React from 'react';
import Page from '../components/layout/Page';
import { Col, Row } from 'antd';
import Add from '../features/articles/add/Add';

const AddArticle = (): JSX.Element => {
  return (
    <Page>
      <h1>Add article</h1>
      <Row>
        <Col span={16} offset={4}>
          <Add />
        </Col>
      </Row>
    </Page>
  );
};

export default AddArticle;
