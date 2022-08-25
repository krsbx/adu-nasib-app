import { Flex, Stack } from '@chakra-ui/react';
import React from 'react';

const Wrapper = ({ children }: Props) => {
  return (
    <Flex width={'100%'} direction={'column'} alignItems={'center'} p={3}>
      <Stack spacing={4}>{children}</Stack>
    </Flex>
  );
};

type Props = {
  children: React.ReactNode;
};

export default Wrapper;
