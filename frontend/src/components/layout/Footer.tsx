const Footer = () => {
  return (
    <>
      <footer
        className="h-40 flex justify-center items-center [image-rendering:pixelated]
          bg-[url(/images/navbar.png)] bg-repeat-x bg-top"
      >
        <div className="mt-1.5 flex justify-center">
          <p className="text-2xl text-yellow-300">&copy; </p>
          <span className="font-pixel text-3xl text-yellow-300">
            2026. Made by Fera.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
