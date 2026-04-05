type TLabel = {
  label: string;
};

type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & TLabel;

const Input = ({ label, height, ...props }: TInputProps) => {
  return (
    <>
      <div className="grid md:grid-cols-[max-content_minmax(0,1fr)] gap-x-4 items-center text-3xl font-pixel text-yellow-300">
        <label>{label}</label>

        <div className="inline-flex items-stretch">
          <img
            src="/images/input-left.png"
            alt=""
            className={`block ${height} w-auto shrink-0 [image-rendering:pixelated]`}
          />

          <span
            className={`relative flex items-center justify-center ${height} w-50 shrink-0`}
          >
            <img
              src="/images/input-middle.png"
              alt=""
              className="absolute inset-0 w-full h-full object-fill [image-rendering:pixelated]"
            />

            <input
              {...props}
              className="text-2xl font-jetbrains z-10 outline-0 w-50 mb-0.75"
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
