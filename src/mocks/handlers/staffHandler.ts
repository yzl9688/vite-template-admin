import { HttpResponse, delay, http } from "msw";
import { baseUrl } from "../utils";
import { withAuth } from "../middleware";
import { ResponseData } from "@/types";

const staffHandlers = [
  http.post(
    baseUrl + "/staffList",
    withAuth(async ({ request }) => {
      const { current, pageSize }: any = await request.json();

      await delay(1000);

      const res = [];

      for (let i = 1; i <= pageSize; i++) {
        const num = i + (current - 1) * pageSize;
        res.push({
          id: num,
          name: "staff_" + num,
          role: "普通员工",
          email: "12343243@qq.com",
          sex: i % 2 == 0 ? "女" : "男",
          age: Math.floor(Math.random() * 100),
        });
      }

      return HttpResponse.json<
        ResponseData<{ list: unknown[]; total: number }>
      >({
        code: 200,
        data: {
          list: res,
          total: 200,
        },
        message: "success",
      });
    }),
  ),
];

export default staffHandlers;
