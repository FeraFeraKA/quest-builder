import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const Logo = () => {
  const { t } = useTranslation("layout");

  return (
    <>
      <div className="w-50 shrink-0">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt={t("logo.alt")}
            className="block h-auto w-full object-contain"
          />
        </Link>
      </div>
    </>
  );
};

export default Logo;
