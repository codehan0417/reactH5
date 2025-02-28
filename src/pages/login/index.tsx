/*
 * @Author: hanlirong
 * @Date: 2025-02-11 13:02:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-28 12:33:03
 * @Description: 登录
 */
import { Button, Image, Checkbox, Link } from "@heroui/react";
import React, { useState, useEffect, use } from "react";
import GifImag from "@/assets/images/coin.gif";
import Logo from "@/assets/images/logo.png";
import SelectNational from "./components/national.tsx";
import { useNavigate } from "react-router-dom";
import ModuleTag from "./components/moduleTag.tsx";

interface CoinIconProps {
  width?: number;
  height?: number;
  size?: string;
  alt?: string;
  className?: string;
  onClick?: (e: any) => void;
}

export const CoinIcon: React.FC<CoinIconProps> = ({
  width = 30,
  height = 30,
  size = "sm",
  alt = "icon",
  ...props
}) => {
  return (
    <Image
      alt={alt}
      src={GifImag}
      width={width}
      sizes={size}
      height={height}
      {...props}
    />
  );
};
interface VisibleType {
  isOpenModule: {
    visible: boolean;
    isLoginBtn: string;
  };
  setIsOpenModule: (val: { visible: boolean; isLoginBtn: string }) => void;
}
export const contextOpen = React.createContext({} as VisibleType);
export default function Login() {
  const navigate = useNavigate();
  const handelAuth = (val: string) => {
    if (isSelected) {
      if (val == "login") {
        navigate("/face", {
          viewTransition: true,
        });
      } else {
        navigate("/invite", {
          viewTransition: true,
        });
      }
    } else {
      setIsOpenModule({
        visible: true,
        isLoginBtn: val,
      });
      setStyleCssFlag(false);
    }
  };
  const [isOpenModule, setIsOpenModule] = useState({
    visible: false,
    isLoginBtn: "Login",
  });
  // const handelOpen = (e: any, val: string) => {
  //   console.log(e);
  //   e.stopPropagation();
  //   setIsOpenModule({
  //     visible: true,
  //     isLoginBtn: val,
  //   });
  // };
  const [isSelected, setIsSelected] = useState(false);
  // 文本颜色未选择显示红色
  const [styleCssFlag, setStyleCssFlag] = useState(true);

  useEffect(() => {
    const timmer = setTimeout(() => {
      setStyleCssFlag(true);
    }, 500);
    return () => {
      clearTimeout(timmer);
    };
  }, [styleCssFlag]);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-4xl text-center ">
          <Image src={Logo} alt="logo" width="200" height="200"></Image>
        </div>
        <div className="flex flex-col items-center justify-between h-64 w-96">
          <div className="flex flex-col items-center justify-between h-32 w-52 relative ">
            <Button
              color="warning"
              size="lg"
              radius="full"
              className="w-52 mb-2 h-12 bg-gradient-to-tr from-[#53cfe0] to-[#0552b0] text-white shadow-lg "
              // variant="bordered"
              onPress={() => handelAuth("login")}>
              登录
            </Button>
            {/* <div
              className="absolute right-4 top-2"
              onClick={(e: any) => {
                handelOpen(e, "Login");
              }}>
              <CoinIcon />
            </div> */}

            <Button
              color="warning"
              size="lg"
              radius="full"
              onPress={() => handelAuth("register")}
              // variant="bordered"
              className="w-52 mb-2 h-12 bg-gradient-to-tr from-[#53cfe0] to-[#0552b0] text-white shadow-lg ">
              注册
            </Button>
            {/* <div
              className="absolute right-4 bottom-2"
              onClick={(e: any) => {
                handelOpen(e, "Register");
              }}>
              <CoinIcon />
            </div> */}
          </div>
          <div className="p-3 text-center text-self text-sm ">
            <p>
              请扫脸注册或登录您的账户。该过程将被安全处理且您的脸部数据将永远不会被存储在任何地方。
            </p>
          </div>
          <div className="p-3 text-center text-self text-sm ">
            <p className={!styleCssFlag ? "text-red-600" : "text-self"}>
              <Checkbox
                isSelected={isSelected}
                onValueChange={setIsSelected}
                defaultSelected
                color="primary"></Checkbox>
              勾选此框，即表示我已阅读并理解&nbsp;
              <Link href="#" underline="always" className={!styleCssFlag ? "text-red-600" : "text-self text-sm"}>
                隐私政策
              </Link>
              &nbsp;并同意接受&nbsp;
              <Link href="#" underline="always" className={!styleCssFlag ? "text-red-600" : "text-self text-sm"}>
                条款和条件
              </Link>
              <span className="text-red-500">*</span>
            </p>
          </div>
        </div>
        <div className="h-20">
          <SelectNational />
        </div>
        <contextOpen.Provider value={{ isOpenModule, setIsOpenModule }}>
          <ModuleTag />
        </contextOpen.Provider>
      </div>
    </>
  );
}
