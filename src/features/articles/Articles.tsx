import React, { useEffect } from 'react';

import { Col, Empty, Row, Spin } from 'antd';
import Filter from '../filter/Filter';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchArticles,
  fetchedArticleList,
  fetchArticlesStatus,
} from './articlesSlice';
import ArticleCard from './view/ArticleCard';

const Articles: React.FC = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(fetchedArticleList);
  const status = useAppSelector(fetchArticlesStatus);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <div>
      <Filter />
      <Spin style={{ minHeight: '8rem' }} spinning={status === 'loading'}>
        <Row style={{ marginTop: '2rem' }} gutter={24}>
          {articles.length > 0 &&
            articles.map((item, index) => (
              <Col span={6} key={index}>
                <ArticleCard article={item} />
              </Col>
            ))}
          {articles.length === 0 && status !== 'loading' && (
            <Col span={12} offset={6}>
              <Empty description="No articles to show" />
            </Col>
          )}
        </Row>
      </Spin>
    </div>
  );
};

export default Articles;
