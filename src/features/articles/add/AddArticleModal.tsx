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
import { ArticleInput } from '../../../types/article';
import ImageUpload from './ImageUpload';
import AddArticleDetailsForm from './AddArticleDetailsForm';
import { useForm } from 'antd/es/form/Form';
import { getBase64 } from '../../../utils/base64';

const steps = [
  {
    title: 'Articles info',
  },
  {
    title: 'Upload images',
  },
];

interface ArticlePayload {
  title: string;
  description?: string;
  images?: UploadFile[];
}

const AddArticleModal = () => {
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(isAddArticleModalOpened);

  const [current, setCurrent] = useState<number>(0);
  const [article, setArticle] = useState<ArticlePayload>();
  const [images, setImages] = useState<UploadFile[]>([]);

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleAddArticle = () => {
    const formData = new FormData();

    if (article && article.title) {
      formData.append('title', article.title);
    }

    if (article && article.description) {
      formData.append('description', article.description);
    }
  
    if (article && article.images) {
      article.images.forEach((file) => {
        formData.append('images', file.originFileObj as RcFile);
      });
    }

    console.log('formData', formData.get('images'));
    console.log('formData', formData.get('title'));
    console.log('formData', formData.get('description'));

    dispatch(createNewArticle(formData));
  };

  return (
    <Modal
      title="Add new article"
      open={isModalOpen}
      onCancel={() => dispatch(showAddArticleModal(false))}
      footer={
        <React.Fragment>
          {current === 0 && (
            <React.Fragment>
              <Button
                danger
                onClick={() => dispatch(showAddArticleModal(false))}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  form.validateFields().then((data) => {
                    setArticle(data);
                    next();
                  });
                }}
              >
                Next
              </Button>
            </React.Fragment>
          )}
          {current > 0 && (
            <React.Fragment>
              <Button type="text" onClick={prev}>
                Back
              </Button>
              <Button onClick={handleAddArticle} type="primary">
                Complete
              </Button>
            </React.Fragment>
          )}
        </React.Fragment>
      }
    >
      <Steps current={current} items={items} />
      <div style={{ marginTop: 24 }}>
        {current === 0 && <AddArticleDetailsForm form={form} />}
        {current === 1 && <ImageUpload setImages={setImages} images={images} />}
      </div>
    </Modal>
  );
};

export default AddArticleModal;
