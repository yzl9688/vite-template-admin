import { RequestEnum } from "@/enums/httpEnums";
import { RequestParams } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { isString } from "lodash";
import { Key } from "swr";
import useSWRMutation from "swr/mutation";

type Params = RequestParams & { manualTrigger?: boolean };

/**
 * @description: 手动触发网络请求hook
 */
const useRequest = (args: string | RequestParams) => {
  const params: Partial<Params> = {
    manualTrigger: true,
  };
  if (isString(args)) {
    params.url = args;
    params.method = RequestEnum.POST;
  } else {
    Object.assign(params, args);
  }
  const { trigger } = useSWRMutation(
    params,
    (_key: Key, { arg }: Readonly<{ arg: RequestParams }>) => {
      return fetcher(arg);
    },
  );

  return { trigger };
};

export default useRequest;
