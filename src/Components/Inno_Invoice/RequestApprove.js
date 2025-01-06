import React, { useState } from "react";
import statusimg from "../../Assets/status.png";
import { useDispatch } from "react-redux";
import { InnofashionRequest } from "../../Api/Innofashion/Invoice";
import ModalPopup from "../Common/Modal";
import Transaction from "./Transaction";
export default function PaymentRequestApprove({
  invoiceno,
  setShowStatus,
  page,
  currentTab,
  fullamt,
  currentdata
}) {
  const dispatch = useDispatch();
  const [command, setCommand] = useState("");
  const [error, setError] = useState(false);
  const [transshow, setTransShow] = useState(false);
  const handlesubmit = (value) => {
    // if(value==1){

    // }else{

    // }
    console.log(command, ":command987452");
    if (value == 1) {
      setTransShow(true);
    } else {
      setError(false); // Hide the error
      InnofashionRequest(
        value,
        dispatch,
        invoiceno,
        page,
        command,
        setError,
        setCommand,
        currentTab,
        fullamt
      );
      setShowStatus(false);
    }
  };
  console.log(command, ":command987452");

  return (
    <>
      <div>
        <div className="bg-[#3348FF] flex items-center pl-[1vw] py-[0.5vw]">
          <label className="text-white text-[1.25vw] font-bold">
            {fullamt ? "Full Payment" : "Request Advance Payment"}
          </label>
        </div>
        <div className="flex items-center justify-center pt-[2vw]">
          <img src={statusimg} className="w-[7vw] h-[7vw]" />
        </div>
        <div className="px-[2vw] pb-[2.5vw] pt-[1vw] relative">
          <label className="text-[1.2vw] font-semibold mb-[1vw]">Command</label>
          <input
            type="text"
            placeholder="Enter Command"
            className="px-[1vw] w-full h-[2.5vw] outline-none border-[0.1vw] rounded-[0.5vw] border-gray-400"
            onChange={(e) => {
              setCommand(e.target.value);
              setError(e.target.value.trim() !== "");
            }}
          />
          {error === false && (
            <span className="text-[0.8vw] text-[#3348FF] absolute bottom-[1.2vw] left-[2vw]">
              {" "}
              Comments is required for Hold and Rejected
            </span>
          )}
        </div>
        <div className="flex items-center justify-center pb-[2vw] px-[2vw] gap-x-[2vw]">
          <button
            onClick={() => handlesubmit(1)}
            className="text-[#086700] bg-[#D6FFD3] py-[0.25vw] shadow-gray-400 shadow-md px-[1.5vw] text-[1vw] font-bold rounded-full cursor-pointer"
          >
            Approve
          </button>
          <button
            onClick={() => handlesubmit(2)}
            className="text-[#FFA600] bg-[#FFEDB4] py-[0.25vw] shadow-gray-400 shadow-md px-[1.5vw] text-[1vw] font-bold rounded-full cursor-pointer"
          >
            On Hold
          </button>
          <button
            onClick={() => handlesubmit(3)}
            className="text-[#EC1515] bg-[#FFC5C5] py-[0.25vw] shadow-gray-400 shadow-md px-[1.5vw] text-[1vw] font-bold rounded-full cursor-pointer"
          >
            Rejected
          </button>
        </div>
      </div>
      <ModalPopup
        className="border border-[#3348FF] border-b-8 border-r-8 border-b-[#3348FF] border-r-[#3348FF] rounded-md"
        show={transshow}
        onClose={() => setTransShow(false)}
        height="auto"
        width="45vw"
        closeicon={false}
        footer={null}
        radius={true}
      >
        {/* <PaymentRequestApprove
              invoiceno={invoiceno}
              setShowStatus={setShowStatus}
              page={"invoice"}
              currentTab={currentTab}
              fullamt={fullamt}
            /> */}
        <Transaction
          setShowStatus={setShowStatus}
          invoiceno={invoiceno}
          page={"advreq"}
          currentTab={currentTab}
          setTransShow={setTransShow}
          currentdata={currentdata}
        />
      </ModalPopup>
    </>
  );
}
