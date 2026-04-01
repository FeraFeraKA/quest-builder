import { Link } from "react-router";
import type { ILinkButton } from "./Button.types";

const LinkButton = ({ text, url }: ILinkButton) => {
  return (
    <Link to={url} className="relative flex items-center justify-center w-50">
      <img src="/images/Button.png" alt="" />
      <span
        className="absolute inset-0 bottom-1 flex items-center justify-center font-pixel
       text-yellow-300 drop-shadow-[1px_1px_0_#000] hover:brightness-110 active:translate-y-px"
      >
        {text}
      </span>
    </Link>
  );
};

export default LinkButton;
