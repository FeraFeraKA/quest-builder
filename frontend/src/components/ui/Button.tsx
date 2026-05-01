import { forwardRef } from "react";

type TText = {
  text: string;
  height?: string;
  textSize?: string;
};

type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & TText;

const Button = forwardRef<HTMLButtonElement, TButtonProps>(
  (
    {
      text,
      height = "h-13",
      textSize = "text-lg md:text-xl",
      className = "",
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        {...props}
        className={`
        inline-flex items-stretch transition-all duration-200
        enabled:hover:-translate-y-0.5 enabled:active:translate-y-0
        disabled:opacity-60 disabled:cursor-not-allowed disabled:brightness-75
        ${className}
      `}
      >
        <img
          src="/images/button-left.png"
          alt=""
          className={`block ${height} w-auto shrink-0 [image-rendering:pixelated]`}
        />

        <span
          className="
          shrink-0
          flex items-center justify-center
          bg-repeat-x bg-size-[auto_100%]
          [image-rendering:pixelated]
        "
          style={{
            height,
            backgroundImage: "url('/images/button-middle.png')",
          }}
        >
          <span
            className="
            relative z-10 whitespace-nowrap
            font-pixel text-[#f5d742]
            [text-shadow:2px_2px_0_#7a1f00]
            enabled:hover:brightness-110
          "
            style={{
              fontSize: textSize.startsWith("text-") ? undefined : textSize,
            }}
          >
            <span className={textSize}>{text}</span>
          </span>
        </span>

        <img
          src="/images/button-right.png"
          alt=""
          className={`block ${height} w-auto shrink-0 [image-rendering:pixelated]`}
        />
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
