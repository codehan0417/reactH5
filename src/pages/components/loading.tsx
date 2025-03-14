/*
 * @Author: hanlirong
 * @Date: 2025-02-24 15:51:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-28 14:28:11
 * @Description: 请填写简介
 */

import "@/assets/style/loading.scss";
export default function LoadingNumber() {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-start w-screen pt-56">
        <div className="blobs">
          <div className="blob-center"></div>
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
        </div>
      </div>
      {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg> */}
    </>
  );
}
