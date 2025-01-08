import React, { useEffect, useState } from "react";
import { FaFileInvoice } from "react-icons/fa";
import { Get_Innofashion_Count } from "../../../Api/Innofashion/Invoice";
import { useDispatch, useSelector } from "react-redux";
import {
  Get_Notification_List,
  Get_Voijeans_Ageing_Count,
  Get_Voijeans_Count,
} from "../../../Api/Voi_Jeans/Invoice";
import { Formatamount } from "../../Common/RuppesFormat";
import "../../../App.css";
import { Tooltip } from "antd";
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
    // if (user_id === "INNO001") {
    Get_Innofashion_Count(dispatch);
    // } else {
    Get_Voijeans_Count(dispatch);
    Get_Voijeans_Ageing_Count(dispatch);
    // }
  }, []);
  console.log(Get_Voi__Ageing_Count, "Get_Voi__Ageing_Count");
  // const [amounts, setAmounts] = useState(() => {
  //   if (
  //     Get_Voi__Ageing_Count &&
  //     Get_Voi__Ageing_Count.TOTAL_NET_AMOUNT_30 != null
  //   ) {
  //     return [
  //       {
  //         TOTAL_NET_AMOUNT_30: Math.round(
  //           Get_Voi__Ageing_Count.TOTAL_NET_AMOUNT_30
  //         ),
  //         TOTAL_NET_AMOUNT_45: Math.round(
  //           Get_Voi__Ageing_Count.TOTAL_NET_AMOUNT_45
  //         ),
  //         TOTAL_NET_AMOUNT_60: Math.round(
  //           Get_Voi__Ageing_Count.TOTAL_NET_AMOUNT_60
  //         ),
  //         TOTAL_NET_AMOUNT_90: Math.round(
  //           Get_Voi__Ageing_Count.TOTAL_NET_AMOUNT_90
  //         ),
  //       },
  //     ];
  //   }
  //   return []; // Return empty array if data is not available
  // });

  // const [sortedAmounts, setSortedAmounts] = useState([]);

  // useEffect(() => {
  //   const fetchedAmounts = [
  //     {
  //       TOTAL_NET_AMOUNT_30: Math.round(
  //         Get_Voi__Ageing_Count.TOTAL_NET_AMOUNT_30
  //       ),
  //       TOTAL_NET_AMOUNT_45: Math.round(
  //         Get_Voi__Ageing_Count.TOTAL_NET_AMOUNT_45
  //       ),
  //       TOTAL_NET_AMOUNT_60: Math.round(
  //         Get_Voi__Ageing_Count.TOTAL_NET_AMOUNT_60
  //       ),
  //       TOTAL_NET_AMOUNT_90: Math.round(
  //         Get_Voi__Ageing_Count.TOTAL_NET_AMOUNT_90
  //       ),
  //     },
  //   ];

  //   setAmounts(fetchedAmounts);
  // }, []);

  // const sortAmountsDescendingList = () => {
  //   if (!amounts || amounts.length === 0) {
  //     return;
  //   }

  //   const amountsObject = amounts[0];

  //   const amountsArray = Object.entries(amountsObject)
  //     .map(([key, value]) => {
  //       if (value !== undefined && value !== null) {
  //         const parts = key.split("_");
  //         const day = parseInt(parts[parts.length - 1]);

  //         if (!isNaN(day)) {
  //           return { day, value };
  //         }
  //       }
  //       return null;
  //     })
  //     .filter((item) => item !== null);

  //   const sorted = amountsArray.sort((a, b) => b.value - a.value);

  //   setSortedAmounts(sorted);
  // };

  // useEffect(() => {
  //   console.log(amounts, "amountsamounts");

  //   sortAmountsDescendingList(); // Automatically sort when the component mounts or amounts changes
  // }, [amounts, Get_Voi__Ageing_Count]);

  // const formatNumber = (value) => {
  //   if (value === undefined || value === null || isNaN(value)) {
  //     return "Invalid value"; // You can replace this with a fallback message or default value
  //   }

  //   if (value >= 1000000) {
  //     return (value / 1000000).toFixed(1) + "m"; // For numbers greater than or equal to 1 million
  //   } else if (value >= 100000) {
  //     return (value / 1000).toFixed(1) + "k"; // For numbers greater than or equal to 100 thousand
  //   } else if (value >= 1000) {
  //     return (value / 1000).toFixed(1) + "k"; // For numbers greater than or equal to 1000
  //   } else {
  //     return value.toString(); // For numbers less than 1000
  //   }
  // };

  // const bgcolor = (day) => {
  //   if (day === 30) {
  //     return "#369FFF";
  //   } else if (day === 45) {
  //     return "#FF993A";
  //   } else if (day === 60) {
  //     return "#8AC53E";
  //   } else {
  //     return "#FFD143";
  //   }
  // };
  const [amounts, setAmounts] = useState([]);

  const [sortedAmounts, setSortedAmounts] = useState([]);
  console.log(sortedAmounts, "sortedAmounts");

  useEffect(() => {
    if (
      Get_Voi__Ageing_Count &&
      typeof Get_Voi__Ageing_Count === "object" &&
      Object.keys(Get_Voi__Ageing_Count).length > 0
    ) {
      const fetchedAmounts = [
        {
          TOTAL_NET_AMOUNT_30: Math.round(
            Number(Get_Voi__Ageing_Count.TOTAL_NET_AMOUNT_30) || 0
          ),
          TOTAL_NET_AMOUNT_45: Math.round(
            Number(Get_Voi__Ageing_Count.TOTAL_NET_AMOUNT_45) || 0
          ),
          TOTAL_NET_AMOUNT_60: Math.round(
            Number(Get_Voi__Ageing_Count.TOTAL_NET_AMOUNT_60) || 0
          ),
          TOTAL_NET_AMOUNT_90: Math.round(
            Number(Get_Voi__Ageing_Count.TOTAL_NET_AMOUNT_90) || 0
          ),
        },
      ];

      setAmounts(fetchedAmounts);
    } else {
      setAmounts([]); // Set to an empty array if data is invalid
    }
  }, [Get_Voi__Ageing_Count]);

  const sortAmountsDescendingList = () => {
    if (!amounts || amounts.length === 0) {
      return;
    }

    const amountsObject = amounts[0];

    const amountsArray = Object.entries(amountsObject)
      .map(([key, value]) => {
        if (value !== undefined && value !== null && !isNaN(value)) {
          const parts = key.split("_");
          const day = parseInt(parts[parts.length - 1]);

          if (!isNaN(day)) {
            return { day, value };
          }
        }
        return null;
      })
      .filter((item) => item !== null);

    const sorted = amountsArray.sort((a, b) => b.value - a.value);

    setSortedAmounts(sorted);
  };

  useEffect(() => {
    console.log(amounts, "amounts");
    sortAmountsDescendingList();
  }, [amounts, Get_Voi__Ageing_Count]);

  const formatNumber = (value) => {
    if (value === undefined || value === null || isNaN(value)) {
      return "Invalid value";
    }

    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "m";
    } else if (value >= 100000) {
      return (value / 1000).toFixed(1) + "k";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + "k";
    } else {
      return value.toString();
    }
  };

  const bgcolor = (day) => {
    if (day === 30) {
      return "#369FFF";
    } else if (day === 45) {
      return "#FF993A";
    } else if (day === 60) {
      return "#8AC53E";
    } else {
      return "#FFD143";
    }
  };
  useEffect(() => {
    Get_Notification_List(dispatch);
  }, []);
  console.log(sortedAmounts, "sortedAmounts");
  return (
    <div className="h-full w-full flex">
      <div className="w-[59%] h-full">
        <div className="grid grid-rows-3 gap-y-[0.5vw] w-full h-full pb-[2vw] px-[2vw]">
          <div className="row-span-1 h-full w-full ">
            <div className="h-[25%] flex items-center">
              <label className="text-[1.5vw] font-semibold text-gray-500 ">
                Invoices
              </label>
            </div>
            <div className="h-[75%]">
              <div className="grid grid-cols-3 w-full h-full gap-x-[2vw] ">
                <div className="col-span-1 relative flex bg-[#369FFF] rounded-[1vw] w-full h-full shadow-md shadow-gray-300">
                  <div className="flex flex-col justify-between pt-[0.5vw] pb-[1vw] px-[1vw]">
                    <label className="text-white text-[2.25vw] font-bold ">
                      {user_id === "INNO001"
                        ? Get_Voi_Count.total_invoices
                          ? Get_Voi_Count.total_invoices
                          : 0
                        : Get_Voi_Count.total_invoices
                        ? Get_Voi_Count.total_invoices
                        : 0}
                    </label>
                    <label className="text-white text-[1.4vw] font-bold ">
                      No of Invoices
                    </label>
                  </div>
                  <div className=" absolute right-[1vw] top-[1vw]">
                    <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
                      <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
                      <FaFileInvoice size={"2vw"} color="white" />
                    </div>
                  </div>
                </div>
                <Tooltip
                  color="#8AC53E"
                  title={
                    <span className="text-[1.5vw] font-bold px-[1vw] py-[0.2vw]">{`₹ ${Formatamount(
                      Math.round(Get_Voi_Count.total_net_amt)
                    )}`}</span>
                  }
                >
                  <div className="col-span-1 relative flex bg-[#8AC53E] rounded-[1vw] w-full h-full shadow-md shadow-gray-300">
                    <div className="flex flex-col justify-between pt-[0.5vw] pb-[1vw] px-[1vw]">
                      <label className="text-white text-[2.25vw] font-bold ">
                        {user_id === "INNO001"
                          ? Get_Voi_Count.total_net_amt
                            ? `₹ ${formatNumber(
                                Math.round(Get_Voi_Count.total_net_amt)
                              )}`
                            : 0
                          : Get_Voi_Count.total_net_amt
                          ? `₹ ${formatNumber(
                              Math.round(Get_Voi_Count.total_net_amt)
                            )}`
                          : 0}
                      </label>
                      <label className="text-white text-[1.4vw] font-bold ">
                        Total Value
                      </label>
                    </div>
                    <div className=" absolute right-[1vw] top-[1vw]">
                      <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
                        <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
                        <FaFileInvoice size={"2vw"} color="white" />
                      </div>
                    </div>
                  </div>
                </Tooltip>
                <>
                  <Tooltip
                    color="#FF993A"
                    title={
                      <span className="text-[1.5vw] font-bold px-[1vw] py-[0.2vw]">{`₹ ${Formatamount(
                        Math.round(Get_Voi_Count.total_advance_amt)
                      )}`}</span>
                    }
                  >
                    <div className="col-span-1 relative flex bg-[#FF993A] rounded-[1vw] w-full h-full shadow-md shadow-gray-300">
                      <div className="flex flex-col justify-between pt-[0.5vw] pb-[1vw] px-[1vw]">
                        <label className="text-white text-[2.25vw] font-bold ">
                          {user_id === "INNO001"
                            ? Get_Voi_Count.total_advance_amt
                              ? `₹ ${formatNumber(
                                  Math.round(Get_Voi_Count.total_advance_amt)
                                )}`
                              : 0
                            : Get_Voi_Count.total_advance_amt
                            ? `₹ ${formatNumber(
                                Math.round(Get_Voi_Count.total_advance_amt)
                              )}`
                            : 0}
                        </label>
                        <label className="text-white text-[1.4vw] font-bold ">
                          {user_id === "INNO001"
                            ? "Advance Paid"
                            : "Advance Received"}
                        </label>
                      </div>
                      <div className=" absolute right-[1vw] top-[1vw]">
                        <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
                          <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
                          <FaFileInvoice size={"2vw"} color="white" />
                        </div>
                      </div>
                    </div>
                  </Tooltip>
                </>
              </div>
            </div>
          </div>
          {/* <-----------------------------------> */}
          <div className="row-span-1 h-full w-full ">
            <div className="h-[25%] flex items-center">
              <label className="text-[1.5vw] font-semibold text-gray-500 ">
                Interest
              </label>
            </div>
            <div className="h-[75%]">
              <div className="grid grid-cols-2 w-full h-full gap-x-[2vw] ">
                <Tooltip
                  color="#8AC53E"
                  //   title={
                  //     <span className="text-[1.5vw] font-bold px-[1vw] py-[0.2vw]">{`₹ ${Formatamount(
                  //       Math.round(Get_Voi_Count.total_net_amt)
                  //     )}`}</span>
                  //   }
                >
                  <div className="col-span-1 relative flex bg-[#8AC53E] rounded-[1vw] w-full h-full shadow-md shadow-gray-300">
                    <div className="flex flex-col justify-between pt-[0.5vw] pb-[1vw] px-[1vw]">
                      <label className="text-white text-[2.25vw] font-bold ">
                        {user_id === "INNO001"
                          ? Get_Voi_Count.total_interest_closed
                            ? `₹ ${Formatamount(
                                Get_Voi_Count.total_interest_closed
                              )}`
                            : 0
                          : Get_Voi_Count.total_interest_closed
                          ? `₹ ${Formatamount(
                              Get_Voi_Count.total_interest_closed
                            )}`
                          : 0}
                      </label>
                      <label className="text-white text-[1.4vw] font-bold ">
                        {user_id === "INNO001"
                          ? "Interest Received"
                          : "Interest Paid"}
                      </label>
                    </div>
                    <div className=" absolute right-[1vw] top-[1vw]">
                      <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
                        <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
                        <FaFileInvoice size={"2vw"} color="white" />
                      </div>
                    </div>
                  </div>
                </Tooltip>
                <>
                  <Tooltip
                    color="#FF993A"
                    // title={
                    //   <span className="text-[1.5vw] font-bold px-[1vw] py-[0.2vw]">{`₹ ${Formatamount(
                    //     Math.round(Get_Voi_Count.total_advance_amt)
                    //   )}`}</span>
                    // }
                  >
                    <div className="col-span-1 relative flex bg-[#FF993A] rounded-[1vw] w-full h-full shadow-md shadow-gray-300">
                      <div className="flex flex-col justify-between pt-[0.5vw] pb-[1vw] px-[1vw]">
                        <label className="text-white text-[2.25vw] font-bold ">
                          {user_id === "INNO001"
                            ? Get_Voi_Count.total_interest_paid
                              ? `₹ ${Formatamount(
                                  Get_Voi_Count.total_interest_paid
                                )}`
                              : 0
                            : Get_Voi_Count.total_interest_paid
                            ? `₹ ${Formatamount(
                                Get_Voi_Count.total_interest_paid
                              )}`
                            : 0}
                        </label>
                        <label className="text-white text-[1.4vw] font-bold ">
                          {user_id === "INNO001"
                            ? "Interest Accrued till date"
                            : "Interest Unpaid till date"}
                        </label>
                      </div>
                      <div className=" absolute right-[1vw] top-[1vw]">
                        <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
                          <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
                          <FaFileInvoice size={"2vw"} color="white" />
                        </div>
                      </div>
                    </div>
                  </Tooltip>
                </>
              </div>
            </div>
          </div>
          {/* <-----------------------------------> */}
          <div className="row-span-1 h-full w-full ">
            <div className="h-[25%] flex items-center">
              <label className="text-[1.5vw] text-gray-500 font-semibold">
                Advance Request
              </label>
            </div>
            <div className="h-[75%]">
              <div className="grid grid-cols-3 w-full h-full gap-x-[2vw] ">
                <div className="col-span-1 relative flex bg-[#369FFF] rounded-[1vw] w-full h-full shadow-md shadow-gray-300">
                  <div className="flex flex-col justify-between pt-[0.5vw] pb-[1vw] px-[1vw]">
                    <label className="text-white text-[2.25vw] font-bold ">
                      {user_id === "INNO001"
                        ? Get_Voi_Count.requested_count
                          ? Get_Voi_Count.requested_count
                          : 0
                        : Get_Voi_Count.requested_count
                        ? Get_Voi_Count.requested_count
                        : 0}
                    </label>
                    <label className="text-white text-[1.4vw] font-bold ">
                      {user_id === "INNO001" ? "Pending " : "Requested "}
                    </label>
                  </div>
                  <div className=" absolute right-[1vw] top-[1vw]">
                    <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
                      <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
                      <FaFileInvoice size={"2vw"} color="white" />
                    </div>
                  </div>
                </div>
                <Tooltip
                  color="#8AC53E"
                  //   title={
                  //     <span className="text-[1.5vw] font-bold px-[1vw] py-[0.2vw]">{`₹ ${Formatamount(
                  //       Math.round(Get_Voi_Count.total_net_amt)
                  //     )}`}</span>
                  //   }
                >
                  <div className="col-span-1 relative flex bg-[#8AC53E] rounded-[1vw] w-full h-full shadow-md shadow-gray-300">
                    <div className="flex flex-col justify-between pt-[0.5vw] pb-[1vw] px-[1vw]">
                      <label className="text-white text-[2.25vw] font-bold ">
                        {user_id === "INNO001"
                          ? Get_Voi_Count.advance_paid_count
                            ? Get_Voi_Count.advance_paid_count
                            : 0
                          : Get_Voi_Count.advance_paid_count
                          ? Get_Voi_Count.advance_paid_count
                          : 0}
                      </label>
                      <label className="text-white text-[1.4vw] font-bold ">
                        Approved
                      </label>
                    </div>
                    <div className=" absolute right-[1vw] top-[1vw]">
                      <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
                        <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
                        <FaFileInvoice size={"2vw"} color="white" />
                      </div>
                    </div>
                  </div>
                </Tooltip>
                <>
                  <Tooltip
                    color="#FF993A"
                    // title={
                    //   <span className="text-[1.5vw] font-bold px-[1vw] py-[0.2vw]">{`₹ ${Formatamount(
                    //     Math.round(Get_Voi_Count.total_advance_amt)
                    //   )}`}</span>
                    // }
                  >
                    <div className="col-span-1 relative flex bg-[#ff3a3a] rounded-[1vw] w-full h-full shadow-md shadow-gray-300">
                      <div className="flex flex-col justify-between pt-[0.5vw] pb-[1vw] px-[1vw]">
                        <label className="text-white text-[2.25vw] font-bold ">
                          {user_id === "INNO001"
                            ? Get_Voi_Count.rejected_count
                              ? Get_Voi_Count.rejected_count
                              : 0
                            : Get_Voi_Count.rejected_count
                            ? Get_Voi_Count.rejected_count
                            : 0}
                        </label>
                        <label className="text-white text-[1.4vw] font-bold ">
                          Rejected
                        </label>
                      </div>
                      <div className=" absolute right-[1vw] top-[1vw]">
                        <div className="relative h-[4vw] w-[4vw] flex items-center  justify-center">
                          <div className="absolute inset-0 bg-white opacity-30 rounded-full pointer-events-none"></div>
                          <FaFileInvoice size={"2vw"} color="white" />
                        </div>
                      </div>
                    </div>
                  </Tooltip>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[41%] h-full relative">
        <div className="h-full border-l-[0.2vw] bg-[#F4F5FA] absolute left-0 top-0"></div>
        <div className="grid grid-rows-5 w-full h-full">
          <div className="row-span-3 w-full h-full">
            <div className="flex items-center justify-between px-[2vw] py-[1vw]">
              <label className="text-[1.5vw] font-semibold text-gray-500 ">
                Credit Period
              </label>
              {/* <div className="flex items-center gap-x-[1vw]">
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
              </div> */}
            </div>
            <div>
              <div className="grid grid-cols-2 w-full h-full gap-x-[3vw] gap-y-[1vw] px-[2vw]">
                <div className="col-span-1 rounded-[1vw] w-full h-full gap-[0.5vw] shadow-sm shadow-gray-300 flex flex-col px-[2vw] py-[1vw] bg-[#F4F5FA]">
                  <label className="text-[#8EA3B7] font-bold text-[1.3vw]">
                    30 Days
                  </label>
                  <div className="flex items-center justify-between">
                    <div className="w-[1vw] bg-[#369FFF] h-[2.5vw] rounded-t-[1vw] rounded-b-[1vw]"></div>
                    <label className="text-[#369FFF] text-[2.25vw] font-bold">
                      {Get_Voi__Ageing_Count.COUNT_30}
                    </label>
                  </div>
                </div>{" "}
                <div className="col-span-1 rounded-[1vw] w-full h-full gap-[0.5vw] shadow-sm shadow-gray-300 flex flex-col px-[2vw] py-[1vw] bg-[#F4F5FA]">
                  <label className="text-[#8EA3B7] font-bold text-[1.3vw]">
                    45 Days
                  </label>
                  <div className="flex items-center justify-between">
                    <div className="w-[1vw] bg-[#FF993A] h-[2.5vw] rounded-t-[1vw] rounded-b-[1vw]"></div>
                    <label className="text-[#FF993A] text-[2.25vw] font-bold">
                      {Get_Voi__Ageing_Count.COUNT_45}
                    </label>
                  </div>
                </div>{" "}
              </div>
              <div className="grid grid-cols-2 mt-[1vw] w-full h-full gap-x-[3vw] gap-y-[2vw] px-[2vw]">
                <div className="col-span-1 rounded-[1vw] w-full h-full gap-[0.5vw] shadow-sm shadow-gray-300 flex flex-col px-[2vw] py-[1vw] bg-[#F4F5FA]">
                  <label className="text-[#8EA3B7] font-bold text-[1.3vw]">
                    60 Days
                  </label>
                  <div className="flex items-center justify-between">
                    <div className="w-[1vw] bg-[#8AC53E] h-[2.5vw] rounded-t-[1vw] rounded-b-[1vw]"></div>
                    <label className="text-[#8AC53E] text-[2.25vw] font-bold">
                      {Get_Voi__Ageing_Count.COUNT_60}
                    </label>
                  </div>
                </div>{" "}
                <div className="col-span-1 rounded-[1vw] w-full h-full gap-[0.5vw] shadow-sm shadow-gray-300 flex flex-col px-[2vw] py-[1vw] bg-[#F4F5FA]">
                  <label className="text-[#8EA3B7] font-bold text-[1.3vw]">
                    90 Days
                  </label>
                  <div className="flex items-center justify-between">
                    <div className="w-[1vw] bg-[#FFD143] h-[2.5vw] rounded-t-[1vw] rounded-b-[1vw]"></div>
                    <label className="text-[#FFD143] text-[2.25vw] font-bold">
                      {Get_Voi__Ageing_Count.COUNT_90}
                    </label>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
          <div className="row-span-2">
            <div className="px-[2vw] relative">
              <Tooltip
                color={bgcolor(sortedAmounts[2]?.day)}
                title={
                  <span className="font-bold text-[1.5vw] p-[1vw]">
                    {`₹ ${Formatamount(sortedAmounts[2]?.value)}`}
                  </span>
                }
              >
                <div
                  style={{
                    borderColor: bgcolor(sortedAmounts[2]?.day),
                  }}
                  className="absolute left-[15vw] top-0 border-[0.15vw] h-[7.75vw] flex items-center justify-center w-[7.75vw] rounded-full"
                >
                  <div
                    style={{
                      background: bgcolor(sortedAmounts[2]?.day),
                    }}
                    className="p-[0.75vw] rounded-full flex items-center justify-center h-[7vw] w-[7vw]"
                  >
                    <label className="text-[1.4vw] text-white font-bold">{`${formatNumber(
                      sortedAmounts[2]?.value
                    )}`}</label>
                  </div>
                </div>
              </Tooltip>

              <Tooltip
                color={bgcolor(sortedAmounts[0]?.day)}
                title={
                  <span className="font-bold text-[1.5vw] p-[1vw]">{`₹ ${Formatamount(
                    sortedAmounts[0]?.value
                  )}`}</span>
                }
              >
                <div
                  style={{
                    borderColor: bgcolor(sortedAmounts[0]?.day),
                  }}
                  className=" absolute right-[4vw] top-0  border-[0.15vw] h-[10.75vw] flex items-center justify-center w-[10.75vw] rounded-full"
                >
                  <div
                    style={{
                      background: bgcolor(sortedAmounts[0]?.day),
                    }}
                    className={` p-[0.75vw] rounded-full flex items-center justify-center h-[10vw] w-[10vw]`}
                  >
                    <label className="text-[1.7vw] text-white font-bold">{`${formatNumber(
                      sortedAmounts[0]?.value
                    )}`}</label>
                  </div>
                </div>
              </Tooltip>
              <Tooltip
                color={bgcolor(sortedAmounts[3]?.day)}
                title={
                  <span className="font-bold text-[1.5vw] p-[1vw]">{`₹ ${Formatamount(
                    sortedAmounts[3]?.value
                  )}`}</span>
                }
              >
                <div
                  style={{
                    borderColor: bgcolor(sortedAmounts[3]?.day),
                  }}
                  className=" absolute left-[18vw] top-[8vw] border-[0.15vw] h-[6.75vw] flex items-center justify-center w-[6.75vw] rounded-full"
                >
                  <div
                    style={{
                      background: bgcolor(sortedAmounts[3]?.day),
                    }}
                    className={` p-[0.75vw] rounded-full flex items-center justify-center h-[6vw] w-[6vw]`}
                  >
                    <label className="text-[1.3vw] text-white font-bold">{`${formatNumber(
                      sortedAmounts[3]?.value
                    )}`}</label>
                  </div>
                </div>
              </Tooltip>
              <Tooltip
                color={bgcolor(sortedAmounts[1]?.day)}
                title={
                  <span className="font-bold text-[1.5vw] p-[1vw]">{`₹ ${Formatamount(
                    sortedAmounts[1]?.value
                  )}`}</span>
                }
              >
                <div
                  style={{
                    borderColor: bgcolor(sortedAmounts[1]?.day),
                  }}
                  className="absolute left-[7.5vw] top-[5.75vw]  border-[0.15vw] h-[8.5vw] flex items-center justify-center w-[8.75vw] rounded-full"
                >
                  <div
                    style={{
                      background: bgcolor(sortedAmounts[1]?.day),
                    }}
                    className={`p-[0.75vw] rounded-full flex items-center justify-center h-[8vw] w-[8vw]`}
                  >
                    <label className="text-[1.5vw] text-white font-bold">{`${formatNumber(
                      sortedAmounts[1]?.value
                    )}`}</label>
                  </div>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
