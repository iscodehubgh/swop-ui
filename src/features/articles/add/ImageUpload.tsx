import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { getBase64 } from '../../../utils/base64';

interface ImageUploadProps {
  images: UploadFile[];
  setImages: (images: UploadFile[]) => void;
}

const ImageUpload = ({ images, setImages }: ImageUploadProps): JSX.Element => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };

  const handleImageUpload = async (file: RcFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(file);
    };
  };

  const beforeUpload = (file: RcFile) => {
    handleImageUpload(file);
    return false; // spriječava slanje zahtjeva za upload na server
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setImages(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload

        beforeUpload={beforeUpload}
        listType="picture-card"
        fileList={images}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {images.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ImageUpload;
