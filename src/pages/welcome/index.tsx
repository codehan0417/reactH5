/*
 * @Author: hanlirong
 * @Date: 2025-02-28 09:34:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-28 12:18:53
 * @Description: 欢迎界面
 */

import Logo from "@/assets/images/logo.png";
import { Image } from "@heroui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Welcome() {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    const timmer = setTimeout(() => {
      if (!token) {
        navigate("/login", {
          replace: true,
          viewTransition: true,
          flushSync:true
        });
      } else {
        navigate("/database", {
          replace: true,
          viewTransition: true,
          flushSync:true
        });
      }
    }, 3000);
    return () => {
      clearTimeout(timmer);
    };
  }, []);
  return (
    <>
      <div className="h-screen flex flex-col justify-start items-center">
        <Image src={Logo} width="300" height="300"></Image>

        <div className="text-center text-large">
          <p>建立你的ID</p>
          <p>投资你的未来</p>
          <p>拥有你的价值</p>
        </div>
      </div>
    </>
  );
}
