import { fetcher } from "@/utils/fetcher";
import useSWRMutation from "swr/mutation";

const usePostMutation = (url: string, method: string = "POST") => {
  return useSWRMutation(url, (params: any) => {
    params.method = method;

    return fetcher(params);
  });
};

export default usePostMutation;
