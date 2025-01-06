import React, { useState } from "react";
import logingif from "../../Assets/login.gif";
import half from "../../Assets/half.png";
import Voi_Jeans from "./Voi_Jeans";
import Voi_Jeans_Password from "../ForgotPassword/Voi_Jeans";

export default function Voi_Jeans_Login({}) {
  const [forgotpassword, setForgotPassword] = useState(false);
  return (
    <>
      <div className="flex w-screen h-screen items-center justify-center">
        <div className="w-[55%] h-screen relative flex justify-center items-center">
          <div className="absolute right-[10vw]">
            <img
              src={logingif}
              className="w-[37vw] h-[37vw] rounded-full"
              style={{
                zIndex: 2,
                position: "relative",
              }}
            />
          </div>
          <div className="absolute right-0 top-0">
            <img
              src={half}
              className="h-[100vh] w-[38vw]"
              style={{
                zIndex: 1,
                position: "relative",
              }}
            />
          </div>
        </div>

        <div className="w-[45%]  h-full flex items-center justify-center">
          {forgotpassword ? (
            <Voi_Jeans_Password setForgotPassword={setForgotPassword} />
          ) : (
            <Voi_Jeans setForgotPassword={setForgotPassword} />
          )}
        </div>
        {/* <div className="flex flex-col">
          <label className="text-[2vw] font-bold">AKR Login</label>
          <button
            className="cursor-pointer bg-blue-950 text-white font-bold text-[1.2vw] px-[2vw] py-[0.5vw]"
            onClick={() => {
              // navigation("/");
              window.location.reload();
              sessionStorage.setItem("token", 1511515);
            }}
          >
            Login
          </button>
        </div> */}
      </div>
    </>
  );
}
