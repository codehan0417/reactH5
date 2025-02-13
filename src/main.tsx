/*
 * @Author: hanlirong
 * @Date: 2025-02-10 12:31:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-12 14:53:06
 * @Description: 请填写简介
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "amfe-flexible";

import App from "./App";

import "./assets/style/index.css";
import { HeroUIProvider } from "@heroui/react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HeroUIProvider>
      <main className="dark text-foreground bg-background">
        <App />
      </main>
    </HeroUIProvider>
  </React.StrictMode>
);
