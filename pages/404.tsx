import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const NotFound = () => {
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
      <Text fontWeight={'bold'} fontSize={'20px'}>
        Sepertinya halaman yang diakses tidak ditemukan
      </Text>
    </Flex>
  );
};

export default NotFound;
