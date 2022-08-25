import { Box, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import useCardColorMode from '../../hooks/useCardColorMode';
import useCardShadow from '../../hooks/useCardShadow';
import { User } from '../../utils/interfaces';
import { postTheme } from '../../utils/theme';

const UserCard = ({ user }: Props) => {
  const boxShadowColor = useCardShadow();
  const { cardBgColor, cardHoverBgColor, cardTextColor } = useCardColorMode();

  return (
    <NextLink href={`/user/${user.id}`} passHref>
      <ChakraLink
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Box
          {...postTheme}
          backgroundColor={cardBgColor}
          _hover={{
            bg: cardHoverBgColor,
            boxShadow: boxShadowColor,
          }}
          maxHeight={'100px'}
          color={cardTextColor}
        >
          <Stack direction={'row'} spacing={4}>
            <Text fontWeight={'semibold'}>{user.username}</Text>
            <Text>telah mengadu nasib...</Text>
          </Stack>
        </Box>
      </ChakraLink>
    </NextLink>
  );
};

export default UserCard;

type Props = {
  user: User;
};
