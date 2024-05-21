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

      const extensions = [".tsx", ".svg", ".png", ".jpeg", "jpg", ".css"];
      if (extensions.some((extension) => url.pathname.endsWith(extension))) {
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
