import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const Logo = () => {
  const { t } = useTranslation("layout");

  return (
    <>
      <div className="w-50 h-auto">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt={t("logo.alt")}
            className="w-fit h-fit"
          />
        </Link>
      </div>
    </>
  );
};

export default Logo;
