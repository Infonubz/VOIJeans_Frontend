import dayjs from "dayjs";
import React, { useState } from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { VoiJeansRequest } from "../../Api/Voi_Jeans/Invoice";
import { Radio } from 'antd'; 

export default function RequestStatus({ setShowStatus }) {
  const Get_Voijeans_list = useSelector((state) => state?.akr?.voi_jeans_by_id);
  const [SelectedPercentage, SetSelectedPercentage] = useState(10);
  const percentage = [10, 20, 30, 40, 50, 60, 70];
  const [reqamt, setReqAmt] = useState(null);
  const ReqAmount = (percentage) => {
    const reqamt =
      (Get_Voijeans_list?.net_amount) * percentage / 100;
    const formattedAmount = new Intl.NumberFormat("en-IN").format(
      Math.round(reqamt)
    );
    return formattedAmount;
  };
  const Formatamount = (amt) => {
    const formattedAmount = new Intl.NumberFormat("en-IN").format(amt);
    return formattedAmount;
  };
  const dispatch = useDispatch();
  const handleReqSubmit = () => {
    VoiJeansRequest(
      Get_Voijeans_list,
      SelectedPercentage,
      (Get_Voijeans_list?.net_amount * SelectedPercentage) / 100,
      dispatch,
      creditValue
    );
    setShowStatus(false);
  };
  console.log(Get_Voijeans_list, "Get_Voijeans_list7410");
  const [creditValue, setCreditPeriod] = useState(30);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setCreditPeriod(e.target.value);
  };
 
  return (
    <div>
      <div className="bg-[#3348FF] flex items-center h-[6vh]">
        <label className="text-[white] text-[1.1vw]  font-semibold pl-[1vw]">
          Request Advance Payment
        </label>
      </div>
      <div className="grid grid-cols-4 py-[1vw] px-[2vw]">
        <div className="col-span-1 ">
          <div className="flex flex-col gap-y-[0.5vw]">
            <label className="text-[1vw] ">Invoice No</label>
            <label className="text-[0.8vw] font-semibold">
              {Get_Voijeans_list?.invoice_no}
            </label>
          </div>
        </div>
        <div className="col-span-2 ">
          <div className="flex flex-col gap-y-[0.5vw]">
            <label className="text-[1vw] ">Shipper Name</label>
            <label className="text-[0.8vw] font-semibold">
              {Get_Voijeans_list?.party_branch_name}
            </label>
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <div className="flex flex-col gap-y-[0.5vw]">
            <label className="text-[1vw] ">Biller Name</label>
            <label className="text-[0.8vw] uppercase font-semibold">
              Innofashion
            </label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 px-[2vw] py-[1vw]">
        <div className="col-span-1 flex ">
          <div className="flex flex-col gap-y-[0.5vw]">
            <label className="text-[1vw] ">Invoice Date</label>
            <label className="text-[0.8vw] font-semibold">
              {dayjs(Get_Voijeans_list?.invoice_date).format("DD MMM, YYYY")}
            </label>
          </div>
        </div>
        <div className="col-span-2 flex ">
          <div className="flex flex-col gap-y-[0.5vw]">
            <label className="text-[1vw]">Credit Period (Days)</label>
            <div className="flex gap-x-[1vw]">
              <Radio.Group onChange={onChange} value={creditValue} className="flex gap-x-[1vw] custom-radio">
                <Radio  value={30}>30</Radio>
                <Radio value={45}>45</Radio>
                <Radio value={60}>60</Radio>
                <Radio value={90}>90</Radio>
                <Radio value={120}>120</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex  flex items-center justify-center">
          <div className="flex flex-col gap-y-[0.5vw]">
            <label className="text-[1vw] ">Current Date</label>
            <label className="text-[0.8vw] font-semibold">
              {dayjs(new Date()).format("DD MMM, YYYY")}
            </label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 pt-[1vw] pb-[1vw] px-[2vw]">
        <div className="col-span-1">
          <div className="flex flex-col gap-y-[0.5vw]">
            <label className="text-[1vw] ">Invoice Amount</label>
            <label className="text-[1vw] font-bold">{`₹ ${Formatamount(
              Math.round(Get_Voijeans_list?.net_amount)
            )}`}</label>
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex flex-col gap-y-[0.5vw]">
            <label className="text-[1vw] ">Advance Percentage</label>
            <div className="flex gap-x-[0.5vw]">
              {percentage.map((item) => (
                <div
                  className="flex w-[3vw] rounded-[0.25vw] cursor-pointer  border-[0.1vw] border-[#3348FF]"
                  onClick={() => SetSelectedPercentage(item)}
                >
                  <div
                    className={`${
                      SelectedPercentage === item ? "" : "w-[10%]"
                    } rounded-tl-[0.1vw] cursor-pointer rounded-bl-[0.1vw] bg-[#3348FF]`}
                  ></div>
                  <label
                    className={`${
                      SelectedPercentage === item ? "w-[100%]" : "w-[90%]"
                    }  text-center font-semibold cursor-pointer text-[0.8vw] p-[0.1vw] ${
                      SelectedPercentage === item
                        ? "bg-[#3348FF] pl-[0.1vw] text-white"
                        : "text-[#3348FF] "
                    }  `}
                  >{`${item}%`}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1 flex items-center justify-center">
          <div className="flex flex-col gap-y-[0.5vw]">
            <label className="text-[1vw] ">Req Amount</label>
            <label className="text-[1vw] font-bold">{`₹ ${ReqAmount(
              SelectedPercentage
            )}`}</label>
          </div>
        </div>
      </div>
      <div className="mt-[1vw]">
        <div className="flex float-end px-[2vw]  pb-[2vw]  gap-x-[1vw]">
          <div
            className="border-[#FF9797] rounded-full w-[8vw] py-[0.1vw] px-[0.1vw] border-[0.1vw] cursor-pointer"
            onClick={() => setShowStatus(false)}
          >
            <button className="bg-[#FF9797]  py-[0.2vw] justify-center w-full rounded-full  cursor-pointer">
              <span className="flex items-center justify-center gap-x-[0.5vw]">
                <label className="text-[1vw]  text-white  font-bold cursor-pointer">
                  Cancel
                </label>
              </span>
            </button>
          </div>
          <div className="border-[#3348FF] rounded-full w-[8vw] py-[0.1vw] px-[0.1vw] border-[0.1vw] cursor-pointer">
            <button
              className="bg-[#3348FF]  py-[0.2vw] justify-center w-full rounded-full  "
              onClick={() => handleReqSubmit()}
            >
              <span className="flex items-center justify-center gap-x-[0.5vw] cursor-pointer">
                <label className="text-[1vw]  text-white  font-bold cursor-pointer">
                  Request
                </label>
                <span>
                  <MdOutlineDoubleArrow size={"1.3vw"} color="white" />
                </span>
                {/* <label className="">
                <span className="relative">
                  <svg
                    width="0.6vw"
                    height="0.8vw"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className=" absolute left-0 top-0"
                  >
                    <path
                      d="M7.81079 6.29792L0.707327 12.274L0.707327 0.321842L7.81079 6.29792Z"
                      fill="white"
                    />
                  </svg>
                  <svg
                    width="0.7vw"
                    height="0.9vw"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className=" absolute left-[0.3vw] top-[-0.1vw]"
                  >
                    <path
                      d="M7.81079 6.29792L0.707327 12.274L0.707327 0.321842L7.81079 6.29792Z"
                      fill="white"
                    />
                  </svg>
                  <svg
                    width="0.8vw"
                    height="1vw"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className=" absolute left-[0.6vw] top-[-0.2vw]"
                  >
                    <path
                      d="M7.81079 6.29792L0.707327 12.274L0.707327 0.321842L7.81079 6.29792Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </label> */}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
