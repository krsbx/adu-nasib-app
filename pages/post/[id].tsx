import { Flex, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { connect, ConnectedProps } from 'react-redux';
import { Comment, Loading, Post } from '../../components/general';
import FieldPlaceholder from '../../components/general/placeholder/FieldPlaceholder';
import useHasNextPage from '../../hooks/useHasNextPage';
import useLoadMoreResource from '../../hooks/useLoadMoreResource';
import { AppState } from '../../store';
import { getDataById as _getDataById } from '../../store/actions/resources';
import { getResources } from '../../store/selector/resources';
import { sortPostComment } from '../../utils/common';
import { PLACEHOLDER, RESOURCE_NAME } from '../../utils/constant';
import { ResourceMap } from '../../utils/interfaces';

const PostPage = ({ getDataById, comments }: Props) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const postId = +router.query.id!;
  const [post, setPost] = useState<ResourceMap[typeof RESOURCE_NAME.POST] | null>(null);
  const [hasFocused, setHasFocused] = useState(false);

  const hasNextPage = useHasNextPage(RESOURCE_NAME.COMMENT);
  const { error, isLoading, onLoadMore } = useLoadMoreResource(
    RESOURCE_NAME.COMMENT,
    `filters=postId=${postId}`
  );
  const [sentryRef] = useInfiniteScroll({
    hasNextPage,
    onLoadMore,
    loading: isLoading,
    disabled: !router.isReady && (!hasNextPage || !!error),
  });

  useEffect(() => {
    if (!router.isReady) return;

    (async () => {
      const post = await getDataById(RESOURCE_NAME.POST, postId);

      setPost(post as ResourceMap[typeof RESOURCE_NAME.POST]);
    })();
  }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex width={'100%'} direction={'column'} alignItems={'center'} p={5} gap={5}>
      <Stack spacing={4}>
        <Post.PostRead post={post} setPost={setPost} />
        {hasFocused ? (
          <Comment.CommentField />
        ) : (
          <FieldPlaceholder onClick={() => setHasFocused(true)} placeholder={PLACEHOLDER.COMMENT} />
        )}
        {sortPostComment(comments.rows, 'desc').map((comment) => (
          <Comment.Comment comment={comment} key={comment.id} />
        ))}
        {(isLoading || hasNextPage) && <Loading ref={sentryRef} />}
      </Stack>
    </Flex>
  );
};

const mapStateToProps = (state: AppState) => ({
  comments: getResources(RESOURCE_NAME.COMMENT)(state),
});

const connector = connect(mapStateToProps, {
  getDataById: _getDataById,
});

type Props = ConnectedProps<typeof connector>;

export default connector(PostPage);
