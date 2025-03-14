import { BackIcon } from "@/pages/face/index";
import { Input, Button } from "@heroui/react";
export default function InviteCode() {
  const handeRoute = () => {};

  return (
    <>
      <div className="h-full p-3 pt-9 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center text-2xl">
            <div>
              <BackIcon onClick={handeRoute} />
            </div>
            <span className="flex-1 text-center">推荐码(选填)</span>
          </div>
          <div className="m-3">
            <Input label="邀请码" type="推荐码" variant="bordered" />
          </div>
        </div>

        <div className="flex justify-between items-center mb-14">
          <Button
            color="primary"
            size="lg"
            radius="full"
            variant="bordered"
            className="w-44 mb-2 h-12 bg-gradient-to-tr text-white shadow-lg ">
            跳过
          </Button>
          <Button
            color="warning"
            size="lg"
            radius="full"
            // variant="bordered"
            className="w-44 mb-2 h-12 bg-gradient-to-tr from-[#53cfe0] to-[#0552b0] text-white shadow-lg ">
            继续
          </Button>
        </div>
      </div>
    </>
  );
}
