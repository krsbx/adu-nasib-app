import React from 'react';
import { Post, Wrapper } from '../../components/general';

const CreatePostPage = () => {
  return (
    <Wrapper
      stackProps={{
        width: { base: '100%', sm: 'auto' },
      }}
    >
      <Post.PostField />
    </Wrapper>
  );
};

export default CreatePostPage;
