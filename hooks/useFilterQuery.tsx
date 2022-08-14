import { useRouter } from 'next/router';
import { useMemo } from 'react';

const useFilterQuery = () => {
  const router = useRouter();

  const query = useMemo(() => {
    if (!router.isReady) return '';

    const { filters } = router.query;

    if (Array.isArray(filters)) return filters.join('&');

    return filters;
  }, [router.isReady, router.query]); // eslint-disable-line react-hooks/exhaustive-deps

  return query ?? '';
};

export default useFilterQuery;
