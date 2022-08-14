import { Box, Button, Flex, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import NextLink from 'next/link';
import React, { createRef, useEffect, useMemo, useState } from 'react';
import { FaRetweet } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { connect, ConnectedProps } from 'react-redux';
import { Markdown } from '..';
import useCardColorMode from '../../../hooks/useCardColorMode';
import useCurrentUserId from '../../../hooks/useCurrentUserId';
import useIsHoveringElement from '../../../hooks/useIsHoveringElement';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { updateData } from '../../../store/actions/resources';
import { PLACEHOLDER, RESOURCE_NAME } from '../../../utils/constant';
import { Post, ReactSetter } from '../../../utils/interfaces';
import { postSchema } from '../../../utils/schema';
import { postTheme } from '../../../utils/theme';

const PostRead = ({ post, setPost, updatePost }: Props) => {
  const createdAt = moment(post?.createdAt).format('DD MMMM YYYY');
  const filter = moment(post?.createdAt);
  const parseDate = (date: moment.Moment) => date.format('YYYY-MM-DD');

  const filterByDate = `/posts?filters=createdAt > "${parseDate(
    filter
  )}" AND createdAt < "${parseDate(filter.add(1, 'd'))}"`;
  const filterByUsername = `/posts?filters=user.username = "${post?.user?.username}"`;

  const cardRef = createRef<HTMLDivElement>();
  const [value, setValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const currUserId = useCurrentUserId();
  const isHoveringCard = useIsHoveringElement(cardRef);
  const { cardBgColor, cardTextColor } = useCardColorMode();

  const isEditable = useMemo(() => {
    if (!post || !currUserId) return false;

    const isAuthor = post.userId === currUserId;

    return isAuthor && isHoveringCard && !isEdit;
  }, [post?.userId, currUserId, isHoveringCard, isEdit]); // eslint-disable-line react-hooks/exhaustive-deps

  useOnClickOutside(cardRef, () => setIsEdit(false));

  useEffect(() => {
    if (!post) return;

    setValue(post.content);
  }, [post]);

  const onUpdate = async (values: { content: string }) => {
    if (!post) return;

    setPost(await updatePost(post?.id, values));
    setIsEdit(false);
  };

  return (
    <Box {...postTheme} backgroundColor={cardBgColor} color={cardTextColor} ref={cardRef}>
      <Flex gap={3} alignItems="center" position={'relative'} mb={2}>
        <Stack
          direction={'row'}
          spacing={1}
          alignItems={'center'}
          justifyContent={'center'}
          fontWeight={'bold'}
          userSelect={'none'}
        >
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
        {isEditable && (
          <Button
            position={'absolute'}
            right={0}
            top={0}
            variant={'ghost'}
            onClick={() => setIsEdit(true)}
          >
            <MdEdit />
          </Button>
        )}
      </Flex>
      {isEdit ? (
        <Markdown.PostCommentField
          value={value}
          setValue={setValue}
          schema={postSchema}
          placeholder={PLACEHOLDER.POST}
          onSubmit={onUpdate}
        />
      ) : (
        <Markdown.Preview value={post?.content ?? ''} />
      )}
    </Box>
  );
};

const connector = connect(null, {
  updatePost: updateData(RESOURCE_NAME.POST),
});

type Props = ConnectedProps<typeof connector> & {
  post: Post | null;
  setPost: ReactSetter<Post | null>;
};

export default connector(PostRead);
