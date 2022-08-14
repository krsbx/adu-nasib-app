import { Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const SearchPage = () => {
  return (
    <Flex
      width={'100%'}
      height={'100%'}
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      p={5}
      gap={5}
    >
      <Stack spacing={4}>
        <Text fontWeight={'bold'} fontSize={'20px'}>
          Halaman ini masih dalam pengembangan
        </Text>
      </Stack>
    </Flex>
  );
};

export default SearchPage;
