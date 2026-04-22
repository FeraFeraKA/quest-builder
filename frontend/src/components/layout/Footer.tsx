import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("layout");

  return (
    <>
      <footer
        className="h-40 flex justify-center items-center [image-rendering:pixelated]
          bg-[url(/images/navbar.png)] bg-repeat-x bg-top"
      >
        <div className="mt-1.5 flex flex-col md:flex-row justify-center text-center">
          <span className="font-pixel text-3xl text-yellow-300">
            <p className="inline text-2xl">&copy;</p>
            {t("footer.copyright")}
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
