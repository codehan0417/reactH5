/*
 * @Author: hanlirong
 * @Date: 2025-02-11 12:33:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-26 13:03:09
 * @Description: 路由表
 */

import { ComponentType, lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { LoginAction, LoginLoader, LogoutAction, RootLoader } from '../permission';

// eslint-disable-next-line react-refresh/only-export-components
const BasicsLayout = lazy(() => import('@/layouts/basics'));

type Module = {
  [keys in string]: () => Promise<{ default: ComponentType<any>; }>
}

/** 所有pages下页面文件 */
const pagesModules = import.meta.glob('@/pages/*/index.tsx') as unknown as Module;
/** 所有pages\*\router下嵌套页面文件 */
const nestModules = import.meta.glob('@/pages/*/router/*/index.tsx') as unknown as Module;
/** 所有页面文件 */
export const modules: Module = {
  ...pagesModules,
  ...nestModules
};

const routes: RouteObject[] = [
  {
    id: 'root',
    path: '/',
    loader: RootLoader,
    Component: BasicsLayout,
    children: []
  },
  {
    path: '/login',
    loader: LoginLoader,
    action: LoginAction,
    Component: lazy(modules[getPath('login')])
  },
  {
    path: '/face',
    loader: LoginLoader,
    action: LoginAction,
    Component: lazy(modules[getPath('face')])
  },
  {
    path: '/home',
    loader: LoginLoader,
    action: LoginAction,
    Component: lazy(modules[getPath('home')])
  },
  {
    path: '/faceRegean',
    loader: LoginLoader,
    action: LoginAction,
    Component: lazy(modules[getPath('faceCamera')])
  },
  {
    path: '/invite',
    loader: LoginLoader,
    action: LoginAction,
    Component: lazy(modules[getPath('inputInvite')])
  },
  {
    // logout路由只用来退出登录，不展示页面
    path: '/logout',
    action: LogoutAction,
    Component: lazy(modules[getPath('error')])
  },
  {
    path: '*',
    Component: lazy(modules[getPath('error')])
  }
];

export default routes;

/**
 * 获取页面路径
 * @param name
 * @returns
 */
export function getPath(name: string) {
  return `/src/pages/${name}/index.tsx`;
}