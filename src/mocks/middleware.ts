// mocks/middleware.js
import { ResponseData } from "@/types";
import { HttpResponse, HttpResponseResolver } from "msw";

export function withAuth(resolver: HttpResponseResolver): HttpResponseResolver {
  return (input) => {
    const { request } = input;
    const token = request.headers.get("Authorization");

    if (token !== "Bearer admin123456") {
      return HttpResponse.json<ResponseData>({
        code: 401,
        data: null,
        message: "token已过期!",
      });
    }

    return resolver(input);
  };
}
