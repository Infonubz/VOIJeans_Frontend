import React from "react";
import logingif from "../../Assets/login.gif";
import half from "../../Assets/half.png";
import Innofashion from "./Innofashion";

export default function Innofashion_Login({ setForgotPassword }) {
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
          <Innofashion />
        </div>
      </div>
    </>
  );
}
