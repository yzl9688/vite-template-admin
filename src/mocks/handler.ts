import { HttpResponse, http } from "msw";
import { menus } from "./menus";
import { IMenu, ResponseInfo, UserInfo } from "@/types";

const baseUrl = import.meta.env.VITE_BASE_URL;

function sleep(ms: number = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const handlers = [
  // 登录
  http.post(baseUrl + "/login", async ({ request }) => {
    const { username, password }: any = await request.json();
    if (username !== "admin" || password !== "123456")
      return HttpResponse.json<ResponseInfo>({
        code: 500,
        data: null,
        message: "用户名或密码错误！",
      });

    return HttpResponse.json<ResponseInfo<{ token: string }>>({
      code: 200,
      data: {
        token: "Bearer admin123456",
      },
      message: "success",
    });
  }),
  // 获取菜单
  http.get(baseUrl + "/menus", async ({ request }) => {
    const token = request.headers.get("Authorization");

    if (token !== "Bearer admin123456") {
      return HttpResponse.json<ResponseInfo>({
        code: 401,
        data: null,
        message: "token已过期!",
      });
    }

    await sleep(3000);

    return HttpResponse.json<ResponseInfo<IMenu[]>>({
      code: 200,
      data: menus,
      message: "success",
    });
  }),
  // 获取用户信息
  http.get(baseUrl + "/userInfo", async ({ request }) => {
    const token = request.headers.get("Authorization");

    if (token !== "Bearer admin123456") {
      return HttpResponse.json<ResponseInfo>({
        code: 401,
        data: null,
        message: "token已过期!",
      });
    }

    return HttpResponse.json<ResponseInfo<UserInfo>>({
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
];
