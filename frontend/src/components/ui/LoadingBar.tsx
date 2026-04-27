import { useFakeProgress } from "../../hooks/useFakeProgress";

const LoadingBar = ({ isLoading }: { isLoading: boolean }) => {
  const { progress, isVisible } = useFakeProgress(isLoading);

  if (!isVisible) return null;

  return (
    <div className="fixed left-0 top-0 z-100 h-1 w-full bg-black/20">
      <div
        className="h-full bg-yellow-400 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default LoadingBar;
