import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";

export const SelectorIcon = (props: any) => {
  return (
    <svg
      aria-label="svg"
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      color="#53cfe0"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="1em"
      {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39"></path>
    </svg>
  );
};

export const nationalData = [
  { key: "english", label: "English" },
  { key: "china", label: "简体中文" },
];

export default function SelectNational() {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["china"]));
  const handelChange = (keys: any) => {
    if (keys.size == 0) {
      return;
    }
    setSelectedKeys(keys);
    console.log(keys);
  };
  return (
    <Select
      disableSelectorIconRotation
      className="w-80 h-14 bg-black border-gray-50"
      classNames={{
        listbox: "bg-[#101010]",
        popoverContent: "bg-[#101010]",
        base: "text-[#efd194]",
        trigger: "text-[#efd194] h-14",
        value: "text-[#efd194]",
      }}
      popoverProps={{
        classNames: {
          content: "bg-black ",
          backdrop: "bg-transparent",
        },
      }}
      listboxProps={{
        itemClasses: {
          base: "text-[#efd194] bg-transparent",
        },
      }}
      variant="bordered"
      selectedKeys={selectedKeys}
      defaultSelectedKeys={selectedKeys}
      aria-label="Select Language" // 添加标签
      labelPlacement="outside"
      onSelectionChange={handelChange}
      selectorIcon={<SelectorIcon />}>
      {nationalData.map(national => (
        <SelectItem className="h-14" key={national.key}>
          {national.label}
        </SelectItem>
      ))}
    </Select>
  );
}
