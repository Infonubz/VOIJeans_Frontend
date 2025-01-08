import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InvoiceTab from "./InvoiceTab";
import RequestedFun from "../Voi_Invoice/Requested/Requested";
import Innofashion_Invoice from "../Inno_Invoice/Invoice";
import Inno_Adv_Request from "../Inno_Invoice/Inno_Adv_Request/Inno_Adv_Req";
import Debit_Note from "./Debit_Note/Debit_Note";
import VoiHome from "./Home/Home";
import OutletBill from "../Inno_Invoice/OutletBill/Outletbill";

export default function Invoice() {
  const navigation = useNavigate();
  const [currentTab, SetCurrentTab] = useState(1);
  const user_id = sessionStorage.getItem("USER_ID");
  return (
    <div className="h-full w-full">
      <div className="bg-[#F4F5FA] h-[100vh] w-full pt-[4vw] pb-[4.5vw] px-[2vw] ">
        <div className="bg-[white] rounded-bl-[1vw] rounded-br-[1vw] rounded-tr-[1vw] w-full h-full border-[0.15vw] border-[#DEDEDE] relative">
          <div
            className="absolute left-[-0.1vw] top-[-3.5vw]"
            onClick={() => SetCurrentTab(1)}
          >
            <svg
              width="10vw"
              height="4vw"
              viewBox="0 0 222 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                zIndex: 2,
                position: "relative",
              }}
              className=" cursor-pointer"
            >
              <path
                d="M1.30957 20.6909C1.30957 10.1975 9.81616 1.69089 20.3096 1.69089H173.309C180.335 1.69089 186.787 5.56775 190.085 11.771L219.922 67.8871H1.30957V20.6909Z"
                fill={currentTab === 1 ? "white" : "#F4F5FA"}
                stroke="#DEDEDE"
                strokeWidth="2"
              />
              {/* <text
                x="48%"
                y="60%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#000"
                fontFamily="Arial, sans-serif"
                className="text-[1.5vw] "
              >
                Home
              </text> */}
            </svg>
            <label
              className="text-[1vw] cursor-pointer absolute left-[2.2vw] top-[1.2vw] "
              style={{
                zIndex: 2,
              }}
            >
              Dashboard
            </label>
          </div>
          {currentTab === 1 && (
            <div
              className=" absolute top-[-0.1vw] left-0 w-[9.785vw] border-[0.15vw] border-white"
              style={{
                zIndex: 3,
              }}
            ></div>
          )}
          <div
            className="absolute left-[9.5vw] top-[-3.5vw]"
            onClick={() => SetCurrentTab(2)}
          >
            <svg
              width="10vw"
              height="4vw"
              viewBox="0 0 222 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                zIndex: 1,
                position: "relative",
              }}
              className=" cursor-pointer"
            >
              <path
                d="M1.30957 20.6909C1.30957 10.1975 9.81616 1.69089 20.3096 1.69089H173.309C180.335 1.69089 186.787 5.56775 190.085 11.771L219.922 67.8871H1.30957V20.6909Z"
                fill={currentTab === 2 ? "white" : "#F4F5FA"}
                stroke="#DEDEDE"
                strokeWidth="2"
              />
              {/* <text
                x="48%"
                y="60%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#000"
                fontFamily="Arial, sans-serif"
                className="text-[1.5vw] "
              >
                Invoice
              </text> */}
            </svg>
            <label
              className="text-[1vw] cursor-pointer absolute left-[3.2vw] top-[1.2vw] "
              style={{
                zIndex: 2,
              }}
            >
              Invoice
            </label>
          </div>
          {currentTab === 2 && (
            <div
              className=" absolute top-[-0.1vw] left-[9.9vw] w-[9.4vw] border-[0.15vw] border-white"
              style={{
                zIndex: 3,
              }}
            ></div>
          )}
          <div
            className="absolute left-[19.35vw] top-[-3.5vw]"
            onClick={() => SetCurrentTab(3)}
          >
            <svg
              width="10vw"
              height="4vw"
              viewBox="0 0 222 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                zIndex: 1, // Lower zIndex ensures this SVG is behind
                position: "relative", // Explicitly sets the position for zIndex to work
              }}
              className=" cursor-pointer"
            >
              <path
                d="M1.30957 20.6909C1.30957 10.1975 9.81616 1.69089 20.3096 1.69089H173.309C180.335 1.69089 186.787 5.56775 190.085 11.771L219.922 67.8871H1.30957V20.6909Z"
                fill={currentTab === 3 ? "white" : "#F4F5FA"}
                stroke="#DEDEDE"
                strokeWidth="2"
              />
              {/* <text
                x="48%"
                y="60%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#000"
                fontFamily="Arial, sans-serif"
                className="text-[1.5vw] "
              >
                Adv. Request
              </text> */}
            </svg>
            <label
              className="text-[1vw] cursor-pointer absolute left-[1.8vw] top-[1.2vw] "
              style={{
                zIndex: 2,
              }}
            >
              Adv. Request
            </label>
          </div>
          <div
            className="absolute left-[29.2vw] top-[-3.5vw]"
            onClick={() => SetCurrentTab(4)}
          >
            <svg
              width="10vw"
              height="4vw"
              viewBox="0 0 222 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                zIndex: 1, // Lower zIndex ensures this SVG is behind
                position: "relative", // Explicitly sets the position for zIndex to work
              }}
              className=" cursor-pointer"
            >
              <path
                d="M1.30957 20.6909C1.30957 10.1975 9.81616 1.69089 20.3096 1.69089H173.309C180.335 1.69089 186.787 5.56775 190.085 11.771L219.922 67.8871H1.30957V20.6909Z"
                fill={currentTab === 4 ? "white" : "#F4F5FA"}
                stroke="#DEDEDE"
                strokeWidth="2"
              />
              {/* <text
                x="48%"
                y="60%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#000"
                fontFamily="Arial, sans-serif"
                className="text-[1.5vw] "
              >
                Debit Note
              </text> */}
            </svg>
            <label
              className="text-[1vw] cursor-pointer absolute left-[2.2vw] top-[1.2vw] "
              style={{
                zIndex: 2,
              }}
            >
              Debit Note
            </label>
          </div>
          {user_id === "INNO001" && (
            <>
              <div
                className="absolute left-[39.1vw] top-[-3.5vw]"
                onClick={() => SetCurrentTab(5)}
              >
                <svg
                  width="10vw"
                  height="4vw"
                  viewBox="0 0 222 69"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    zIndex: 1, // Lower zIndex ensures this SVG is behind
                    position: "relative", // Explicitly sets the position for zIndex to work
                  }}
                  className=" cursor-pointer"
                >
                  <path
                    d="M1.30957 20.6909C1.30957 10.1975 9.81616 1.69089 20.3096 1.69089H173.309C180.335 1.69089 186.787 5.56775 190.085 11.771L219.922 67.8871H1.30957V20.6909Z"
                    fill={currentTab === 5 ? "white" : "#F4F5FA"}
                    stroke="#DEDEDE"
                    strokeWidth="2"
                  />
                </svg>
                <label
                  className="text-[1vw] cursor-pointer absolute left-[2.2vw] top-[1.2vw] "
                  style={{
                    zIndex: 2,
                  }}
                >
                  Outlet Bill
                </label>
              </div>
              {/* <div
                className="absolute left-[49vw] top-[-3.5vw]"
                onClick={() => SetCurrentTab(6)}
              >
                <svg
                  width="10vw"
                  height="4vw"
                  viewBox="0 0 222 69"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    zIndex: 1, // Lower zIndex ensures this SVG is behind
                    position: "relative", // Explicitly sets the position for zIndex to work
                  }}
                  className=" cursor-pointer"
                >
                  <path
                    d="M1.30957 20.6909C1.30957 10.1975 9.81616 1.69089 20.3096 1.69089H173.309C180.335 1.69089 186.787 5.56775 190.085 11.771L219.922 67.8871H1.30957V20.6909Z"
                    fill={currentTab === 6 ? "white" : "#F4F5FA"}
                    stroke="#DEDEDE"
                    strokeWidth="2"
                  />
       
                </svg>
                <label
                  className="text-[1vw] cursor-pointer absolute left-[0.6vw] top-[1.2vw] "
                  style={{
                    zIndex: 2,
                  }}
                >
                  Outflow Payment
                </label>
              </div> */}
            </>
          )}
          {currentTab === 3 && (
            <div
              className=" absolute top-[-0.1vw] left-[19.5vw] w-[9.7vw] border-[0.15vw] border-white"
              style={{
                zIndex: 3,
              }}
            ></div>
          )}
          {currentTab === 4 && (
            <div
              className=" absolute top-[-0.1vw] left-[29.3vw] w-[9.75vw] border-[0.15vw] border-white"
              style={{
                zIndex: 3,
              }}
            ></div>
          )}

          {currentTab === 5 && user_id === "INNO001" && (
            <div
              className=" absolute top-[-0.1vw] left-[39.2vw] w-[9.75vw] border-[0.15vw] border-white"
              style={{
                zIndex: 3,
              }}
            ></div>
          )}
          {currentTab === 6 && user_id === "INNO001" && (
            <div
              className=" absolute top-[-0.1vw] left-[49.1vw] w-[9.75vw] border-[0.15vw] border-white"
              style={{
                zIndex: 3,
              }}
            ></div>
          )}
          {currentTab === 2 ? (
            user_id === "INNO001" ? (
              <Innofashion_Invoice />
            ) : (
              <InvoiceTab />
            )
          ) : currentTab === 3 ? (
            user_id === "INNO001" ? (
              <Inno_Adv_Request />
            ) : (
              <RequestedFun />
            )
          ) : (
            ""
          )}
          {currentTab === 4 ? <Debit_Note /> : ""}
          {currentTab === 1 && <VoiHome />}
          {currentTab === 5 && <OutletBill />}
        </div>
      </div>

      {/* <label className="text-[2vw] font-bold">Invoice</label>
      <button
        className="cursor-pointer  float-end bg-blue-950 text-white font-bold text-[1.2vw] px-[2vw] py-[0.5vw]"
        onClick={() => {
          window.location.reload();
          sessionStorage.removeItem("token");
        }}
      >
        Logout
      </button> */}
    </div>
  );
}
