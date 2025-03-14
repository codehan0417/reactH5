/*
 * @Author: hanlirong
 * @Date: 2025-02-17 15:36:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-28 10:49:46
 * @Description: 请填写简介
 */
/**
 * 动态配置路由 ------ 这里是前端自己的动态路由
 *
 * @id 路由id 必填 且唯一
 * @index 是否是首页 index为true时不能配置children
 * @path 路由路径 index为true时可以不填
 * @component 路由组件 值为pages目录下文件夹名称
 *      嵌套路由时，目录结构应为pages\*\router\xx\index.tsx
 *      因为减少性能开销 页面规则只支持两种：pages\xx and pages\*\router\xx
 * @parent 父级路由path 默认为/
 * @handle 路由配置项 自定义
 * @protected 当前路由是否需要权限 默认true
 * @children 子路由
 *
 */
export const dynamicRoutes: App.Route[] = [
  {
    id: "Home",
    index: true,
    component: "home",
    parent:'/database',
    handle: {
      title: "首页",
      roles: ["admin", "other"],
    },
  },
  {
    id: "welcome",
    // index: true,
    protected:false,
    parent:'/database',
    component: "welcome",
    handle: {
      title: "欢迎页",
      // roles: ['admin', 'other']
    },
  },
  {
    id: "Home2",
    path: "home2",
    component: "home2",
    handle: {
      title: "首页",
      roles: ["admin", "other"],
    },
    protected: false,
    children: [
      {
        id: "Home3",
        path: "home3",
        component: "home/router/home3",
      },
    ],
  },
  {
    id: "User1",
    index: true,
    component: "home2",
    parent: "/user",
    handle: {
      title: "user",
      roles: ["admin", "other"],
    },
  },
  {
    id: "User3",
    path: "user3",
    component: "home",
    parent: "/user",
    handle: {
      title: "user",
      roles: ["admin", "other"],
    },
  },
  {
    id: "User4",
    path: "user4",
    component: "home/router/home3",
    parent: "/user",
    handle: {
      title: "user",
      roles: ["admin", "other"],
    },
    protected: false,
  },
];
