import { Link } from "react-router";

const Logo = () => {
  return (
    <>
      <div className="w-50 h-auto">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="Quest Builder"
            className="w-fit h-fit"
          />
        </Link>
      </div>
    </>
  );
};

export default Logo;
