import { Link } from "react-router";
import type { ILinkButton } from "./Button.types";

const LinkButton = ({ text, url }: ILinkButton) => {
  return (
    <Link
      to={url}
      className="inline-flex items-stretch h-14 hover:brightness-110 active:translate-y-px"
    >
      <img
        src="/images/button-left.png"
        alt=""
        className="block h-full w-auto shrink-0 [image-rendering:pixelated]"
      />

      <span className="relative block h-full min-w-55 w-80 overflow-hidden">
        <img
          src="/images/button-middle.png"
          alt=""
          className="block w-full h-full object-fill [image-rendering:pixelated]"
        />

        <span
          className="
            absolute inset-0
            flex items-center justify-center
            font-pixel text-[#f5d742] text-xl
            drop-shadow-[1px_1px_0_#000]"
        >
          {text}
        </span>
      </span>

      <img
        src="/images/button-right.png"
        alt=""
        className="block h-full w-auto shrink-0 [image-rendering:pixelated]"
      />
    </Link>
  );
};

export default LinkButton;
