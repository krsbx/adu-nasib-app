import { Flex, Stack } from '@chakra-ui/react';
import React from 'react';
import { Post } from '../../components/general';

const CreatePostPage = () => {
  return (
    <Flex width={'100%'} direction={'column'} alignItems={'center'} p={5} gap={5}>
      <Stack spacing={4}>
        <Post.PostField />
      </Stack>
    </Flex>
  );
};

export default CreatePostPage;
