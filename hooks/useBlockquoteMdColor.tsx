import { useColorModeValue } from '@chakra-ui/react';

const useBlockquoteMdColor = () => {
  const blockQuoteBg = useColorModeValue('gray.100', 'rgba(226, 232, 240, 0.16)');
  const blockQuoteColor = useColorModeValue('gray.500', 'gray.100');
  const blockQuoteBorderColor = useColorModeValue('gray.200', 'gray.500');

  return {
    blockQuoteBg,
    blockQuoteColor,
    blockQuoteBorderColor,
  };
};

export default useBlockquoteMdColor;
