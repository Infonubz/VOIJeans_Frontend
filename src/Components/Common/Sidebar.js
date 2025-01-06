import React, { useState } from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [currentModule, SetCurrentModule] = useState(1);
  const navigation = useNavigate();
  const handleOnClick = (id, module) => {
    SetCurrentModule(id);
    navigation(module);
  };
  return (
    <div
      className="bg-[#4255FF] w-[5vw] h-screen"
      // style={{
      //   background:
      //     "linear-gradient(179.69deg, #FFFFFF -9.21%, #4255FF 99.69%)",
      // }}
    >
      <div className=" flex flex-col  pl-[1vw] pt-[4vw]">
        <div
          className="py-[1vw] cursor-pointer flex items-center gap-x-[1vw]"
          onClick={() => handleOnClick(1, "/")}
        >
          <FaFileInvoiceDollar size={"2vw"} color="white" />
          {/* <label
            className={` text-white text-[1.1vw] cursor-pointer ${
              currentModule === 1
                ? "font-bold underline-offset-2 underline"
                : ""
            }`}
          >
            Invoice
          </label> */}
        </div>
        <div
          className="py-[1vw] cursor-pointer flex items-center gap-x-[1vw]"
          onClick={() => handleOnClick(2, "/request_management")}
        >
          <FaFileInvoiceDollar size={"2vw"} color="white" />
          {/* <label
            className={` text-white text-[1.1vw] cursor-pointer ${
              currentModule === 2
                ? "font-bold underline-offset-2 underline"
                : ""
            }`}
          >
            Request Management
          </label> */}
        </div>
        {/* <div className="py-[1vw]">
          <label className="text-white text-[1.2vw]">Invoice</label>
        </div>
        <div className="py-[1vw]">
          <label className="text-white text-[1.2vw]">Invoice</label>
        </div> */}
      </div>
    </div>
  );
}
