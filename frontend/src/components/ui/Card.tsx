type TCardProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

const CARD_SLICE_SOURCE = {
  topHeight: 165,
  bottomHeight: 387,
  leftWidth: 588,
  rightWidth: 594,
  centerWidth: 885,
  centerHeight: 211,
} as const;

const Card = ({
  children,
  className = "",
  contentClassName = "",
  top = 24,
  bottom = 56,
  left = 48,
  right = 48,
}: TCardProps) => {
  const scaleX =
    (left / CARD_SLICE_SOURCE.leftWidth +
      right / CARD_SLICE_SOURCE.rightWidth) /
    2;
  const scaleY =
    (top / CARD_SLICE_SOURCE.topHeight +
      bottom / CARD_SLICE_SOURCE.bottomHeight) /
    2;
  const centerTileWidth = Math.max(
    1,
    Math.round(CARD_SLICE_SOURCE.centerWidth * scaleX),
  );
  const centerTileHeight = Math.max(
    1,
    Math.round(CARD_SLICE_SOURCE.centerHeight * scaleY),
  );

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `${left}px minmax(0,1fr) ${right}px`,
        gridTemplateRows: `${top}px minmax(0,1fr) ${bottom}px`,
      }}
    >
      <div
        className="bg-no-repeat [image-rendering:pixelated]"
        style={{
          backgroundImage: "url('/images/card/card_left_top.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "top left",
        }}
      />

      <div
        className="[image-rendering:pixelated]"
        style={{
          backgroundImage: "url('/images/card/card_top.png')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "top left",
        }}
      />

      <div
        className="bg-no-repeat [image-rendering:pixelated]"
        style={{
          backgroundImage: "url('/images/card/card_right_top.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "top left",
        }}
      />

      <div
        className="[image-rendering:pixelated]"
        style={{
          backgroundImage: "url('/images/card/card_left_center.png')",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
          backgroundPosition: "top left",
        }}
      />

      <div
        className={`min-w-0 min-h-0 pt-5 ${contentClassName} [image-rendering:pixelated]`}
        style={{
          backgroundImage: "url('/images/card/card_center.png')",
          backgroundRepeat: "repeat",
          backgroundSize: `${centerTileWidth}px ${centerTileHeight}px`,
          backgroundPosition: "top left",
        }}
      >
        {children}
      </div>

      <div
        className="[image-rendering:pixelated]"
        style={{
          backgroundImage: "url('/images/card/card_right_center.png')",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
          backgroundPosition: "top left",
        }}
      />

      <div
        className="bg-no-repeat [image-rendering:pixelated]"
        style={{
          backgroundImage: "url('/images/card/card_left_bottom.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "top left",
        }}
      />

      <div
        className="[image-rendering:pixelated]"
        style={{
          backgroundImage: "url('/images/card/card_bottom.png')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "bottom left",
        }}
      />

      <div
        className="bg-no-repeat [image-rendering:pixelated]"
        style={{
          backgroundImage: "url('/images/card/card_right_bottom.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "top left",
        }}
      />
    </div>
  );
};

export default Card;
