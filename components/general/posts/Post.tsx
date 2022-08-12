import { Box, Flex, Link as ChakraLink, Text } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import _ from 'lodash';
import moment from 'moment';
import NextLink from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import useBlockquoteMdColor from '../../../hooks/useBlockquoteMdColor';
import { RESOURCE_NAME } from '../../../utils/constant';
import { ResourceMap } from '../../../utils/interfaces';

const Post = ({ post }: Props) => {
  const createdAt = moment(post?.createdAt).format('DD MMMM YYYY');
  const filter = moment(post?.createdAt);
  const parseDate = (date: moment.Moment) => date.format('YYYY-MM-DD');

  const { blockQuoteBg, blockQuoteBorderColor, blockQuoteColor } = useBlockquoteMdColor();

  return (
    <Box
      backgroundColor="gray.700"
      width={{ base: 'sm', md: 'md' }}
      p={3}
      borderRadius={'md'}
      gap={3}
      boxShadow={'md'}
      _hover={{
        bg: 'blackAlpha.300',
        boxShadow: '0px 25px 50px rgba(0, 0, 0, 0.4)',
        minHeight: '150px',
        maxHeight: '175px',
      }}
      overflow={'hidden'}
      transition="all 0.3s ease-in-out"
      minWidth={'100%'}
      minHeight={'75px'}
      maxHeight={'100px'}
    >
      <Flex gap={3} alignItems="center">
        <NextLink href={`/posts?filters=user.username = "${post?.user?.username}"`} passHref>
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
        <NextLink
          href={`/posts?filters=createdAt > "${parseDate(filter)}" AND createdAt < "${parseDate(
            filter.add(1, 'd')
          )}"`}
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
      <ReactMarkdown
        components={ChakraUIRenderer({
          blockquote: (props) => (
            <Box py={1} pl={2} bg={blockQuoteBg} color={blockQuoteColor}>
              <Box
                pl={2}
                alignItems={'center'}
                borderLeftColor={blockQuoteBorderColor}
                borderLeftWidth={5}
              >
                {props.children}
              </Box>
            </Box>
          ),
          p: ({ children, ...props }) => (
            <Text fontSize={'md'} lineHeight={'base'} fontWeight={'bold'} {...props}>
              {_.truncate(children as string, { length: 175 })}
            </Text>
          ),
        })}
        skipHtml
      >
        {post?.content ?? ''}
      </ReactMarkdown>
    </Box>
  );
};

type Props = {
  post: ResourceMap[typeof RESOURCE_NAME.POST] | null | undefined;
};

export default Post;
