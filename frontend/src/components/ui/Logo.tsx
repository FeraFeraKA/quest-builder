import { Link } from "react-router";

const Logo = () => {
  return (
    <>
      <div className="w-50 h-auto">
        <Link to="/">
          <img
            src="/images/Logo.png"
            alt="Quest Builder"
            className="w-fit h-fit"
          />
          {/* <p className="font-pixel text-yellow-300 text-3xl">Quest Builder</p> */}
        </Link>
      </div>
    </>
  );
};

export default Logo;
