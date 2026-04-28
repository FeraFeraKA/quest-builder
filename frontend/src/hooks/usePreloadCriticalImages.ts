import { useEffect, useState } from "react";

const criticalAssets = [
  "/images/bg.png",
  "/images/logo.png",
  "/images/navbar.png",

  "/images/button-left.png",
  "/images/button-center.png",
  "/images/button-right.png",

  "/images/input-left.png",
  "/images/input-center.png",
  "/images/input-right.png",
];

const preloadImage = (src: string) => {
  return new Promise<void>((resolve) => {
    const img = new Image();

    img.onload = () => resolve();
    img.onerror = () => resolve();

    img.src = src;
  });
};

const usePreloadCriticalImages = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    Promise.all(criticalAssets.map(preloadImage)).then(() => {
      if (!isCancelled) {
        setIsLoaded(true);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  return isLoaded;
};

export default usePreloadCriticalImages;
