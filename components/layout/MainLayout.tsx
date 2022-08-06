import { Box } from '@chakra-ui/react';
import React from 'react';
import Topbar from './Topbar';

const MainLayout = ({ children }: Props) => {
  return (
    <Box height={'100vh'} width={'100vw'} p={3}>
      <Topbar />
      {children}
    </Box>
  );
};

type Props = {
  children: React.ReactNode;
};

export default MainLayout;
