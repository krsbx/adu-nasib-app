import { Box, Flex, Stack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Post } from '../components/general';
import FieldPlaceholder from '../components/general/placeholder/FieldPlaceholder';
import { PLACEHOLDER } from '../utils/constant';

const Posts = dynamic(import('./posts/index'), { ssr: false });

const HomePage = () => {
  const [hasFocused, setHasFocused] = useState(false);

  return (
    <Box>
      <Flex width={'100%'} direction={'column'} alignItems={'center'} p={5} gap={5}>
        <Stack spacing={4}>
          {hasFocused ? (
            <Post.PostField />
          ) : (
            <FieldPlaceholder onClick={() => setHasFocused(true)} placeholder={PLACEHOLDER.POST} />
          )}
        </Stack>
      </Flex>
      <Posts />
    </Box>
  );
};

export default HomePage;
