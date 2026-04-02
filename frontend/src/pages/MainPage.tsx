import LinkButton from "../components/ui/Button/LinkButton";

const MainPage = () => {
  return (
    <>
      <div
        className="absolute inset-0 -z-50 h-screen
        bg-[url(/images/bg.png)] bg-repeat bg-top [image-rendering:pixelated]"
      ></div>
      <div className="mx-auto my-20 max-w-200">
        <h1 className="font-pixel text-4xl md:text-6xl text-center text-yellow-300 ">
          Воплотите свои мечты в реальность
        </h1>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-10">
          <LinkButton
            text="Начать создавать квест"
            url="/auth/register"
            height="h-[clamp(41px,16vw-10px,88px)]"
            textSize="text-[clamp(16px,2vw+10px,30px)]"
          />
        </div>
      </div>
    </>
  );
};

export default MainPage;
