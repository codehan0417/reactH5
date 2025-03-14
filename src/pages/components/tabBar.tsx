/*
 * @Author: hanlirong
 * @Date: 2025-02-11 13:02:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-28 17:09:00
 * @Description: tabBar组件
 */
// import LoadingNumber from "@/pages/components/loading.tsx";
import { Navbar, NavbarContent, NavbarItem } from "@heroui/react";
import IconLink from "@/pages/components/iconLink.tsx";
import { navBarList } from "@/common/navbar";
export default function TabBar() {
  return (
    <>
      <div className="fixed bottom-0 z-[1000]">
        <Navbar className="w-screen">
          <NavbarContent className="flex w-full justify-between gap-7" justify="center">
            {navBarList.map(link => {
              return (
                <NavbarItem key={link.iconName}>
                  <IconLink
                    toRoute={link.toRoute}
                    iconName={link.iconName}
                    svgIcon={<link.svgIcon />}
                  />
                </NavbarItem>
              );
            })}
          </NavbarContent>
        </Navbar>
      </div>
    </>
  );
}
