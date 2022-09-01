import { Box, Flex, Link as ChakraLink, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import _ from 'lodash';
import moment from 'moment';
import NextLink from 'next/link';
import React, { createRef, useState } from 'react';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FaRetweet } from 'react-icons/fa';
import { Markdown } from '..';
import useCardColorMode from '../../../hooks/useCardColorMode';
import useCardShadow from '../../../hooks/useCardShadow';
import useOnHover from '../../../hooks/useOnHover';
import { RESOURCE_NAME } from '../../../utils/constant';
import { ResourceMap } from '../../../utils/interfaces';
import { cardInformationTheme, postTheme } from '../../../utils/theme';

const Post = ({ post }: Props) => {
  const cardRef = createRef<HTMLDivElement>();
  const [isOnHover, setIsOnHover] = useState(false);

  const createdAt = moment(post?.createdAt).format('DD MMMM YYYY');
  const filter = moment(post?.createdAt);
  const parseDate = (date: moment.Moment) => date.format('YYYY-MM-DD');

  const filterByDate = `/posts?filters=createdAt > "${parseDate(
    filter
  )}" AND createdAt < "${parseDate(filter.add(1, 'd'))}"`;
  const filterByUsername = `/posts?filters=user.username = "${post?.user?.username}"`;

  const boxShadowColor = useCardShadow();
  const statusHoverBgColor = useColorModeValue('gray.200', 'gray.900');
  const { cardBgColor, cardHoverBgColor, cardTextColor } = useCardColorMode();

  useOnHover(
    cardRef,
    () => setIsOnHover(true),
    () => setIsOnHover(false)
  );

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
      maxHeight={'150px'}
      color={cardTextColor}
      position={'relative'}
      ref={cardRef}
    >
      <Flex gap={3} alignItems="center">
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
      <Flex
        position={'absolute'}
        {...(isOnHover ? { background: statusHoverBgColor } : { background: cardBgColor })}
        width={'100%'}
        justifyContent={'center'}
        transition="all 0.3s ease-in-out"
        bottom={0}
        left={0}
        p={2}
      >
        <Stack {...cardInformationTheme} spacing={5}>
          <Stack {...cardInformationTheme}>
            {post?.isLiked ? <AiFillLike size={'1rem'} /> : <AiOutlineLike size={'1rem'} />}
            <Text fontSize={'sm'}>{post?.likes}</Text>
          </Stack>
          <Stack {...cardInformationTheme}>
            <FaRetweet size={'1rem'} />
            <Text fontSize={'sm'}>{post?.replies}</Text>
          </Stack>
          <Stack {...cardInformationTheme}>
            {post?.isDisliked ? (
              <AiFillDislike size={'1rem'} />
            ) : (
              <AiOutlineDislike size={'1rem'} />
            )}
            <Text fontSize={'sm'}>{post?.dislikes}</Text>
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
};

type Props = {
  post: ResourceMap[typeof RESOURCE_NAME.POST] | null | undefined;
};

export default Post;
