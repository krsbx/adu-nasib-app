import { useEffect, useState } from 'react';
import * as cookieUtils from '../utils/cookieUtils';

const useCurrentUserId = () => {
  const [currUserId, setCurrUserId] = useState<number>();

  useEffect(() => {
    if (!cookieUtils.isAuthenticated()) return;

    setCurrUserId(cookieUtils.getUserId());
  }, []);

  return currUserId;
};

export default useCurrentUserId;
