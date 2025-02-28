/*
 * @Author: hanlirong
 * @Date: 2025-02-28 15:57:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-28 16:21:59
 * @Description: 请填写简介
 */
import { Home, User, GridOutline, Miner, Reward } from "@/pages/components/iconList";
export const navBarList = [
  {
    toRoute: "/database", //跳转目标路由
    iconName: "Home", //tab名称
    svgIcon: Home,
  },
  {
    toRoute: "/mining", //跳转目标路由
    iconName: "Mining", //tab名称
    svgIcon: Miner,
  },
  {
    toRoute: "/reward", //跳转目标路由
    iconName: "Reward", //tab名称
    svgIcon: Reward,
  },
  {
    toRoute: "/application", //跳转目标路由
    iconName: "Application", //tab名称
    svgIcon: GridOutline,
  },
  {
    toRoute: "/profile", //跳转目标路由
    iconName: "Profile", //tab名称
    svgIcon: User,
  },
];
