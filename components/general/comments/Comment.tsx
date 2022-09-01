import { Box, Button, Flex, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import NextLink from 'next/link';
import React, { createRef, useEffect, useMemo, useState } from 'react';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { connect, ConnectedProps } from 'react-redux';
import { Markdown } from '..';
import useCardColorMode from '../../../hooks/useCardColorMode';
import useCurrentUserId from '../../../hooks/useCurrentUserId';
import useIsHoveringElement from '../../../hooks/useIsHoveringElement';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import {
  dislikeResource as _dislikeResource,
  likeResource as _likeResource,
  updateData,
} from '../../../store/actions/resources';
import { PLACEHOLDER, RESOURCE_NAME } from '../../../utils/constant';
import { Comment } from '../../../utils/interfaces';
import { commentSchema } from '../../../utils/schema';
import { cardInformationTheme, commentTheme } from '../../../utils/theme';

const Comment = ({ comment, updateComment, likeResource, dislikeResource }: Props) => {
  const createdAt = moment(comment?.createdAt).format('DD MMMM YYYY');
  const filter = moment(comment?.createdAt);
  const parseDate = (date: moment.Moment) => date.format('YYYY-MM-DD');

  const cardRef = createRef<HTMLDivElement>();
  const [value, setValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const currUserId = useCurrentUserId();
  const isHoveringCard = useIsHoveringElement(cardRef);
  const { cardBgColor, cardTextColor } = useCardColorMode();

  const isEditable = useMemo(() => {
    if (!comment || !currUserId) return false;

    const isAuthor = comment.userId === currUserId;

    return isAuthor && isHoveringCard && !isEdit;
  }, [comment?.userId, currUserId, isHoveringCard, isEdit]); // eslint-disable-line react-hooks/exhaustive-deps

  useOnClickOutside(cardRef, () => setIsEdit(false));

  useEffect(() => {
    if (!comment) return;

    setValue(comment.content);
  }, [comment]);

  const onUpdate = async (values: { content: string }) => {
    if (!comment) return;

    await updateComment(comment?.id, values);
    setIsEdit(false);
  };

  const likeComment = async () => {
    if (!comment) return;

    await likeResource(RESOURCE_NAME.COMMENT, comment?.id);
  };

  const dislikeComment = async () => {
    if (!comment) return;

    await dislikeResource(RESOURCE_NAME.COMMENT, comment?.id);
  };

  return (
    <Box {...commentTheme} backgroundColor={cardBgColor} color={cardTextColor} ref={cardRef}>
      <Flex gap={3} alignItems="center" position={'relative'} mb={2}>
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
          schema={commentSchema}
          placeholder={PLACEHOLDER.COMMENT}
          onSubmit={onUpdate}
        />
      ) : (
        <Markdown.Preview value={comment?.content ?? ''} />
      )}
      {!isEdit && (
        <Stack {...cardInformationTheme} spacing={10} justifyContent={'center'}>
          <Button variant={'ghost'} onClick={likeComment}>
            <Stack {...cardInformationTheme}>
              {comment?.isLiked ? <AiFillLike size={'1rem'} /> : <AiOutlineLike size={'1rem'} />}
              <Text fontSize={'sm'}>{comment?.likes}</Text>
            </Stack>
          </Button>
          <Button variant={'ghost'} onClick={dislikeComment}>
            <Stack {...cardInformationTheme}>
              {comment?.isDisliked ? (
                <AiFillDislike size={'1rem'} />
              ) : (
                <AiOutlineDislike size={'1rem'} />
              )}
              <Text fontSize={'sm'}>{comment?.dislikes}</Text>
            </Stack>
          </Button>
        </Stack>
      )}
    </Box>
  );
};

const connector = connect(null, {
  updateComment: updateData(RESOURCE_NAME.COMMENT),
  likeResource: _likeResource,
  dislikeResource: _dislikeResource,
});

type Props = ConnectedProps<typeof connector> & {
  comment: Comment | null | undefined;
};

export default connector(Comment);
