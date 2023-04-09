import React from 'react';
import { Button, Form, FormInstance, Input } from 'antd';

const { TextArea } = Input;

interface AddArticleFormProps {
  form: FormInstance;
}

const AddArticleDetailsForm = ({ form }: AddArticleFormProps): JSX.Element => {
  return (
    <Form form={form} name="add-article" layout="vertical">
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
    </Form>
  );
};

export default AddArticleDetailsForm;
