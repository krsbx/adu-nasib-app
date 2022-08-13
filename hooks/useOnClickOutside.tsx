import { MutableRefObject, RefObject, useEffect } from 'react';

const useOnClickOutside = (
  ref: RefObject<HTMLElement> | MutableRefObject<HTMLElement>,
  cb: (event?: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      cb(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, cb]);
};

export default useOnClickOutside;
