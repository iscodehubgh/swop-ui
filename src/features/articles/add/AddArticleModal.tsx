import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Steps, Upload } from 'antd';
import {
  createArticleStatus,
  createNewArticle,
  isAddArticleModalOpened,
  showAddArticleModal,
} from '../articlesSlice';
import { UploadOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';

const { TextArea } = Input;

interface AddArticleProps {
  next: () => void;
}

const AddDetailsForm = ({ next }: AddArticleProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const addArticleStatus = useAppSelector(createArticleStatus);

  useEffect(() => {
    if (addArticleStatus === 'success') {
      next();
    }
  }, [addArticleStatus]);

  const onFinish = (values: { title: string; description?: string }) => {
    dispatch(
      createNewArticle({
        title: values.title,
        description: values.description,
      })
    );
  };
  return (
    <Form name="add-article" layout="vertical" onFinish={onFinish}>
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
        <Button danger htmlType="button" block>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

const UploadImagesForm = (): JSX.Element => {
  const [imageFile, setImageFile] = useState<RcFile | null>(null);

  const handleImageUpload = async (file: RcFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageFile(file);
    };
  };

  const beforeUpload = (file: RcFile) => {
    handleImageUpload(file);
    return false;
  };

  return (
    <div>
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
    </div>
  );
};

const steps = [
  {
    title: 'Articles info',
  },
  {
    title: 'Upload images',
  },
];

const AddArticleModal = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(isAddArticleModalOpened);

  const [current, setCurrent] = useState<number>(0);
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const next = () => {
    setCurrent(current + 1);
  };

  return (
    <Modal
      title="Add Article"
      open={isModalOpen}
      onCancel={() => dispatch(showAddArticleModal(false))}
      footer={null}
    >
      <Steps current={current} items={items} />

      <div style={{ marginTop: 24 }}>
        {current === 0 && <AddDetailsForm next={next} />}
        {current === 1 && <UploadImagesForm />}
      </div>
    </Modal>
  );
};

export default AddArticleModal;
