import React, { useEffect } from 'react';

const useClicked = (ref: React.MutableRefObject<any>, callback: Function) => {
  useEffect(() => {
    function handleClick(event: Event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref]);
};

export default useClicked;
