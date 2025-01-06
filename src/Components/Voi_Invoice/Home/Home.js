import React, { useEffect, useState } from "react";
import { FaFileInvoice } from "react-icons/fa";
import { Get_Innofashion_Count } from "../../../Api/Innofashion/Invoice";
import { useDispatch, useSelector } from "react-redux";
import {
  Get_Voijeans_Ageing_Count,
  Get_Voijeans_Count,
} from "../../../Api/Voi_Jeans/Invoice";
import { Formatamount } from "../../Common/RuppesFormat";

export default function VoiHome() {
  const dispatch = useDispatch();
  const user_id = sessionStorage.getItem("USER_ID");
  const Get_Inno_Count = useSelector((state) => state.akr.inno_count);
  const Get_Voi_Count = useSelector((state) => state.akr.voi_count);
  const Get_Voi__Ageing_Count = useSelector(
    (state) => state.akr.voi_ageing_count
  );
  const [tab, setTab] = useState(1);
  useEffect(() => {
    if (user_id === "INNO001") {
      Get_Innofashion_Count(dispatch);
    } else {
      Get_Voijeans_Count(dispatch);
      Get_Voijeans_Ageing_Count(dispatch);
    }
  }, []);
  console.log(Get_Voi_Count?.total_invoices, "Get_Voi_Count");
  const buttonlist = ["All", "Day", "Week", "Month"];
  return (
    <div className="h-full w-full flex">
      {/* <div className="grid grid-cols-4 w-full h-[13vw] gap-x-[4vw] px-[2vw] py-[2vw]">
        <div className="rounded-[1vw] flex bg-[#FF9F1C] px-[1vw] items-center justify-between">
          <div className="w-[70%] h-full">
            <div className="flex flex-col">
              <label className="text-white text-[3vw] font-bold pt-[1vw]">
                {user_id === "INNO001"
                  ? Get_Inno_Count.four_make_payment_count
                  : Get_Voi_Count.requested_count}
              </label>
              <label className="text-white text-[1.2vw] font-bold ">
                Requested Invoice
              </label>
            </div>
          </div>
          <div className="w-[30%] pt-[2vw] pl-[1vw] h-full">
            <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
              <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
              <FaFileInvoice size={"2vw"} color="white" />
            </div>
          </div>
        </div>
        <div className="rounded-[1vw] flex bg-[#4460EF] px-[1vw] items-center justify-between">
          <div className="w-[70%] h-full">
            <div className="flex flex-col">
              <label className="text-white text-[3vw] font-bold pt-[1vw]">
                {user_id === "INNO001"
                  ? Get_Inno_Count.zero_make_payment_count
                  : Get_Voi_Count.request_count}
              </label>
              <label className="text-white text-[1.2vw] font-bold ">
                Total Invoice
              </label>
            </div>
          </div>
          <div className="w-[30%] pt-[2vw] pl-[1vw] h-full">
            <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
              <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
              <FaFileInvoice size={"2vw"} color="white" />
            </div>
          </div>
        </div>
        <div className="rounded-[1vw] flex bg-[#FF6B6B] px-[1vw] items-center justify-between">
          <div className="w-[70%] h-full">
            <div className="flex flex-col">
              <label className="text-white text-[3vw] font-bold pt-[1vw]">
                {user_id === "INNO001"
                  ? Get_Inno_Count.reject_count
                  : Get_Voi_Count.rejected_count}
              </label>
              <label className="text-white text-[1.2vw] font-bold ">
                Rejected Invoice
              </label>
            </div>
          </div>
          <div className="w-[30%] pt-[2vw] pl-[1vw] h-full">
            <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
              <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
              <FaFileInvoice size={"2vw"} color="white" />
            </div>
          </div>
        </div>
        <div className="rounded-[1vw] flex bg-[#4ECDC4] px-[1vw] items-center justify-between">
          <div className="w-[70%] h-full">
            <div className="flex flex-col">
              <label className="text-white text-[3vw] font-bold pt-[1vw]">
                {user_id === "INNO001"
                  ? Get_Inno_Count.approve_count
                  : Get_Voi_Count.advance_paid_count}
              </label>
              <label className="text-white text-[1.2vw] font-bold ">
                Approved Invoice
              </label>
            </div>
          </div>
          <div className="w-[30%] pt-[2vw] pl-[1vw] h-full">
            <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
              <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
              <FaFileInvoice size={"2vw"} color="white" />
            </div>
          </div>
        </div>
      </div> */}
      <div className="w-[60%] h-full">
        <div className="grid grid-rows-3 gap-y-[1vw] w-full h-full py-[1vw] pb-[1vw] pl-[2vw] pr-[4vw]">
          <div className="row-span-2  w-full h-full flex flex-col gap-[1vw] pb-[1vw]">
            {/* <label className="text-[1.2vw] font-semibold">Planning</label> */}
            <label className="text-[1.5vw] font-semibold text-gray-500 ">
              Invoices
            </label>
            <div className="grid grid-cols-2 w-full h-full gap-x-[2vw] gap-y-[2vw]">
              <div className="col-span-1 flex  py-[0.5vw] bg-[#369FFF] rounded-[1vw] w-full h-full shadow-md shadow-gray-300">
                <div className="w-[70%] pl-[1vw] h-full">
                  <div className="flex flex-col gap-y-[0.5vw]">
                    <label className="text-white text-[2.5vw] font-bold ">
                      {user_id === "INNO001"
                        ? Get_Inno_Count.four_make_payment_count
                          ? Get_Inno_Count.four_make_payment_count
                          : 0
                        : Get_Voi_Count.total_invoices
                        ? Get_Voi_Count.total_invoices
                        : 0}
                    </label>
                    <label className="text-white mt-[0.5vw] text-[1.3vw] font-bold ">
                      Total Invoice
                    </label>
                  </div>
                </div>
                <div className="w-[30%] flex  items-center justify-center h-full">
                  <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
                    <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
                    <FaFileInvoice size={"2vw"} color="white" />
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex   py-[0.5vw] bg-[#FF993A] rounded-[1vw] w-full h-full shadow-md shadow-gray-300">
                <div className="w-[70%] px-[1vw] h-full">
                  <div className="flex flex-col gap-y-[0.5vw]">
                    <label className="text-white text-[2.5vw] font-bold ">
                      {user_id === "INNO001"
                        ? Get_Inno_Count.four_make_payment_count
                          ? Get_Inno_Count.four_make_payment_count
                          : 0
                        : Get_Voi_Count.total_advance_amt
                        ? `₹ ${Formatamount(
                            Math.round(Get_Voi_Count.total_advance_amt)
                          )}`
                        : 0}
                    </label>
                    <label className="text-white mt-[0.5vw]  text-[1.3vw] font-bold ">
                      Total Advance Received
                    </label>
                  </div>
                </div>
                <div className="w-[30%] flex  items-center justify-center h-full">
                  <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
                    <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
                    <FaFileInvoice size={"2vw"} color="white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 w-full mt-[1vw] h-full gap-x-[2vw] gap-y-[2vw]">
              <div className="col-span-1 flex py-[0.5vw] bg-[#8AC53E] rounded-[1vw] w-full h-full shadow-md shadow-gray-300">
                <div className="w-[70%] px-[1vw] h-full">
                  <div className="flex flex-col gap-y-[0.5vw]">
                    <label className="text-white text-[2.5vw] font-bold ">
                      {user_id === "INNO001"
                        ? Get_Inno_Count.four_make_payment_count
                          ? Get_Inno_Count.four_make_payment_count
                          : 0
                        : Get_Voi_Count.total_net_amt
                        ? `₹ ${Formatamount(
                            Math.round(Get_Voi_Count.total_net_amt)
                          )}`
                        : 0}
                    </label>
                    <label className="text-white text-[1.3vw] mt-[0.5vw] font-bold ">
                      Total Invoice Value
                    </label>
                  </div>
                </div>
                <div className="w-[30%] flex  items-center justify-center h-full">
                  <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
                    <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
                    <FaFileInvoice size={"2vw"} color="white" />
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex  py-[0.5vw] bg-[#FFD143] rounded-[1vw] w-full h-full shadow-md shadow-gray-300">
                <div className="w-[70%] px-[1vw] h-full">
                  <div className="flex flex-col gap-y-[0.5vw]">
                    <label className="text-white text-[2.5vw] font-bold ">
                      {user_id === "INNO001"
                        ? Get_Inno_Count.four_make_payment_count
                          ? Get_Inno_Count.four_make_payment_count
                          : 0
                        : Get_Voi_Count.total_interest_amt
                        ? `₹ ${Formatamount(
                            Math.round(Get_Voi_Count.total_interest_amt)
                          )}`
                        : 0}
                    </label>
                    <label className="text-white mt-[0.5vw] text-[1.3vw] font-bold ">
                      Total Interest to be Paid
                    </label>
                  </div>
                </div>
                <div className="w-[30%] flex  items-center justify-center h-full">
                  <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
                    <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
                    <FaFileInvoice size={"2vw"} color="white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row-span-1  w-full h-full flex flex-col gap-[1vw]">
            <label className="text-[1.5vw] text-gray-500 font-semibold">
              Request Advance
            </label>

            <div className="grid grid-cols-3 w-full h-full gap-x-[2vw] gap-y-[2vw]">
              <div className="col-span-1 px-[1vw] py-[0.5vw] flex bg-[#369FFF] rounded-[1vw] w-full h-full shadow-md shadow-gray-300">
                <div className="w-[70%]  h-full">
                  <div className="flex flex-col">
                    <label className="text-white text-[2vw] font-bold ">
                      {user_id === "INNO001"
                        ? Get_Inno_Count.four_make_payment_count
                          ? Get_Inno_Count.four_make_payment_count
                          : 0
                        : Get_Voi_Count.requested_count
                        ? Get_Voi_Count.requested_count
                        : 0}
                    </label>
                    <label className="text-white text-[1.2vw] font-bold ">
                      Requested Invoice
                    </label>
                  </div>
                </div>
                <div className="w-[30%] flex  items-center justify-center h-full">
                  <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
                    <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
                    <FaFileInvoice size={"2vw"} color="white" />
                  </div>
                </div>
              </div>
              <div className="col-span-1 px-[1vw] py-[0.5vw] flex bg-[#8AC53E] rounded-[1vw] w-full h-full shadow-md shadow-gray-300">
                <div className="w-[70%]  h-full">
                  <div className="flex flex-col">
                    <label className="text-white text-[2vw] font-bold ">
                      {user_id === "INNO001"
                        ? Get_Inno_Count.four_make_payment_count
                          ? Get_Inno_Count.four_make_payment_count
                          : 0
                        : Get_Voi_Count.advance_paid_count
                        ? Get_Voi_Count.advance_paid_count
                        : 0}
                    </label>
                    <label className="text-white text-[1.2vw] font-bold ">
                      Approved Invoice
                    </label>
                  </div>
                </div>
                <div className="w-[30%] flex  items-center justify-center h-full">
                  <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
                    <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
                    <FaFileInvoice size={"2vw"} color="white" />
                  </div>
                </div>
              </div>
              <div className="col-span-1 px-[1vw] py-[0.5vw] flex bg-[#ff3a3a] rounded-[1vw] w-full h-full shadow-md shadow-gray-300">
                <div className="w-[70%]  h-full">
                  <div className="flex flex-col">
                    <label className="text-white text-[2vw] font-bold ">
                      {user_id === "INNO001"
                        ? Get_Inno_Count.four_make_payment_count
                          ? Get_Inno_Count.four_make_payment_count
                          : 0
                        : Get_Voi_Count.rejected_count
                        ? Get_Voi_Count.rejected_count
                        : 0}
                    </label>
                    <label className="text-white text-[1.2vw] font-bold ">
                      Rejected
                    </label>
                    <label className="text-white text-[1.2vw] font-bold ">
                      Invoice
                    </label>
                  </div>
                </div>
                <div className="w-[30%] flex  items-center justify-center h-full">
                  <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
                    <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
                    <FaFileInvoice size={"2vw"} color="white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 w-full mt-[1vw] h-full gap-x-[2vw] gap-y-[2vw]">
              {/* <div className="col-span-1 py-[0.5vw] flex bg-[#8AC53E] rounded-[1vw] w-full h-full shadow-md shadow-gray-300">
                <div className="w-[70%] px-[1vw] h-full">
                  <div className="flex flex-col">
                    <label className="text-white text-[2vw] font-bold ">
                      {user_id === "INNO001"
                        ? Get_Inno_Count.four_make_payment_count
                        : Get_Voi_Count.requested_count}
                    </label>
                    <label className="text-white text-[1.2vw] font-bold ">
                      Total Invoice
                    </label>
                  </div>
                </div>
                <div className="w-[30%] flex  items-center justify-center h-full">
                  <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
                    <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
                    <FaFileInvoice size={"2vw"} color="white" />
                  </div>
                </div>
              </div> */}
              {/* <div className="col-span-1 bg-[#FFD143] rounded-[1vw] w-full h-full shadow-md shadow-gray-300"></div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[40%] h-full relative">
        <div className="h-full border-l-[0.2vw] bg-[#F4F5FA] absolute left-0 top-0"></div>
        <div className="grid grid-rows-5 w-full h-full">
          <div className="row-span-3 w-full h-full">
            <div className="flex items-center justify-between px-[2vw] py-[1vw]">
              <label className="text-[1.5vw] font-semibold text-gray-500 ">
                Invoices Ageing
              </label>
              <div className="flex items-center gap-x-[1vw]">
                {buttonlist.map((item, i) => (
                  <button
                    className={`${
                      tab === i ? "text-[#369FFF] font-bold" : ""
                    } text-[0.9vw]`}
                    onClick={() => setTab(i)} // Wrap setTab in an arrow function
                    key={i} // Add a unique key to each item in the list
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 w-full h-full gap-x-[3vw] gap-y-[1vw] px-[2vw]">
                <div className="col-span-1 rounded-[1vw] w-full h-full gap-[0.5vw] shadow-sm shadow-gray-200 flex flex-col px-[2vw] py-[1vw] bg-[#EBF6FF]">
                  <label className="text-[#8EA3B7] text-[1vw]">30 Days</label>
                  <div className="flex items-center justify-between">
                    <div className="w-[1vw] bg-[#369FFF] h-[2.5vw] rounded-t-[1vw] rounded-b-[1vw]"></div>
                    <label className="text-[#006ED3] text-[2.5vw] font-bold">
                      {Get_Voi__Ageing_Count.COUNT_30}
                    </label>
                  </div>
                </div>{" "}
                <div className="col-span-1 rounded-[1vw] w-full h-full gap-[0.5vw] shadow-sm shadow-gray-200 flex flex-col px-[2vw] py-[1vw] bg-[#EBF6FF]">
                  <label className="text-[#8EA3B7] text-[1vw]">45 Days</label>
                  <div className="flex items-center justify-between">
                    <div className="w-[1vw] bg-[#369FFF] h-[2.5vw] rounded-t-[1vw] rounded-b-[1vw]"></div>
                    <label className="text-[#006ED3] text-[2.5vw] font-bold">
                      {Get_Voi__Ageing_Count.COUNT_45}
                    </label>
                  </div>
                </div>{" "}
              </div>
              <div className="grid grid-cols-2 mt-[2vw] w-full h-full gap-x-[3vw] gap-y-[2vw] px-[2vw]">
                <div className="col-span-1 rounded-[1vw] w-full h-full gap-[0.5vw] shadow-sm shadow-gray-200 flex flex-col px-[2vw] py-[1vw] bg-[#EBF6FF]">
                  <label className="text-[#8EA3B7] text-[1vw]">60 Days</label>
                  <div className="flex items-center justify-between">
                    <div className="w-[1vw] bg-[#369FFF] h-[2.5vw] rounded-t-[1vw] rounded-b-[1vw]"></div>
                    <label className="text-[#006ED3] text-[2.5vw] font-bold">
                      {Get_Voi__Ageing_Count.COUNT_60}
                    </label>
                  </div>
                </div>{" "}
                <div className="col-span-1 rounded-[1vw] w-full h-full gap-[0.5vw] shadow-sm shadow-gray-200 flex flex-col px-[2vw] py-[1vw] bg-[#EBF6FF]">
                  <label className="text-[#8EA3B7] text-[1vw]">90 Days</label>
                  <div className="flex items-center justify-between">
                    <div className="w-[1vw] bg-[#369FFF] h-[2.5vw] rounded-t-[1vw] rounded-b-[1vw]"></div>
                    <label className="text-[#006ED3] text-[2.5vw] font-bold">
                      {Get_Voi__Ageing_Count.COUNT_90}
                    </label>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
          <div className="row-span-2"></div>
        </div>
      </div>
    </div>
  );
}
