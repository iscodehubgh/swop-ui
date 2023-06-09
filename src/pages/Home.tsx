import React from 'react';
import Page from '../components/layout/Page';
import Articles from '../features/articles/Articles';

const Home: React.FC = () => {
  return (
    <Page>
      <Articles />
    </Page>
  );
};

export default Home;
