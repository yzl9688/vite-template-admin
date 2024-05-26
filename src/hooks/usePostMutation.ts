import { fetcher } from "@/utils/fetcher";
import useSWRMutation from "swr/mutation";

/**
 * #TODO: 该hook需重新设计
 */
const usePostMutation = (url: string) => {
  return useSWRMutation(url, (params) => {
    // if (isObject(params)) params.method = method;

    return fetcher(params);
  });
};

export default usePostMutation;
