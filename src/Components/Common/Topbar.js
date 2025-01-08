import React, { useEffect, useState } from "react";
import profile from "../../Assets/profile.png";
import logo from "../../Assets/Logo.png";
import { useNavigate } from "react-router-dom";
import VOI_logo from "../../Assets/VOI_LOGO.png";
import innologo from "../../Assets/innlogo.png";
import { notification, Popover } from "antd";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { NotificationUpdate } from "../../Api/Voi_Jeans/Invoice";
import "../../App.css";
import { BiMessageSquareDetail } from "react-icons/bi";
import ModalPopup from "./Modal";
import AccountDetails from "../Inno_Invoice/AccountDetails/AccountDetails";
export default function Topbar() {
  const navigation = useNavigate();
  const user_id = sessionStorage.getItem("USER_ID");
  const text = <span>Title</span>;
  const [current, setCurrent] = useState(null);
  const [show, setShow] = useState(false);
  const content = (
    <div className="flex flex-col  w-[10vw] gap-y-[0.5vw]">
      <div
        className={`flex items-center gap-x-[0.5vw] cursor-pointer ${
          current === 1 ? "bg-gray-300" : ""
        }`}
        onMouseEnter={() => setCurrent(1)}
        onMouseLeave={() => setCurrent(null)}
        onClick={() => setShow(true)}
      >
        <span>
          <IoAddCircleOutline size={"1.2vw"} />
        </span>
        <p className="text-[1vw]">Add Account</p>
      </div>
      <div
        className={`flex items-center gap-x-[0.5vw] cursor-pointer ${
          current === 2 ? "bg-gray-300" : ""
        }`}
        onMouseEnter={() => setCurrent(2)}
        onMouseLeave={() => setCurrent(null)}
        onClick={() => {
          navigation(
            sessionStorage.getItem("USER_ID") === "VOIJ001" ? "/voijeans" : "/"
          );
          window.location.reload();
          sessionStorage.clear();
        }}
      >
        <span>
          <RiLogoutCircleRLine size={"1.1vw"} />
        </span>
        <p className="text-[1vw]">Logout</p>
      </div>
    </div>
  );
  const Get_Notification = useSelector((state) => state.akr.notification_list);
  const currentDate = new Date();
  const isoFormattedDate = currentDate.toISOString();
  const dispatch = useDispatch();
  const handlesubmit = (noti) => {
    NotificationUpdate(dispatch, true, noti.notification_id);
  };
  const notificationcontent = (
    <div className="w-full min-h-auto max-h-[20vw] overflow-y-scroll pr-[1vw]">
      {Get_Notification?.notifications?.length > 0 &&
        Get_Notification?.notifications?.map((noti, index) => (
          <>
            <div
              className="flex  gap-x-[1vw] cursor-pointer"
              onClick={() => handlesubmit(noti)}
            >
              {/* <div className="">
                <BiMessageSquareDetail size={"1.5vw"} />
              </div> */}
              <div
                key={index}
                className={`text-[0.8vw] ${
                  noti.is_read === true ? "text-gray-400" : ""
                } w-[15vw] pb-[0.5vw]`}
              >
                {noti.message}
              </div>
              <div
                className={`text-[0.9vw] ${
                  noti.is_read === true ? "text-gray-400" : ""
                }`}
              >
                {noti.created_at === isoFormattedDate
                  ? dayjs(noti.created_at).format("HH MM")
                  : dayjs(noti.created_at).format("DD MMM")}
              </div>
            </div>
          </>
        ))}
    </div>
  );
  console.log(Get_Notification, "Get_Notification");

  return (
    <div>
      <div
        className="h-[7vh] bg-custom-gradient flex justify-between px-[2vw] items-center w-full"
        // style={{
        //   background:
        //     "linear-gradient(179.69deg, #FFFFFF -9.21%, #4255FF 99.69%)",
        // }}
      >
        {/* <label className="text-[1.5vw] font-semibold pl-[2vw] ">Invoice</label> */}
        <div>
          {user_id === "VOIJ001" ? (
            <img src={VOI_logo} className="w-[10vw]" />
          ) : (
            // <img src={logo} className="w-[10vw]" />
            <div className="flex gap-x-[1vw] items-center">
              <img src={innologo} className="w-[7vw] h-[2.5vw]" />
              <label className="font-bold text-[1.8vw] pt-[0.75vw] tracking-wide uppercase">
                Innofashion
              </label>
            </div>
          )}
        </div>{" "}
        <div className="flex items-center gap-x-[1vw]">
          <Popover placement="bottom" content={notificationcontent}>
            <div className="relative cursor-pointer">
              <FaBell size={"2vw"} color="white" />
              {Get_Notification?.unread_count > 0 && (
                <div className=" absolute left-[-0.4vw] top-[-0.5vw]">
                  <div className="bg-red-500 w-[1.5vw] h-[1.5vw] rounded-full flex items-center justify-center">
                    <label className="text-[0.8vw] text-white">
                      {Get_Notification?.unread_count}
                    </label>
                  </div>
                </div>
              )}
            </div>
          </Popover>
          <Popover placement="bottom" content={content}>
            <div
              className="flex gap-x-[0.75vw] cursor-pointer"
              // onClick={() => {
              //   navigation(
              //     sessionStorage.getItem("USER_ID") === "VOIJ001"
              //       ? "/voijeans"
              //       : "/"
              //   );
              //   window.location.reload();
              //   sessionStorage.clear();
              // }}
            >
              <div className="flex flex-col w-full items-end ">
                <label className="text-[0.9vw] items-end text-white font-semibold">
                  {sessionStorage.getItem("User_name")}
                </label>
                <label className="text-[0.7vw] text-white">
                  {sessionStorage.getItem("User_email")}
                </label>
              </div>
              <img
                src={profile}
                alt="profile"
                className="w-[2.25vw] h-[2.25vw]"
              />
            </div>
          </Popover>
        </div>
      </div>
      <ModalPopup
        className="border border-[#3348FF] border-b-8 border-r-8 border-b-[#3348FF] border-r-[#3348FF] rounded-md"
        show={show}
        onClose={() => setShow(false)}
        height={"60vh"}
        width={"50vw"}
        closeicon={false}
        footer={null}
        radius={false}
      >
        <AccountDetails />
      </ModalPopup>
    </div>
  );
}
