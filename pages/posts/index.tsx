import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { connect, ConnectedProps } from 'react-redux';
import { Loading, Post, Wrapper } from '../../components/general';
import useFilterQuery from '../../hooks/useFilterQuery';
import useHasNextPage from '../../hooks/useHasNextPage';
import useLoadMoreResource from '../../hooks/useLoadMoreResource';
import { AppState } from '../../store';
import { getAllData as _getAllData } from '../../store/actions/resources';
import { getResources } from '../../store/selector/resources';
import { sortPostComment } from '../../utils/common';
import { RESOURCE_NAME } from '../../utils/constant';

const PostsPage = ({ getAllData, posts }: Props) => {
  const router = useRouter();
  const filters = useFilterQuery();

  const hasNextPage = useHasNextPage(RESOURCE_NAME.POST);
  const { error, isLoading, onLoadMore } = useLoadMoreResource(
    RESOURCE_NAME.POST,
    `filters=${filters}`
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
      await getAllData(RESOURCE_NAME.POST, `filters=${filters}`);
    })();
  }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      {sortPostComment(posts.rows, 'desc').map((post) => (
        <Post.PostLink post={post} key={post.id} />
      ))}
      {(isLoading || hasNextPage) && <Loading ref={sentryRef} />}
    </Wrapper>
  );
};

const mapStateToProps = (state: AppState) => ({
  posts: getResources(RESOURCE_NAME.POST)(state),
});

const connector = connect(mapStateToProps, {
  getAllData: _getAllData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(PostsPage);
