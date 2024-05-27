import { RequestEnum } from "@/enums/httpEnums";
import { RequestParams } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { isObject } from "lodash";
import useSWRMutation from "swr/mutation";

/**
 * #TODO: 该hook需重新设计
 */
const usePostMutation = (url: string) => {
  return useSWRMutation(url, (params) => {
    if (isObject(params)) (params as RequestParams).method = RequestEnum.POST;

    return fetcher(params);
  });
};

export default usePostMutation;
