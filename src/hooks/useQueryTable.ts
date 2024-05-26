import { RequestParams, ResponseData } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { TableProps } from "antd";
import { PaginationProps } from "antd/lib";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { useImmer } from "use-immer";

/**
 * @description 管理表格通用逻辑的hook
 */
export const useQueryTable = (
  requestParams: RequestParams,
  initProps?: TableProps,
) => {
  const [params, setParams] = useState({
    current: 1,
    pageSize: 10,
  });
  const { data, isLoading } = useSWR<
    ResponseData<{ list: any[]; total: number }>
  >(
    {
      ...requestParams,
      params: Object.assign(requestParams.params || {}, params),
    },
    fetcher,
    {
      // 保留上一页数据
      keepPreviousData: true,
    },
  );

  const [tableProps, setTableProps] = useImmer<TableProps>({
    dataSource: [],
    scroll: {
      x: "max-content",
      y: undefined,
    },
    ...initProps,
  });

  const _handlePageChange = useCallback<Required<PaginationProps>["onChange"]>(
    (page, pageSize) => {
      setParams((pre) => ({
        ...pre,
        current: pre.current == page ? 1 : page,
        pageSize: pageSize,
      }));
    },
    [],
  );

  // 点击查询或重置按钮时调用，默认会回退到第一页
  const setRequestParams = (params: object) => {
    setParams((pre) => ({
      ...pre,
      current: 1,
      ...params,
    }));
  };

  useEffect(() => {
    setTableProps((draft) => {
      draft.dataSource = data?.data?.list || [];
      draft.loading = isLoading || false;
      draft.pagination = {
        current: params.current,
        pageSize: params.pageSize,
        total: data?.data?.total || 0,
        onChange: _handlePageChange,
      };
      if (draft.scroll) draft.scroll.y = params.pageSize > 10 ? 600 : undefined;
    });
  }, [data, isLoading, params]);

  return {
    tableProps,
    setRequestParams,
  };
};
