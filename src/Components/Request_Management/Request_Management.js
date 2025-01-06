import React from "react";
import { useNavigate } from "react-router-dom";

export default function Request_Management() {
  const navigation = useNavigate();
  return (
    <div className="flex h-full w-full items-center justify-center flex-col">
      {" "}
      <div className="flex w-full h-full items-center justify-center">
        <div className="flex flex-col">
          <label className="text-[2vw] font-bold">Request_Management</label>
          <button
            className="cursor-pointer bg-blue-950 text-white font-bold text-[1.2vw] px-[2vw] py-[0.5vw]"
            onClick={() => {
              navigation("/");
              window.location.reload();
              sessionStorage.removeItem("token");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
