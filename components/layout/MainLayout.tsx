import { Box } from '@chakra-ui/react';
import React from 'react';
import Topbar from './Topbar';

const MainLayout = ({ children }: Props) => {
  return (
    <Box height={'100vh'} width={'100vw'} p={3} overflow={'hidden'}>
      <Topbar />
      <Box height={`calc(100vh - 50.5px)`} overflowY={'auto'}>
        {children}
      </Box>
    </Box>
  );
};

type Props = {
  children: React.ReactNode;
};

export default MainLayout;
