import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import LoadingBar from "../ui/LoadingBar";

const GlobalLoadingBar = () => {
  const fetchingCount = useIsFetching({
    predicate: (query) => !query.meta?.skipGlobalLoader,
  });

  const mutatingCount = useIsMutating({
    predicate: (mutation) => !mutation.meta?.skipGlobalLoader,
  });

  const isLoading = fetchingCount > 0 || mutatingCount > 0;

  return <LoadingBar isLoading={isLoading} />;
};

export default GlobalLoadingBar;
