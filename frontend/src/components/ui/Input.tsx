type TLabel = {
  label?: string;
  textSize?: string;
  gapX?: string;
};

type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & TLabel;

const Input = ({
  label = "",
  height = "h-13",
  textSize = "text-xl",
  gapX = "gap-x-4",
  ...props
}: TInputProps) => {
  return (
    <>
      <div
        className={`grid md:grid-cols-[max-content_minmax(0,1fr)] ${gapX} items-center text-3xl font-pixel text-yellow-300`}
      >
        <label>{label}</label>

        <div className="inline-flex items-stretch">
          <img
            src="/images/input-left.png"
            alt=""
            className={`block ${height} w-auto shrink-0 [image-rendering:pixelated]`}
          />

          <span
            className={`
            relative flex items-center justify-center
            ${height} w-50 shrink-0
            bg-repeat-x bg-size-[auto_100%]
            [image-rendering:pixelated]
          `}
            style={{ backgroundImage: "url('/images/input-middle.png')" }}
          >
            <input
              {...props}
              className={`relative z-10 ${textSize} outline-0 w-50 bg-transparent`}
            />
          </span>

          <img
            src="/images/input-right.png"
            alt=""
            className={`block ${height} w-auto shrink-0 [image-rendering:pixelated]`}
          />
        </div>
      </div>
    </>
  );
};

export default Input;
