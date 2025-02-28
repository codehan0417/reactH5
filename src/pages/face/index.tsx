/*
 * @Author: hanlirong
 * @Date: 2025-02-19 14:53:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-28 14:46:21
 * @Description: face
 */
import { Image, Button } from "@heroui/react";
import GiftImag from "@/assets/images/face_scan_black.gif";
import { useNavigate } from "react-router-dom";

export const BackIcon = (props: any) => {
  return (
    <svg
      aria-label="svg"
      aria-hidden="true"
      focusable="false"
      height="1em"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 25 25"
      color="#f5d698"
      width="1em"
      fontSize="1.5rem"
      fill=" currentcolor"
      transition=" fill 200ms cubic-bezier(0.4, 0, 0.2, 1)"
      {...props}>
      <path d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"></path>
    </svg>
  );
};
export default function FaceRecognitionTab() {
  const navigate = useNavigate();
  const backLogin = () => {
    navigate("/login", {
      viewTransition: true,
      flushSync: true,
    });
  };
  const handelFace = () => {
    navigate("/faceRegean", {
      viewTransition: true,
      flushSync: true,
    });
  };
  return (
    <>
      <div className="h-screen p-3 pt-9">
        <div className="flex items-center justify-center text-2xl">
          <BackIcon onClick={backLogin} />
          <span className="flex-1 text-center">登录</span>
        </div>
        <div className="p-2 flex flex-col  justify-between h-2/4">
          <div className="text-xl">
            <p>在ShinraShell，</p>你的脸就是你的账户！
          </div>
          <p className="text-base">即刻扫脸以创建/访问您的账户并领取$POY吧。</p>
          <div className="flex items-center justify-center">
            <Image className="w-44 h-44" src={GiftImag}></Image>
          </div>
          <div className="text-center m-8">
            <Button
              variant="bordered"
              color="primary"
              size="lg"
              radius="full"
              onPress={handelFace}>
              开始扫脸
            </Button>
          </div>
          <div>
            <p className="text-center text-sm text-self">
              请确保您没有戴墨镜或口罩遮挡脸部，若您对有色光线敏感请谨慎使用。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
