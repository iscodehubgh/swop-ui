import React from 'react';
import { Card } from 'antd';
import {
  EllipsisOutlined,
  SendOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import CardImagePreviewer from './CardImagePreviewer';
import { useNavigate } from 'react-router-dom';
import { Article } from '../../../types/article';

const { Meta } = Card;

interface Props {
  article: Article;
}

const ArticleCard = ({ article }: Props) => {
  const navigate = useNavigate();
  return (
    <Card
      loading={false}
      hoverable
      style={{ width: '100%', marginBottom: '24px' }}
      cover={<CardImagePreviewer />}
      actions={[
        <EllipsisOutlined title="More actions" key="ellipsis" />,
        <SendOutlined
          title="Send swop request"
          onClick={() => navigate(`/swop/draft/${article.id}}`)}
          key="request"
        />,
        <ShareAltOutlined title="Share" key="share" />,
      ]}
    >
      <Meta title={article.title} description={article.description} />
    </Card>
  );
};

export default ArticleCard;
