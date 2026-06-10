import { Link } from "react-router";

type TLinkButtonProps = Omit<
  React.ComponentProps<typeof Link>,
  "to" | "children"
> & {
  text: string;
  url: string;
  height?: string;
  textSize?: string;
};

const LinkButton = ({
  text,
  url,
  height = "h-13",
  textSize = "text-lg md:text-xl",
  className = "",
  ...props
}: TLinkButtonProps) => {
  return (
    <Link
      to={url}
      className={`
        inline-flex items-stretch transition-all duration-200
        hover:-translate-y-0.5 active:translate-y-0
        disabled:opacity-60 disabled:cursor-not-allowed disabled:brightness-75
        ${className}
      `}
      {...props}
    >
      <img
        src="/images/button-left.png"
        alt=""
        className={`block ${height} w-auto shrink-0 [image-rendering:pixelated]`}
      />

      <span
        className={`
      flex items-center justify-center
      ${height} shrink-0
      bg-repeat-x bg-size-[auto_100%]
      [image-rendering:pixelated]
    `}
        style={{ backgroundImage: "url('/images/button-middle.png')" }}
      >
        <span
          className={`
        relative z-10 font-pixel text-[#f5d742] ${textSize}
        [text-shadow:2px_2px_0_#7a1f00] whitespace-nowrap hover:brightness-110
      `}
        >
          {text}
        </span>
      </span>

      <img
        src="/images/button-right.png"
        alt=""
        className={`block ${height} w-auto shrink-0 [image-rendering:pixelated]`}
      />
    </Link>
  );
};

export default LinkButton;
