import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import LoadingBar from "../ui/LoadingBar";

const GlobalLoadingBar = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const isLoading = isFetching > 0 || isMutating > 0;

  return <LoadingBar isLoading={isLoading} />;
};

export default GlobalLoadingBar;
