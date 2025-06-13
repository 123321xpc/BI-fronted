import { useSearchParams } from '@@/exports';

export const useAllSearchParams = () => {
  const [params, setParams] = useSearchParams();

  const paramsObj = Object.fromEntries(params.entries());

  return {
    paramsObj,
    params,
    setParams,
  };
};
