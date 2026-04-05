type TText = {
  text: string;
};

type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & TText;

const Button = ({ text }: TButtonProps) => {
  return (
    <button className="inline-flex items-stretch active:translate-y-px">
      <img
        src="/images/button-left.png"
        alt=""
        className={`block h-13 w-auto shrink-0 [image-rendering:pixelated]`}
      />

      <span
        className={`relative flex items-center justify-center h-13 shrink-0`}
      >
        <img
          src="/images/button-middle.png"
          alt=""
          className="absolute inset-0 w-full h-full object-fill [image-rendering:pixelated]"
        />

        <span
          className={`
            relative z-10 font-pixel text-[#f5d742] mb-1 md:text-xl
            [text-shadow:2px_2px_0_#7a1f00] whitespace-nowrap hover:brightness-110`}
        >
          {text}
        </span>
      </span>

      <img
        src="/images/button-right.png"
        alt=""
        className={`block h-13 w-auto shrink-0 [image-rendering:pixelated]`}
      />
    </button>
  );
};

export default Button;
