import { HttpResponse, http } from "msw";
import { menus } from "./menus";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const handlers = [
  http.post(baseUrl + "/login", async ({ request }) => {
    const { username, password }: any = await request.json();
    if (username !== "admin" || password !== "123456")
      return HttpResponse.json({
        code: 500,
        data: null,
        message: "用户名或密码错误！",
      });

    return HttpResponse.json({
      code: 200,
      data: {
        token: "Bearer admin123456",
      },
      message: "success",
    });
  }),
  http.get(baseUrl + "/menus", async ({ request }) => {
    const token = request.headers.get("Authorization");

    if (token !== "Bearer admin123456") {
      return HttpResponse.json({
        code: 401,
        data: null,
        message: "token已过期!",
      });
    }

    return HttpResponse.json({
      code: 200,
      data: menus,
      message: "success",
    });
  }),
];
