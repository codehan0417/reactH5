import { NavLink } from "react-router-dom";
interface PropsType {
  toRoute: string; //跳转目标路由
  iconName: string; //tab名称
  svgIcon: any;
}

export default function IconLink(props: PropsType) {
  const { toRoute, iconName, svgIcon } = props;
  return (
    <>
      <NavLink to={toRoute}>
        <div className="flex flex-col justify-center items-center">
          {svgIcon}
          <span className="text-xs">{iconName}</span>
        </div>
      </NavLink>
    </>
  );
}
