import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getResources } from '../store/selector/resources';
import { ResourceName } from '../utils/interfaces';

const useHasNextPage = (resourceName: ResourceName) => {
  const router = useRouter();
  const resources = useSelector(getResources(resourceName));

  const hasNextPage = useMemo(() => {
    if (!router.isReady) return true;

    return Object.values(resources.rows).length < resources.count;
  }, [router.isReady, resources]); // eslint-disable-line react-hooks/exhaustive-deps

  return hasNextPage;
};

export default useHasNextPage;
