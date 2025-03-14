/*
 * @Author: hanlirong
 * @Date: 2025-02-17 15:36:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-28 17:07:25
 * @Description: 请填写简介
 */

import TabBar from "../components/tabBar";
import { Card, CardHeader, CardBody, Image, Button, CardFooter } from "@heroui/react";

export default function Home() {
  return (
    <>
      <div className="w-screen p-4">
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-100">UID：12 Tracks</small>
            <h4 className="font-bold text-xs">等级：Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            {/* <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://heroui.com/images/hero-card-complete.jpeg"
              width='100%'
            /> */}
          </CardBody>
        </Card>
        <Card className="mt-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            {/* <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-100">UID：12 Tracks</small> */}
            <h4 className="font-bold text-xs">资产</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://heroui.com/images/hero-card-complete.jpeg"
              width="100%"
            />
          </CardBody>
        </Card>
        <div className="flex justify-between flex-wrap">
          <Card isFooterBlurred className="border-none w-[45%] m-1" radius="lg">
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src="https://heroui.com/images/hero-card.jpeg"
              width='100%'
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Available soon.</p>
              <Button
                className="text-tiny text-white bg-black/20"
                color="default"
                radius="lg"
                size="sm"
                variant="flat">
                Notify me
              </Button>
            </CardFooter>
          </Card>
          <Card isFooterBlurred className="border-none w-[45%] m-1" radius="lg">
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src="https://heroui.com/images/hero-card.jpeg"
              width='100%'
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Available soon.</p>
              <Button
                className="text-tiny text-white bg-black/20"
                color="default"
                radius="lg"
                size="sm"
                variant="flat">
                Notify me
              </Button>
            </CardFooter>
          </Card>
          <Card isFooterBlurred className="border-none w-[45%] m-1" radius="lg">
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src="https://heroui.com/images/hero-card.jpeg"
              width='100%'
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Available soon.</p>
              <Button
                className="text-tiny text-white bg-black/20"
                color="default"
                radius="lg"
                size="sm"
                variant="flat">
                Notify me
              </Button>
            </CardFooter>
          </Card>
          <Card isFooterBlurred className="border-none w-[45%] m-1" radius="lg">
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src="https://heroui.com/images/hero-card.jpeg"
              width='100%'
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Available soon.</p>
              <Button
                className="text-tiny text-white bg-black/20"
                color="default"
                radius="lg"
                size="sm"
                variant="flat">
                Notify me
              </Button>
            </CardFooter>
          </Card>
          <Card isFooterBlurred className="border-none w-[45%] m-1" radius="lg">
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src="https://heroui.com/images/hero-card.jpeg"
              width='100%'
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Available soon.</p>
              <Button
                className="text-tiny text-white bg-black/20"
                color="default"
                radius="lg"
                size="sm"
                variant="flat">
                Notify me
              </Button>
            </CardFooter>
          </Card>
          <Card isFooterBlurred className="border-none w-[45%] m-1" radius="lg">
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src="https://heroui.com/images/hero-card.jpeg"
              width='100%'
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Available soon.</p>
              <Button
                className="text-tiny text-white bg-black/20"
                color="default"
                radius="lg"
                size="sm"
                variant="flat">
                Notify me
              </Button>
            </CardFooter>
          </Card>
          <Card isFooterBlurred className="border-none w-[45%] m-1" radius="lg">
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src="https://heroui.com/images/hero-card.jpeg"
              width='100%'
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Available soon.</p>
              <Button
                className="text-tiny text-white bg-black/20"
                color="default"
                radius="lg"
                size="sm"
                variant="flat">
                Notify me
              </Button>
            </CardFooter>
          </Card>
          <Card isFooterBlurred className="border-none w-[45%] m-1" radius="lg">
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src="https://heroui.com/images/hero-card.jpeg"
              width='100%'
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Available soon.</p>
              <Button
                className="text-tiny text-white bg-black/20"
                color="default"
                radius="lg"
                size="sm"
                variant="flat">
                Notify me
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <TabBar />
    </>
  );
}
