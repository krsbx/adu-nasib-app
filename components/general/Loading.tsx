import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

const Loading = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <Flex justifyContent={'center'}>
      <Spinner color="gray.500" size={'lg'} ref={ref} />
    </Flex>
  );
});

Loading.displayName = 'Loading';

export default Loading;
