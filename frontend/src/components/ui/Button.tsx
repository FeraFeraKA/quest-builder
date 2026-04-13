type TText = {
  text: string;
};

type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & TText;

const Button = ({ text }: TButtonProps) => {
  return (
    <button className="inline-flex items-stretch hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
      <img
        src="/images/button-left.png"
        alt=""
        className="block h-13 w-auto shrink-0 [image-rendering:pixelated]"
      />

      <span
        className="
          h-13 shrink-0
          flex items-center justify-center
          bg-repeat-x bg-size-[auto_100%]
          [image-rendering:pixelated]
        "
        style={{ backgroundImage: "url('/images/button-middle.png')" }}
      >
        <span
          className="
            relative z-10 whitespace-nowrap mb-1
            font-pixel text-[#f5d742] md:text-xl
            [text-shadow:2px_2px_0_#7a1f00]
            hover:brightness-110
          "
        >
          {text}
        </span>
      </span>

      <img
        src="/images/button-right.png"
        alt=""
        className="block h-13 w-auto shrink-0 [image-rendering:pixelated]"
      />
    </button>
  );
};

export default Button;
