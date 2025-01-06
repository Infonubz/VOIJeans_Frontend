import React from "react";
import profile from "../../Assets/profile.png";
import logo from "../../Assets/Logo.png";
import { useNavigate } from "react-router-dom";
import VOI_logo from "../../Assets/VOI_LOGO.png";
export default function Topbar() {
  const navigation = useNavigate();
  const user_id = sessionStorage.getItem("USER_ID");
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
            <label className="font-bold text-[1.8vw]">Innofashion</label>
          )}
        </div>
        <div
          className="flex gap-x-[0.75vw] cursor-pointer"
          onClick={() => {
            navigation(
              sessionStorage.getItem("USER_ID") === "VOIJ001"
                ? "/voijeans"
                : "/"
            );
            window.location.reload();
            sessionStorage.clear();
          }}
        >
          <img src={profile} alt="profile" className="w-[2.25vw] h-[2.25vw]" />
          <div className="flex flex-col ">
            <label className="text-[0.9vw] text-white font-semibold">
              {sessionStorage.getItem("User_name")}
            </label>
            <label className="text-[0.7vw] text-white">
              {sessionStorage.getItem("User_email")}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
