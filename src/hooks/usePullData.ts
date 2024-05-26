import { useGlobalStore } from "@/stores";
import { IMenu, ResponseData, UserInfo } from "@/types";
import { useEffect } from "react";
import useSWR from "swr";

export const usePullUserInfo = () => {
  const setUserInfo = useGlobalStore((state) => state.setUserInfo);
  const { data } = useSWR<ResponseData<UserInfo>>("/userInfo");

  useEffect(() => {
    if (data) {
      setUserInfo(data.data);
    }
  }, [data]);
};

export const usePullMenus = () => {
  const setMenus = useGlobalStore((state) => state.setMenus);
  const { data } = useSWR<ResponseData<IMenu[]>>("/menus");

  useEffect(() => {
    if (data) {
      setMenus(data.data || []);
    }
  }, [data]);
};
