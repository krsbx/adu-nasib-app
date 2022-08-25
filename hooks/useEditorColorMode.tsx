import { useColorModeValue } from '@chakra-ui/react';

const useEditorColorMode = () => {
  const backgroundFilled = useColorModeValue('gray.100', 'whiteAlpha.100');
  const hoverFilled = useColorModeValue('whiteAlpha.700', 'whiteAlpha.200');

  return {
    backgroundFilled,
    hoverFilled,
  };
};

export default useEditorColorMode;
