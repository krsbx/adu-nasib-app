import { Flex, Stack } from '@chakra-ui/react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CommentAduan, CommentNgadu, Thread } from '../../../components/general';
import { AppState } from '../../../store';
import {
  getAllData as _getAllData,
  getDataById as _getDataById,
} from '../../../store/actions/resources';
import { getResources } from '../../../store/selector/resources';
import { RESOURCE_NAME } from '../../../utils/constant';
import { Post } from '../../../utils/interfaces';

const PostPage = ({ getDataById, getAllData, comments }: Props) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const postId = +router.query.id!;
  const [post, setPost] = useState<Post | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!router.isReady) return;

    (async () => {
      const post = await getDataById(RESOURCE_NAME.POST, postId);
      setPost(post as Post);
    })();
  }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!router.isReady) return;

    (async () => {
      await getAllData(RESOURCE_NAME.COMMENT, `filters=postId=${postId}&page=${page}`);
    })();
  }, [router.isReady, page]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex width={'100%'} direction={'column'} alignItems={'center'} p={5} gap={5}>
      <Stack spacing={4}>
        <Thread post={post} />
        {_.map(comments.rows, (comment) => (
          <CommentAduan comment={comment} key={comment.id} />
        ))}
        <CommentNgadu />
      </Stack>
    </Flex>
  );
};

const mapStateToProps = (state: AppState) => ({
  comments: getResources(RESOURCE_NAME.COMMENT)(state),
});

const connector = connect(mapStateToProps, {
  getAllData: _getAllData,
  getDataById: _getDataById,
});

type Props = ConnectedProps<typeof connector>;

export default connector(PostPage);