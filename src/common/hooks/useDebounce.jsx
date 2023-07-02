import React from "react";

const useDebounce = (callback, interval = 0) => {
  const prevTimeoutIdRef = React.useRef();

  return React.useCallback(
    (...args) => {
      clearTimeout(prevTimeoutIdRef.current);
      prevTimeoutIdRef.current = setTimeout(() => {
        clearTimeout(prevTimeoutIdRef.current);
        callback(...args);
      }, interval);
    },
    [callback, interval]
  );
};
