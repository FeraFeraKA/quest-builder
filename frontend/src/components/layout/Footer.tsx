const Footer = () => {
  return (
    <>
      <footer
        className="h-40 flex justify-center items-center [image-rendering:pixelated]
          bg-[url(/images/navbar.png)] bg-repeat-x bg-top"
      >
        <div className="mt-1.5 flex justify-center text-center">
          <span className="font-pixel text-3xl text-yellow-300">
            <p className="inline text-2xl">&copy;</p>
            2026. Made by Fera.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
