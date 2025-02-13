/*
 * @Author: hanlirong
 * @Date: 2025-02-11 13:02:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-13 12:58:28
 * @Description: 登录
 */
import { Button, Image } from "@heroui/react";
import React from "react";
import GifImag from "@/assets/images/coin.gif";
interface CoinIconProps {
  width?: number;
  height?: number;
  size?: string;
  alt?: string;
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
export default function Login() {
  return (
    <>
      <div className="flex flex-col items-center justify-end h-screen pb-36">
        <Button
          color="warning"
          size="sm"
          radius="full"
          className="w-24 mb-3 h-6 text-xs"
          variant="bordered"
          endContent={<CoinIcon />}>
          Login&nbsp;&nbsp;&nbsp;
        </Button>
        <Button
          color="warning"
          size="sm"
          radius="full"
          variant="bordered"
          className="w-24 h-6 text-xs"
          endContent={<CoinIcon />}>
          Register
        </Button>
      </div>
    </>
  );
}
