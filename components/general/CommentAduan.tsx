import { Box, Flex, Link as ChakraLink, Text } from '@chakra-ui/react';
import moment from 'moment';
import NextLink from 'next/link';
import React from 'react';
import { Comment } from '../../utils/interfaces';

const CommentAduan = ({ comment }: Props) => {
  const createdAt = moment(comment?.createdAt).format('DD MMMM YYYY');
  const filter = moment(comment?.createdAt);
  const parseDate = (date: moment.Moment) => date.format('YYYY-MM-DD');

  return (
    <Box
      backgroundColor="gray.700"
      width={{ base: 'sm', md: 'md' }}
      p={3}
      borderRadius={'md'}
      gap={3}
      boxShadow={'md'}
      overflow={'hidden'}
      transition="all 0.3s ease-in-out"
      minWidth={'100%'}
      minHeight={'75px'}
    >
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
      <Text fontSize={'md'} fontWeight={'bold'}>
        {comment?.content ?? ''}
      </Text>
    </Box>
  );
};

type Props = {
  comment: Comment | null | undefined;
};

export default CommentAduan;
