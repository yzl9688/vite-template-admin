import { HttpResponse, http, delay, PathParams } from "msw";
import { menus } from "./menus";
import { IMenu, ResponseData, UserInfo } from "@/types";
import staffHandlers from "./handlers/staffHandler";
import { baseUrl } from "./utils";
import { withAuth } from "./middleware";

export const handlers = [
  ...staffHandlers,
  // 登录
  http.post<PathParams, { username: string; password: string }>(
    baseUrl + "/login",
    async ({ request }) => {
      const { username, password } = await request.json();
      if (username !== "admin" || password !== "123456")
        return HttpResponse.json<ResponseData<null>>({
          code: 500,
          data: null,
          message: "用户名或密码错误！",
        });

      return HttpResponse.json<ResponseData<{ token: string }>>({
        code: 200,
        data: {
          token: "Bearer admin123456",
        },
        message: "success",
      });
    },
  ),
  // 获取菜单
  http.get(
    baseUrl + "/menus",
    withAuth(async () => {
      await delay(3000);

      return HttpResponse.json<ResponseData<IMenu[]>>({
        code: 200,
        data: menus,
        message: "success",
      });
    }),
  ),
  // 获取用户信息
  http.get(
    baseUrl + "/userInfo",
    withAuth(async () => {
      return HttpResponse.json<ResponseData<UserInfo>>({
        code: 200,
        data: {
          avatar: "/avatar.JPG",
          username: "上善若水",
          userId: 1001,
          role: "admin",
        },
        message: "success",
      });
    }),
  ),
];
