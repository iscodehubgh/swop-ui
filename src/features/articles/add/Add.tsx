import { Button, Form, Input } from 'antd';
import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { createNewArticle } from '../articlesSlice';
import { ArticleInput } from '../../../types/article';

const { TextArea } = Input;

const Add = (): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <Form
      name="x-register"
      layout="vertical"
      onFinish={(data: ArticleInput) =>
        dispatch(
          createNewArticle({
            title: data.title,
            description: data.description,
          })
        )
      }
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            type: 'string',
            message: 'Please enter article title.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: false,
            type: 'string',
            message: 'Please enter description.',
          },
        ]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Create article
        </Button>
      </Form.Item>
      <Form.Item>
        <Button danger htmlType="button" block>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Add;
