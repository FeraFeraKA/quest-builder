import { useCallback, useEffect, useRef } from "react";

const useTimeout = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimeoutSafe = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startTimeout = useCallback(
    (callback: () => void, delay: number) => {
      clearTimeoutSafe();

      timeoutRef.current = setTimeout(() => {
        callback();
        timeoutRef.current = null;
      }, delay);
    },
    [clearTimeoutSafe],
  );

  useEffect(() => {
    return () => {
      clearTimeoutSafe();
    };
  }, [clearTimeoutSafe]);

  return {
    startTimeout,
    clearTimeoutSafe,
  };
};

export default useTimeout;
