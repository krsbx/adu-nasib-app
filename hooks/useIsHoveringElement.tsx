import { MutableRefObject, RefObject, useState } from 'react';
import useOnHover from './useOnHover';

const useIsHoveringElement = (ref: RefObject<HTMLElement> | MutableRefObject<HTMLElement>) => {
  const [isOnHover, setIsOnHover] = useState(false);

  useOnHover(
    ref,
    () => setIsOnHover(true),
    () => setIsOnHover(false)
  );

  return isOnHover;
};

export default useIsHoveringElement;
