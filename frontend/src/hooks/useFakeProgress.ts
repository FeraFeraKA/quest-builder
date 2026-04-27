import { useEffect, useState } from "react";

export const useFakeProgress = (isLoading: boolean) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let intervalId: number | undefined;
    let timeoutId: number | undefined;

    if (isLoading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
      setProgress(8);

      intervalId = window.setInterval(() => {
        setProgress((prev) => {
          if (prev < 60) return prev + 8;
          if (prev < 85) return prev + 3;
          if (prev < 92) return prev + 0.5;

          return prev;
        });
      }, 250);
    } else {
      setProgress(100);

      timeoutId = window.setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 400);
    }

    return () => {
      if (intervalId) window.clearInterval(intervalId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [isLoading]);

  return { progress, isVisible };
};
