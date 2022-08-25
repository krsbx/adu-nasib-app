import { useMergeRefs } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { connect, ConnectedProps } from 'react-redux';
import { Loading, Post, Wrapper } from '../components/general';
import useHasNextPage from '../hooks/useHasNextPage';
import useLoadMoreResource from '../hooks/useLoadMoreResource';
import { AppState } from '../store';
import { getAllData as _getAllData } from '../store/actions/resources';
import { getResources } from '../store/selector/resources';
import { sortPostComment } from '../utils/common';
import { RESOURCE_NAME } from '../utils/constant';

const SearchPage = ({ posts }: Props) => {
  const router = useRouter();
  const query = useMemo(() => {
    if (!router.isReady) return '';

    const { keyword } = router.query;

    if (Array.isArray(keyword)) return keyword.join('&');

    return keyword;
  }, [router.isReady, router.query]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasPostNextPage = useHasNextPage(RESOURCE_NAME.POST);
  const hasUserNextPage = useHasNextPage(RESOURCE_NAME.USER);

  const {
    error: postsError,
    isLoading: isPostLoading,
    onLoadMore: onPostLoadMore,
  } = useLoadMoreResource(
    RESOURCE_NAME.POST,
    `filters=user.username contains "${query ?? ''}" OR content contains "${query ?? ''}"`
  );
  const {
    error: usersError,
    isLoading: isUsersLoading,
    onLoadMore: onUsersLoadMore,
  } = useLoadMoreResource(RESOURCE_NAME.USER, `filters=username contains "${query ?? ''}"`);

  const [postsSentryRef] = useInfiniteScroll({
    hasNextPage: hasPostNextPage,
    onLoadMore: onPostLoadMore,
    loading: isPostLoading,
    disabled: !router.isReady && (!hasPostNextPage || !!postsError),
  });
  const [usersSentryRef] = useInfiniteScroll({
    hasNextPage: hasUserNextPage,
    onLoadMore: onUsersLoadMore,
    loading: isUsersLoading,
    disabled: !router.isReady && (!hasUserNextPage || !!usersError),
  });

  const refs = useMergeRefs<HTMLDivElement>(postsSentryRef, usersSentryRef);

  return (
    <Wrapper>
      {sortPostComment(posts.rows, 'desc').map((post) => (
        <Post.PostLink post={post} key={post.id} />
      ))}
      {(isUsersLoading || hasUserNextPage || isPostLoading || hasPostNextPage) && (
        <Loading ref={refs} />
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state: AppState) => ({
  posts: getResources(RESOURCE_NAME.POST)(state),
  users: getResources(RESOURCE_NAME.USER)(state),
});

const connector = connect(mapStateToProps, {
  getAllData: _getAllData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(SearchPage);
