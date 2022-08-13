import { Box, Flex, Link as ChakraLink, Text } from '@chakra-ui/react';
import moment from 'moment';
import NextLink from 'next/link';
import React from 'react';
import { Markdown } from '..';
import useCardColorMode from '../../../hooks/useCardColorMode';
import { RESOURCE_NAME } from '../../../utils/constant';
import { ResourceMap } from '../../../utils/interfaces';
import { commentTheme } from '../../../utils/theme';

const Comment = ({ comment }: Props) => {
  const createdAt = moment(comment?.createdAt).format('DD MMMM YYYY');
  const filter = moment(comment?.createdAt);
  const parseDate = (date: moment.Moment) => date.format('YYYY-MM-DD');

  const { cardBgColor, cardTextColor } = useCardColorMode();

  return (
    <Box {...commentTheme} backgroundColor={cardBgColor} color={cardTextColor}>
      <Flex gap={3} alignItems="center">
        <NextLink href={`/comments?filters=user.username = "${comment?.user?.username}"`} passHref>
          <ChakraLink
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Text
              color={'twitter.300'}
              fontSize={'sm'}
              transition="all 0.3s ease-in-out"
              _hover={{
                color: 'twitter.500',
              }}
              fontWeight={'semibold'}
            >
              {comment?.user?.username}
            </Text>
          </ChakraLink>
        </NextLink>
        <Text fontSize={'xs'}>mengadu nasib</Text>
        <NextLink
          href={`/comments?filters=(createdAt > "${parseDate(filter)}" AND createdAt < "${parseDate(
            filter.add(1, 'd')
          )}" AND user.username = "${comment?.user?.username}"`}
          passHref
        >
          <ChakraLink
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Text
              color={'twitter.200'}
              fontSize={'sm'}
              transition="all 0.3s ease-in-out"
              _hover={{
                color: 'twitter.400',
              }}
              fontWeight={'semibold'}
            >
              {createdAt}
            </Text>
          </ChakraLink>
        </NextLink>
      </Flex>
      <Markdown.Preview value={comment?.content ?? ''} />
    </Box>
  );
};

type Props = {
  comment: ResourceMap[typeof RESOURCE_NAME.COMMENT] | null | undefined;
};

export default Comment;
