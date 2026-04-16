import { Link } from "react-router";

interface ILinkButtonProps {
  text: string;
  url: string;
  height?: string;
  textSize?: string;
}

const LinkButton = ({
  text,
  url,
  height = "h-13",
  textSize = "text-xl",
}: ILinkButtonProps) => {
  return (
    <Link
      to={url}
      className="inline-flex items-stretch hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
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
        relative z-10 font-pixel text-[#f5d742] ${textSize} mb-1
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
