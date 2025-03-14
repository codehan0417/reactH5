import { SVGProps } from "react";

/*
 * @Author: hanlirong
 * @Date: 2025-02-28 15:10:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-28 16:27:08
 * @Description: iconSvg
 */
export function Home(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="2em"
      height="2em"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        d="M12.391 4.262a1 1 0 0 0-1.46.035l-6.177 6.919a1 1 0 0 0-.254.666V19.5a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V16a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3.5a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7.591a1 1 0 0 0-.287-.7z"
      ></path>
    </svg>
  )
}

export function User(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="2em"
      height="2em"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 9.5v-2a3 3 0 1 1 6 0v2a3 3 0 0 1-1.5 2.599v1.224a1 1 0 0 0 .629.928l2.05.82A3.69 3.69 0 0 1 18.5 18.5h-13c0-1.51.92-2.868 2.321-3.428l2.05-.82a1 1 0 0 0 .629-.929v-1.224A3 3 0 0 1 9 9.5"
      ></path>
    </svg>
  )
}

// 矿工
export function Miner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="2em"
      height="2em"
      {...props}
    >
      <g fill="none" stroke="currentColor">
        <path d="M6.413 18.406a1.197 1.197 0 0 1 0-1.812A8.47 8.47 0 0 1 12 14.5c2.139 0 4.093.79 5.587 2.094a1.197 1.197 0 0 1 0 1.812A8.47 8.47 0 0 1 12 20.5a8.47 8.47 0 0 1-5.587-2.094ZM8.521 8.5c.194 2.25 1.677 4 3.479 4s3.285-1.75 3.479-4z"></path>
        <path
          d="M16 8q0 .254-.024.5H8.024A5 5 0 0 1 8 8c0-2.485 1.79-4.5 4-4.5s4 2.015 4 4.5Zm-4-1a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
          clipRule="evenodd"
        ></path>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 8.5h10"></path>
      </g>
    </svg>
  )
}
// 应用
export function GridOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="2em"
      height="2em"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.5 9.5v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1m8 0v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1m0 8v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1m-8 0v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1"
      ></path>
    </svg>
  )
}

export function Reward(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="2em"
      height="2em"
      {...props}
    >
      <g fill="none" stroke="currentColor">
        <path strokeLinecap="round" d="M8 20.5h9.5a1 1 0 0 0 1-1V6"></path>
        <path
          d="M5 4.075A1.07 1.07 0 0 1 6.066 3h9.444a1.07 1.07 0 0 1 1.066 1.075v13.41a1.07 1.07 0 0 1-1.066 1.075H6.066A1.07 1.07 0 0 1 5 17.485zm3.222 10.213a.79.79 0 0 1 0-1.256a4.2 4.2 0 0 1 2.566-.875c.965 0 1.855.326 2.566.875a.79.79 0 0 1 0 1.256a4.2 4.2 0 0 1-2.566.876a4.2 4.2 0 0 1-2.566-.876Zm2.564-2.884c1.096 0 1.985-1.12 1.985-2.504c0-1.382-.889-2.503-1.985-2.503S8.8 7.517 8.8 8.9s.888 2.504 1.985 2.504Z"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  )
}




