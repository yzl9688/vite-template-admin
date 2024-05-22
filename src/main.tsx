import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";
import "./index.css";

async function enableMocking() {
  if (import.meta.env.MODE !== "mock") return;

  const { worker } = await import("./mocks/browser");

  return worker.start({
    onUnhandledRequest: (request, print) => {
      const url = new URL(request.url);

      // 非接口请求不打印警告
      if (!url.href.includes(import.meta.env.VITE_BASE_URL)) {
        return;
      }

      print.warning();
    },
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
  );
});
