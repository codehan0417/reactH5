/*
 * @Author: hanlirong
 * @Date: 2025-02-20 12:54:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-28 17:11:36
 * @Description: 请填写
 */
import { Modal, ModalContent, ModalHeader, ModalBody, Link } from "@heroui/react";
import { useContext } from "react";
import { contextOpen } from "..";
import { useNavigate } from "react-router-dom";
export const Retain = (props: any) => {
  return (
    <svg
      width="1em"
      height="1em"
      display="inline-block"
      fill="currentcolor"
      fontSize="1.5rem"
      color="rgb(245, 214, 152)"
      fontWeight="700"
      transition="fill 200ms cubic-bezier(0.4, 0, 0.2, 1)"
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true"
      data-testid="ArrowCircleRightOutlinedIcon"
      {...props}>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10M4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8-8-3.58-8-8m12 0-4 4-1.41-1.41L12.17 13H8v-2h4.17l-1.59-1.59L12 8z"></path>
    </svg>
  );
};
export const CloseIcon = (props: any) => {
  return (
    <svg
      width="1em"
      height="1em"
      display="inline-block"
      fill="currentcolor"
      fontSize="1.5rem"
      color="rgb(245, 214, 152)"
      fontWeight="700"
      transition="fill 200ms cubic-bezier(0.4, 0, 0.2, 1)"
      focusable="false"
      viewBox="0 0 24 24"
      {...props}
      data-testid="CloseIcon">
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
  );
};

export default function ModuleTag() {
  const { isOpenModule, setIsOpenModule } = useContext(contextOpen);
  const navigate = useNavigate();
  const onClose = () => {
    setIsOpenModule({
      visible: false,
      isLoginBtn: isOpenModule.isLoginBtn,
    });
  };
  const handelLink = () => {
    // navigate("/face");
    navigate("/home",{
      viewTransition:true
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpenModule.visible}
        placement={"center"}
        scrollBehavior={"inside"}
        size={"xs"}
        classNames={{
          body: "py-8",
          backdrop: "backdrop-opacity-40",
          base: "border-[#292f46] bg-[#2d2d2d] dark:bg-[#19172c] text-[#fff] text-[0.75rem] h-[20rem]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}>
        <ModalContent>
          <>
            <ModalHeader>{isOpenModule.isLoginBtn}</ModalHeader>
            <ModalBody className="gap-10">
              {isOpenModule.isLoginBtn == "Login" ? (
                <>
                  <p>扫脸登录您的账户。记得铸造并领取本月的币。</p>

                  <p>面部数据与隐私</p>
                  <p>
                    您的脸部数据将仅用于创建账户和铸币，绝不会用于其他任何目的，也不会存储在任何地方。
                  </p>
                </>
              ) : (
                <>
                  <p>扫脸创建新账户，并每月创造一定数量的币。</p>
                  <p>
                    The first million users will build 10x more tokens than later
                    participants.
                  </p>

                  <p>Biomatrix强调个体的独特性，因此每个人只能创建一个账户。</p>
                </>
              )}
              <p>
                如需更多信息，请访问
                <Link
                  href="#"
                  underline="always"
                  className="text-[#fff] text-[0.75rem]">
                  隐私政策
                </Link>
              </p>
              <p>
                继续即表示您同意
                <Link
                  href="#"
                  underline="always"
                  className="text-[#fff] text-[0.75rem]">
                  条款和条件
                </Link>
                和
                <Link
                  href="#"
                  underline="always"
                  className="text-[#fff] text-[0.75rem]">
                  隐私政策
                </Link>
              </p>
            </ModalBody>
            <button onClick={handelLink} className="absolute bottom-3 right-3">
              <Retain />
            </button>
            <button onClick={onClose} className="absolute top-3 right-3">
              <CloseIcon />
            </button>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
