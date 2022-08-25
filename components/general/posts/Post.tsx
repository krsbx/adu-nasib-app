import { Box, Flex, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';
import _ from 'lodash';
import moment from 'moment';
import NextLink from 'next/link';
import React from 'react';
import { FaRetweet } from 'react-icons/fa';
import { Markdown } from '..';
import useCardColorMode from '../../../hooks/useCardColorMode';
import useCardShadow from '../../../hooks/useCardShadow';
import { RESOURCE_NAME } from '../../../utils/constant';
import { ResourceMap } from '../../../utils/interfaces';
import { postTheme } from '../../../utils/theme';

const Post = ({ post }: Props) => {
  const createdAt = moment(post?.createdAt).format('DD MMMM YYYY');
  const filter = moment(post?.createdAt);
  const parseDate = (date: moment.Moment) => date.format('YYYY-MM-DD');

  const filterByDate = `/posts?filters=createdAt > "${parseDate(
    filter
  )}" AND createdAt < "${parseDate(filter.add(1, 'd'))}"`;
  const filterByUsername = `/posts?filters=user.username = "${post?.user?.username}"`;

  const boxShadowColor = useCardShadow();
  const { cardBgColor, cardHoverBgColor, cardTextColor } = useCardColorMode();

  return (
    <Box
      {...postTheme}
      backgroundColor={cardBgColor}
      _hover={{
        bg: cardHoverBgColor,
        boxShadow: boxShadowColor,
        minHeight: '150px',
        maxHeight: '175px',
      }}
      maxHeight={'100px'}
      color={cardTextColor}
    >
      <Flex gap={3} alignItems="center">
        <Stack direction={'row'} spacing={1} alignItems={'center'} fontWeight={'bold'}>
          <FaRetweet size={'20px'} />
          <Text fontSize={'sm'}>{post?.replies}</Text>
        </Stack>
        <NextLink href={filterByUsername} passHref>
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
              {post?.user?.username}
            </Text>
          </ChakraLink>
        </NextLink>
        <Text fontSize={'xs'}>mengadu nasib</Text>
        <NextLink href={filterByDate} passHref>
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
      <Markdown.Preview
        value={post?.content ?? ''}
        theme={{
          p: ({ children, ...props }) => (
            <Text fontSize={'md'} lineHeight={'base'} fontWeight={'bold'} {...props}>
              {_.truncate(children as string, { length: 175 })}
            </Text>
          ),
        }}
      />
    </Box>
  );
};

type Props = {
  post: ResourceMap[typeof RESOURCE_NAME.POST] | null | undefined;
};

export default Post;
