import { useColorModeValue } from '@chakra-ui/react';

const useCardColorMode = () => {
  const cardBgColor = useColorModeValue('gray.200', 'gray.700');
  const cardHoverBgColor = useColorModeValue('gray.200', 'blackAlpha.300');
  const cardTextColor = useColorModeValue('gray.500', 'gray.100');

  return {
    cardBgColor,
    cardHoverBgColor,
    cardTextColor,
  };
};

export default useCardColorMode;
