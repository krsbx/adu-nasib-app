import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

const ToolbarButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button variant={'outline'} size={'sm'} color={'gray.600'} {...props}>
      {children}
    </Button>
  );
};

export default ToolbarButton;
