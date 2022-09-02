import { Flex, Stack, StackProps } from '@chakra-ui/react';
import React from 'react';

const Wrapper = ({ children, stackProps }: Props) => {
  return (
    <Flex width={'100%'} direction={'column'} alignItems={'center'} p={3}>
      <Stack spacing={4} {...stackProps}>
        {children}
      </Stack>
    </Flex>
  );
};

type Props = {
  children: React.ReactNode;
  stackProps?: StackProps;
};

export default Wrapper;
