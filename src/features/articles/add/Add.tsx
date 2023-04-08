import React, { useState } from 'react';
import { Button, Form, Input, Upload, UploadFile, message } from 'antd';
import { useAppDispatch } from '../../../app/hooks';
import { UploadOutlined } from '@ant-design/icons';
import { createNewArticle } from '../articlesSlice';
import { ArticleInput } from '../../../types/article';
import { RcFile, UploadChangeParam } from 'antd/es/upload';

const { TextArea } = Input;

const Add = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<RcFile | null>(null);

  const handleImageUpload = async (file: RcFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageFile(file);
    };
  };

  const onFinish = (values: { title: string }) => {
    if (!imageFile) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = () => {
      console.log('fileeeee', { name: values.title, image: reader.result as string });
    };
  };

  const beforeUpload = (file: RcFile) => {
    handleImageUpload(file);
    return false; // spriječava slanje zahtjeva za upload na server
  };

  return (
    <Form
      form={form}
      name="x-register"
      layout="vertical"
      // onFinish={(data: ArticleInput) =>
      //   dispatch(
      //     createNewArticle({
      //       title: data.title,
      //       description: data.description,
      //     })
      //   )
      // }
      onFinish={onFinish}
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

      <Form.Item name="image" label="Image" rules={[{ required: true }]}>
        <Upload
          listType="picture"
          onChange={(info: UploadChangeParam<UploadFile<any>>) =>
            handleImageUpload(info.file as RcFile)
          }
          beforeUpload={beforeUpload}
          showUploadList={true}
          fileList={imageFile ? [imageFile] : []}
        >
          <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>
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
