import { Link } from "react-router";

interface ILinkButtonProps {
  text: string;
  url: string;
  height: string;
  textSize: string;
}

const LinkButton = ({ text, url, height, textSize }: ILinkButtonProps) => {
  return (
    <Link to={url} className="inline-flex items-stretch active:translate-y-px">
      <img
        src="/images/button-left.png"
        alt=""
        className={`block ${height} w-auto shrink-0 [image-rendering:pixelated]`}
      />

      <span
        className={`relative flex items-center justify-center ${height} shrink-0`}
      >
        <img
          src="/images/button-middle.png"
          alt=""
          className="absolute inset-0 w-full h-full object-fill [image-rendering:pixelated]"
        />

        <span
          className={`
            relative z-10 font-pixel text-[#f5d742] ${textSize} mb-1
            [text-shadow:2px_2px_0_#7a1f00] whitespace-nowrap hover:brightness-110`}
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
