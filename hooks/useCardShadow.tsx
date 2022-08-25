import { useColorModeValue } from '@chakra-ui/react';

const useCardShadow = () => {
  const boxShadowColor = useColorModeValue('rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.4)');

  return `0px 25px 50px ${boxShadowColor}`;
};

export default useCardShadow;
