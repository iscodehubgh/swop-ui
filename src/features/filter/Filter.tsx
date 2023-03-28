import React from 'react';
import { Col, DatePicker, Input, Row, Select } from 'antd';

const { Search } = Input;
const { RangePicker } = DatePicker;

const Filter = (): JSX.Element => {
  return (
    <Row gutter={8}>
      <Col span={8}>
        <Search placeholder="Search articles..." style={{ width: '100%' }} />
      </Col>
      <Col span={8}>
        <RangePicker
          placeholder={['Added from date', 'Added to date']}
          style={{ width: '100%' }}
        />
      </Col>
      <Col span={8}>
        <Select
          placeholder="Sort by"
          options={[
            {
              label: 'Newest first',
              key: 'newest',
            },
            {
              label: 'Oldest first',
              key: 'oldest',
            },
          ]}
          style={{ width: '100%' }}
        />
      </Col>
    </Row>
  );
};

export default Filter;
