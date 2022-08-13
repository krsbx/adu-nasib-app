import { Box, Button, Flex, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';
import _ from 'lodash';
import moment from 'moment';
import NextLink from 'next/link';
import React, { createRef, useEffect, useMemo, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { Markdown } from '..';
import useCardColorMode from '../../../hooks/useCardColorMode';
import useFieldButtonColorMode from '../../../hooks/useFieldButtonColorMode';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import useOnHover from '../../../hooks/useOnHover';
import { PLACEHOLDER, RESOURCE_NAME } from '../../../utils/constant';
import * as cookieUtils from '../../../utils/cookieUtils';
import { ResourceMap } from '../../../utils/interfaces';
import { commentTheme } from '../../../utils/theme';
import { EDITOR_COMMANDS } from '../markdown/command';

const Comment = ({ comment }: Props) => {
  const createdAt = moment(comment?.createdAt).format('DD MMMM YYYY');
  const filter = moment(comment?.createdAt);
  const parseDate = (date: moment.Moment) => date.format('YYYY-MM-DD');

  const cardRef = createRef<HTMLDivElement>();

  const [value, setValue] = useState('');
  const [currUserId, setCurrUserId] = useState<number>();
  const [isPreview, setIsPreview] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOnHover, setIsOnHover] = useState(false);

  const { cardBgColor, cardTextColor } = useCardColorMode();
  const { fieldButtonBgColor, fieldButtonTextColor } = useFieldButtonColorMode();

  const isEditable = useMemo(() => {
    if (!comment || !currUserId) return false;

    const isAuthor = comment.userId === currUserId;

    return isAuthor && isOnHover && !isEdit;
  }, [comment?.userId, currUserId, isOnHover, isEdit]); // eslint-disable-line react-hooks/exhaustive-deps

  useOnHover(
    cardRef,
    () => setIsOnHover(true),
    () => setIsOnHover(false)
  );

  useOnClickOutside(cardRef, () => {
    setIsEdit(false);
    setIsPreview(false);
  });

  useEffect(() => {
    if (!comment) return;

    setValue(comment.content);
  }, [comment]);

  useEffect(() => {
    setCurrUserId(cookieUtils.getUserId());
  }, []);

  return (
    <Box {...commentTheme} backgroundColor={cardBgColor} color={cardTextColor} ref={cardRef}>
      <Flex gap={3} alignItems="center" position={'relative'}>
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
            onClick={() => {
              setIsEdit(true);
              setIsPreview(false);
            }}
          >
            <MdEdit />
          </Button>
        )}
      </Flex>
      {isEdit ? (
        <Stack my={2}>
          <Stack direction="row">
            <Button
              variant={'ghost'}
              px={2}
              w={'75px'}
              {...(!isPreview && {
                backgroundColor: fieldButtonBgColor,
                color: fieldButtonTextColor,
              })}
              transition={'all 0.3s ease-in-out'}
              onClick={() => setIsPreview(false)}
            >
              Edit
            </Button>
            <Button
              variant={'ghost'}
              px={2}
              w={'75px'}
              {...(isPreview && {
                backgroundColor: fieldButtonBgColor,
                color: fieldButtonTextColor,
              })}
              transition={'all 0.3s ease-in-out'}
              onClick={() => setIsPreview(true)}
            >
              Preview
            </Button>
          </Stack>
          <Stack spacing={3}>
            {!isPreview ? (
              <Markdown.Editor
                commandName={_.values(_.omit(EDITOR_COMMANDS, ['CODE']))}
                variant="filled"
                fontWeight={'semibold'}
                placeholder={PLACEHOLDER.COMMENT}
                minH={'175px'}
                value={value}
                setValue={setValue}
              />
            ) : (
              <Markdown.Preview value={value} />
            )}
            <Button type={'submit'}>Adu Nasib!</Button>
          </Stack>
        </Stack>
      ) : (
        <Markdown.Preview value={value} />
      )}
    </Box>
  );
};

type Props = {
  comment: ResourceMap[typeof RESOURCE_NAME.COMMENT] | null | undefined;
};

export default Comment;
