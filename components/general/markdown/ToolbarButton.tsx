import { Button, ButtonProps, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const ToolbarButton = ({ children, ...props }: ButtonProps) => {
  const color = useColorModeValue('gray.500', 'gray.300');

  return (
    <Button size={'sm'} color={color} {...props}>
      {children}
    </Button>
  );
};

export default ToolbarButton;
