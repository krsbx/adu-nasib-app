import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAllData } from '../store/actions/resources';
import { ResourceName } from '../utils/interfaces';

const useLoadMoreResource = (resourceName: ResourceName, query = '') => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [prevQuery, setPrevQuery] = useState('');

  const onLoadMore = async (pageNumber?: number, overwrite?: boolean) => {
    setIsLoading(true);

    try {
      await getAllData(
        resourceName,
        _.compact([`page=${pageNumber ?? page + 1}`, query]).join('&'),
        !_.isNil(overwrite) ? overwrite : false
      )();

      if (_.isNil(pageNumber)) setPage((curr) => curr + 1);
      else setPage(pageNumber);
    } catch {
      setError(new Error('Something went wrong'));
    } finally {
      setIsLoading(false);
      setPrevQuery(query);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;

    onLoadMore(1, prevQuery !== query);
  }, [router.isReady, query]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    page,
    isLoading,
    error,
    onLoadMore,
  };
};

export default useLoadMoreResource;
