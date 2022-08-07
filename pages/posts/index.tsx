import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import AllPost from '../../components/posts/AllPost';
import { getAllData as _getAllData } from '../../store/actions/resources';
import { RESOURCE_NAME } from '../../utils/constant';

const PostsPage = ({ getAllData }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    let filters = router.query?.filters;
    if (Array.isArray(filters)) filters = filters.join('&');

    (async () => {
      await getAllData(RESOURCE_NAME.POST, `filters=${filters ?? ''}`);
    })();
  }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

  return <AllPost />;
};

const connector = connect(null, {
  getAllData: _getAllData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(PostsPage);
