import { useEffect } from "react";

const secondaryAssets = [
  "/images/input-left.png",
  "/images/input-middle.png",
  "/images/input-right.png",

  "/images/bg-editor.png",

  "/images/card/card_left_top.png",
  "/images/card/card_top.png",
  "/images/card/card_right_top.png",
  "/images/card/card_left_center.png",
  "/images/card/card_center.png",
  "/images/card/card_right_center.png",
  "/images/card/card_left_bottom.png",
  "/images/card/card_bottom.png",
  "/images/card/card_right_bottom.png",
];

const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

const usePreloadSecondaryAssets = () => {
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      secondaryAssets.forEach(preloadImage);
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, []);
};

export default usePreloadSecondaryAssets;
