import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../store/selector/currentUser';
import * as cookieUtils from '../utils/cookieUtils';

const useCurrentUserId = () => {
  const router = useRouter();
  const currentUser = useSelector(getCurrentUser);
  const [currUserId, setCurrUserId] = useState<number>();

  useEffect(() => {
    if (!router.isReady) return;

    if (!cookieUtils.isAuthenticated()) return;

    setCurrUserId(cookieUtils.getUserId() || currentUser?.id);
  }, [router.isReady, currentUser]);

  return currUserId;
};

export default useCurrentUserId;
