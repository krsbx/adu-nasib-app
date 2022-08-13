import { useColorModeValue } from '@chakra-ui/react';

const useFieldButtonColorMode = () => {
  const fieldButtonBgColor = useColorModeValue('gray.400', 'whiteAlpha.500');
  const fieldButtonTextColor = useColorModeValue('whiteAlpha.800', 'whiteAlpha.900');

  return {
    fieldButtonBgColor,
    fieldButtonTextColor,
  };
};

export default useFieldButtonColorMode;
