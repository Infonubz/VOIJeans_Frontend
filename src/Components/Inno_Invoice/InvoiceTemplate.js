import React, { useEffect, useRef, useState } from "react";
import Logo from "../../Assets/VoiLogo.jpg";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { ConfigProvider, Table } from "antd";
import { Formatamount } from "../Common/RuppesFormat";
import "../../App.css";
import { Get_Voijeans_Status_By_Id } from "../../Api/Voi_Jeans/Invoice";
import InvoiceProductList from "../Voi_Invoice/InvoiceProductList";
import { useReactToPrint } from "react-to-print";
import LOGO from "../../Assets/innlogo.png";
import { html2pdf } from "html2pdf.js";
import { jsPDF } from "jspdf";
import { RiBillLine } from "react-icons/ri";
import { TbFileInvoice } from "react-icons/tb";
import { Get_Transaction_By_Id } from "../../Api/Innofashion/Invoice";

export default function InnoInvoiceTemplate({
  currentdata,
  page,
  setCurrentTabTemp,
  currentTabTemp,
  modal
}) {
  const Get_Voijeans_list = useSelector((state) => state.akr.voi_jeans_by_id);
  const Get_Transaction = useSelector((state) => state.akr.transaction_byid);
  const Get_Voijeans_hsncode = useSelector(
    (state) => state?.akr?.voi_jeans_hsn_code
  );
  const Get_Innofashion_list = useSelector(
    (state) => state.akr.innofashion_list
  );
  // print
  // const contentRef = useRef < HTMLDivElement > null;
  // const reactToPrintFn = useReactToPrint({ contentRef });
  ///
  // useEffect(() => {
  //   reactToPrintFn();
  //   console.log("dchgdhcjdbsjc");

  // }, [currentdata]);
  console.log(currentdata, "currentdatacurrentdata");
  const columns = [
    {
      title: <span className="text-[0.9vw]">S. No</span>,
      key: "id",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingss", row.id);
        return (
          <>
            <label className="text-[0.8vw]">{i + 1}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">HSN</span>,
      key: "hsn_code",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingsstestingss", row.hsn_code);
        return (
          <>
            <label className="text-[0.8vw]">{row.hsn_code}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">Total Qty</span>,
      key: "total_qty",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingss", row.id);
        return (
          <>
            <label className="text-[0.8vw]">{` ${row.total_qty}`}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">CGST%</span>,
      key: "cgst",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingsss_qty", row.cgst);
        return (
          <>
            <label className="text-[0.8vw]">{row.cgst}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">SGST%</span>,
      key: "sgst",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingss", row.sgst);
        return (
          <>
            <label className="text-[0.8vw]">{row.sgst}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">IGST%</span>,
      key: "igst",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingss", row.igst);
        return (
          <>
            <label className="text-[0.8vw]">{row.igst}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">Taxable Amount</span>,
      key: "tax_amt",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingss", row.tax_amt);
        return (
          <>
            <label className="text-[0.8vw]">{row.tax_amt}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">IGST Amount</span>,
      key: "igst_amt",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingss", row.igst_amt);
        return (
          <>
            <label className="text-[0.8vw]">{row.igst_amt}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">Net Amount</span>,
      key: "net_amt",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingss", row.net_amt);
        return (
          <>
            <label className="text-[0.8vw]">{row.net_amt}</label>
          </>
        );
      },
    },
  ];
  console.log(Get_Voijeans_hsncode, "Get_Voijeans_hsncode");
  const terms = [
    "Payment requested by cross payees A/c Cheque only.",
    "Unless otherwise started all prices are strictly net.",
    "Our responsibility ceases on delivery of the goods to angadia carriers motor transport, rail or post.",
    "Goods supplied to order will not be accepted back.",
    "The Cause of action shall be deemed to arised in Mumbai disputed shall be settled in Mumbai.",
    "Interest @ of 24%per annum will be charged on bills remaining.",
  ];
  const footer = () => (
    <tr>
      <td></td> {/* Empty cell for the first column */}
      <td>Total Amount:</td>
    </tr>
  );
  const content = [
    "Any Disputes or Differences whatsoever arising between the Parties relating to this contract shall be subject to jurisdiction of Conciliation & Arbitration Sub Committee for settlement in accordance with Rules for Conciliation of The Clothing Manufacturers Association of India and if not Resolved then shall be referred to Arbitration in accordance with the rules Arbitration of The Indian Merchant Chambers as per MOU between CMAI and IMC and award made in pursuance thereof shall be Final and binding on the Parties.",
  ];
  console.log(Get_Innofashion_list, "Get_Innofashion_listGet_Innofashion_list");
  const printRef = useRef();
  const handlePrint = () => {
    console.log(contentRef.current); // Check if this is the correct DOM element
    const doc = new jsPDF({
      unit: "mm",
      format: [1117.6, 800],
    });

    const content =
      currentTabTemp === 1 ? contentRef.current : advanceref.current;

    const scaleFactor = 0.8;

    doc.html(content, {
      callback: function (doc) {
        doc.save(
          `${
            currentTabTemp === 1
              ? currentdata?.in_invoice_no
              : `Advance-${currentdata.voi_invoice_no}`
          }.pdf`
        );
      },
      x: 10,
      y: 10,
      html2canvas: {
        scale: scaleFactor,
      },
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentTabTemp === 2) {
      console.log(currentdata, "currentdata");

      Get_Transaction_By_Id(dispatch, currentdata?.voi_invoice_no);
    }
  }, [currentTabTemp]);
  // const [currentTab, setCurrentTab] = useState(1)
  const contentRef = useRef();
  const advanceref = useRef();
  console.log(currentTabTemp, "currentTabTemp");

  return (
    <>
      <div className="h-[100vh] w-full">
        <div className="px-[2vw] flex justify-between  py-[1vw]">
          <div className="flex">
            {" "}
            {page === "invoice" ? (
              <>
                <button
                  className={`${
                    currentTabTemp === 1
                      ? "border-[#3348FF] text-[#3348FF] font-bold border-b-[0.2vw]"
                      : ""
                  } text-[1.2vw] w-[15vw] flex items-center justify-center gap-x-[1vw]`}
                  onClick={() => setCurrentTabTemp(1)}
                >
                  <span>
                    <TbFileInvoice
                      color={currentTabTemp === 1 ? "#3348FF" : ""}
                      size={"1.2vw"}
                    />
                  </span>
                  <span>Invoice</span>
                </button>
                {/* {modal === "" && ( */}
                  <button
                    className={`${
                      currentTabTemp === 2
                        ? "border-[#3348FF] text-[#3348FF] font-bold border-b-[0.2vw]"
                        : ""
                    } text-[1.2vw] w-[15vw] flex items-center justify-center gap-x-[1vw]`}
                    onClick={() => setCurrentTabTemp(2)}
                  >
                    <span>
                      <RiBillLine
                        color={currentTabTemp === 2 ? "#3348FF" : ""}
                        size={"1.2vw"}
                      />
                    </span>
                    <span>Bill</span>
                  </button>
                {/* )} */}
              </>
            ) : (
              ""
            )}
          </div>
          <div>
            {" "}
            <button
              className="bg-[#3348FF] w-[10vw] rounded-[1vw] text-[1vw] font-semibold cursor-pointer text-white py-[0.25vw]"
              onClick={handlePrint}
            >
              Download PDF
            </button>
          </div>
        </div>
        {currentTabTemp === 1 ? (
          <div
            className="h-full w-full scrollbar-hide  overflow-y-scroll"
            ref={contentRef}
          >
            <div className="px-[2vw]">
              <div className="grid grid-cols-5">
                {/* <div>
              <label className="text-[1.5vw] font-semibold">Invoice</label>
              <div className="flex mt-[0.5vw] gap-x-[2vw]">
                <label className="text-[#737982] text-[1vw]">Invoice No:</label>
                <label className="text-[1vw]">
                  {Get_Voijeans_list.invoice_no}
                </label>
              </div>
              <div className="flex mt-[0.5vw] gap-x-[1.4vw]">
                <label className="text-[#737982] text-[1vw]">
                  Invoice Date:
                </label>
                <label className="text-[1vw]">
                  {dayjs(Get_Voijeans_list.invoice_date).format("DD MMM, YYYY")}
                </label>
              </div>
            </div> */}
                <div className="col-span-3 flex border-dashed border-[0.15vw] rounded-[0.5vw] border-[#E8EAED] gap-x-[0.5vw]">
                  <div className="flex items-center border-dashed border-r-[0.15vw] border-[#E8EAED]">
                    <img src={LOGO} className="w-[10vw] p-[0.5vw]" />
                  </div>
                  <div className="gap-y-[0.5vw] h-full  mt-[0.3vw]">
                    <label className="text-[0.9vw] font-semibold">
                      Innofashion
                    </label>
                    <div className="flex items-center flex-col">
                      {/* <label>Warehouse:</label> */}
                      <label className="text-[0.9vw]">
                        SAK NAGAR, TN SF NO-61/2PART,THOTTIPALAYAM VILLAGE ZONE,
                        TIRUPUR-641603.
                      </label>
                    </div>
                    <div className="flex items-center gap-x-[0.5vw]">
                      <label className="text-[#737982] text-[0.9vw]">
                        GSTIN:
                      </label>
                      <label className="text-[0.9vw]">33AAGCI9374J1Z5</label>
                    </div>
                    <div className="flex items-center gap-x-[0.8vw]">
                      <label className="text-[#737982] text-[0.9vw]">
                        Email:
                      </label>
                      <label className="text-[0.9vw]">
                        INNO.DB@innofashion.IN
                      </label>
                    </div>
                    <div className="flex items-center gap-x-[0.5vw]">
                      <label className="text-[#737982] text-[0.9vw]">
                        Phone:
                      </label>
                      <label className="text-[0.9vw]">9121760868</label>
                    </div>
                    {/* <div className="flex items-center">
                  <label>Warehouse:</label>
                  <label>
                    No. D-3/4/A -3/10/11/S-43/44/45, Peb Building1St Phase,
                    Doddaballapura Industrial Area, Kasaba Hobli Bengaluru North
                    Taluk, Dod Ballapur-561203 , Karnataka
                  </label>
                </div> */}
                  </div>
                </div>
                <div className="col-span-2 float-left   w-full h-full ">
                  <div className="gap-y-[0.5vw] h-full w-full flex flex-col items-end">
                    <label className="text-[2vw] font-semibold">Invoice</label>

                    <div className="flex items-center gap-x-[0.5vw]">
                      <label className="text-[0.9vw] text-[#737982]">
                        Invoice Date:
                      </label>
                      <label className="text-[0.9vw]">
                        {dayjs(Get_Voijeans_list?.invoice_date).format(
                          "DD MMM, YYYY"
                        )}
                      </label>
                    </div>
                    <div className="flex items-center gap-x-[0.5vw]">
                      <label className="text-[0.9vw] text-[#737982]">
                        Invoice No:
                      </label>
                      <label className="text-[0.9vw]">
                        {currentdata?.in_invoice_no}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[1vw]">
                <div className="grid grid-cols-2 gap-x-[3vw] ">
                  <div className="col-span-1">
                    <div className="flex flex-col gap-y-[0.5vw] ">
                      <label className="text-[#3348FF] text-[1.1vw] font-semibold">
                        Bill To
                      </label>
                      <label className="text-[0.9vw] font-bold">
                        TIPSY TOPSY VIZAYANAGARAM-C2999AP -VIZAYANAGARAM
                      </label>
                      <label className="text-[0.9vw]">
                        305, 3rd Floor Orion mall, Bengaluru, Karnataka, India -
                        560055
                      </label>
                      <div className="flex  gap-x-[0.5vw]">
                        <label className="text-[#737982] text-[0.9vw]">
                          Email:
                        </label>
                        <label className="text-[0.9vw]">
                          info@studioden.com
                        </label>
                      </div>
                      <div className="flex  gap-x-[0.5vw]">
                        <label className="text-[#737982] text-[0.9vw]">
                          Mobile:
                        </label>
                        <label className="text-[0.9vw]">+91 98765 43210</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 ">
                    <div className="flex flex-col gap-y-[0.5vw] ">
                      <label className="text-[#3348FF] text-[1.1vw] font-semibold">
                        Ship To
                      </label>
                      <label className="text-[0.9vw] font-bold">
                        TIPSY TOPSY VIZAYANAGARAM-C2999AP -VIZAYANAGARAM
                      </label>
                      <label className="text-[0.9vw]">
                        305, 3rd Floor Orion mall, Bengaluru, Karnataka, India -
                        560055
                      </label>
                      <div className="flex  gap-x-[0.5vw]">
                        <label className="text-[#737982] text-[0.9vw]">
                          Email:
                        </label>
                        <label className="text-[0.9vw]">
                          info@studioden.com
                        </label>
                      </div>
                      <div className="flex  gap-x-[0.5vw]">
                        <label className="text-[#737982] text-[0.9vw]">
                          Mobile:
                        </label>
                        <label className="text-[0.9vw]">+91 98765 43210</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[1.5vw] mb-[0.5vw]">
                <label className="text-[#3348FF] text-[1.2vw] font-bold">
                  Product List
                </label>
              </div>
              <div className="">
                <InvoiceProductList invoice_no={Get_Voijeans_list.invoice_no} />
              </div>
              <div className="mt-[1.5vw] mb-[0.5vw]">
                <label className="text-[#3348FF] text-[1.2vw] font-bold">
                  Taxable Amount
                </label>
              </div>
              <div className="">
                <ConfigProvider
                  theme={{
                    components: {
                      Table: {
                        // Customize hover styles
                        rowHoverBg: "rgb(255, 255, 255, 0)",
                        rowSelectedBg: "rgb(255, 255, 255, 0)",
                        rowSelectedHoverBg: "rgb(255, 255, 255, 0)",
                        borderRadius: "2vw", // Row border-radius
                        shadowHover: "0 4px 6px rgba(0, 0, 0, 0.15)", // Shadow for hover
                        //shadowSelected: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for selected
                      },
                    },
                  }}
                >
                  <Table
                    className="custom-table-invoice"
                    style={{
                      "--border-bottom": "1px solid #B1B9FF",
                      "--border-right": "1px solid #B1B9FF",
                    }}
                    summary={(pageData) => {
                      return (
                        <tr>
                          <td></td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "0.8vw",
                              padding: "0",
                              fontWeight: "bold",
                            }}
                          >
                            GRAND TOTAL
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "0.8vw",
                              padding: "0",
                              fontWeight: "bold",
                            }}
                          >
                            {Math.round(Get_Voijeans_hsncode?.total_qty)}
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "0.8vw",
                              padding: "0",
                              fontWeight: "bold",
                            }}
                          >
                            {Get_Voijeans_hsncode?.total_tax_amt}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "0.8vw",
                              padding: "0",
                              fontWeight: "bold",
                            }}
                          >
                            {Get_Voijeans_hsncode?.total_igst_amt}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "0.8vw",
                              padding: "0",
                              fontWeight: "bold",
                            }}
                          >
                            {Get_Voijeans_hsncode?.total_net_amt}
                          </td>
                        </tr>
                      );
                    }}
                    columns={columns}
                    pagination={false}
                    dataSource={Get_Voijeans_hsncode?.hsn_list}
                    rowClassName={(record, index) => `custom-row-${index}`}
                  />
                </ConfigProvider>
              </div>
              {/* <div className="mt-[2vw] px-[1vw] ">
            <thead className="flex pl-[1vw] rounded-t-[1vw] bg-[#3348FF] py-[0.5vw] text-[1vw] text-white ">
              <th className="w-[5%]  flex items-center justify-center">S.No</th>
              <th className="w-[25%]  flex items-center justify-center">
                Product List
              </th>
              <th className="w-[20%]  flex items-center justify-center">
                Description
              </th>
              <th className="w-[5%]  flex items-center justify-center">S</th>
              <th className="w-[5%]  flex items-center justify-center">M</th>
              <th className="w-[5%]  flex items-center justify-center">L</th>
              <th className="w-[5%]  flex items-center justify-center">XL</th>
              <th className="w-[5%]  flex items-center justify-center">XXL</th>
              <th className="w-[5%]  flex items-center justify-center">Qty</th>
              <th className="w-[10%]  flex items-center justify-center">
                Rate
              </th>
              <th className="w-[10%]  flex items-center justify-center">
                Total
              </th>
            </thead>
            <tbody className="border-[0.1vw] border-[#E2E5E9]">
              <tr className="flex border-l-[0.1vw] border-r-[0.1vw] border-b-[0.1vw] border-[#E2E5E9]">
                <td className="flex flex-col w-[40%] p-[1vw]">
                  <label className="text-[1vw] font-bold">UX Strategy</label>
                  <label className="text-[0.9vw]">
                    Create and send unlimited professional invoices for free.
                    Use our unique features to collect payments faster.
                  </label>
                </td>
                <td className="w-[20%] flex items-center justify-center text-[0.9vw]">
                  1
                </td>
                <td className="w-[20%] flex items-center justify-center text-[0.9vw]">
                  $500
                </td>
                <td className="w-[20%] flex items-center justify-center text-[0.9vw]">
                  $500
                </td>
              </tr>
              <tr className="flex border-l-[0.1vw] border-r-[0.1vw] border-b-[0.1vw] border-[#E2E5E9]">
                <td className="flex flex-col w-[40%] p-[1vw]">
                  <label className="text-[1vw] font-bold">UX Strategy</label>
                  <label className="text-[0.9vw]">
                    Create and send unlimited professional invoices for free.
                    Use our unique features to collect payments faster.
                  </label>
                </td>
                <td className="w-[20%] flex items-center justify-center text-[0.9vw]">
                  1
                </td>
                <td className="w-[20%] flex items-center justify-center text-[0.9vw]">
                  $500
                </td>
                <td className="w-[20%] flex items-center justify-center text-[0.9vw]">
                  $500
                </td>
              </tr>
            </tbody>
          </div> */}
              <div>
                <div className="grid grid-cols-2  mt-[1vw]">
                  <div className="col-span-1 mt-[2vw]">
                    {/* <div className="flex flex-col gap-y-[0.5vw]">
                  <label className="text-[#3348FF] text-[1.1vw] font-semibold">
                    Bank Account Details
                  </label>
                  <div className="flex  gap-x-[6vw]">
                    <label className="text-[#737982] text-[0.9vw]">
                      Bank Name:
                    </label>
                    <label className="text-[0.9vw]">HDFC Bank</label>
                  </div>
                  <div className="flex  gap-x-[1.7vw]">
                    <label className="text-[#737982] text-[0.9vw]">
                      Account Holder Name:
                    </label>
                    <label className="text-[0.9vw]">Foobar Labs</label>
                  </div>
                  <div className="flex  gap-x-[3.7vw]">
                    <label className="text-[#737982] text-[0.9vw]">
                      Account Number:
                    </label>
                    <label className="text-[0.9vw]">45366287987</label>
                  </div>
                  <div className="flex  gap-x-[8.75vw]">
                    <label className="text-[#737982] text-[0.9vw]">IFSC:</label>
                    <label className="text-[0.9vw]">HDFC0018159</label>
                  </div>
                  <div className="flex  gap-x-[5.1vw]">
                    <label className="text-[#737982] text-[0.9vw]">
                      Account Type:
                    </label>
                    <label className="text-[0.9vw]">Savings</label>
                  </div>
                </div> */}
                  </div>
                  <div className="col-span-1 mt-[1vw] flex">
                    <div className="w-[20%]"></div>
                    <div className="w-[80%]  flex h-full flex-col pr-[2vw]">
                      <div className="grid grid-cols-2 gap-y-[1vw] h-full w-full">
                        <div className="col-span-1">
                          <div className="flex flex-col w-full gap-y-[0.5vw]">
                            <label className=" text-[0.9vw] font-semibold">
                              Gross Amount:
                            </label>
                            <label className=" text-[0.9vw] font-semibold">
                              Total IGST (5%):
                            </label>
                            <label className=" text-[0.9vw] font-semibold">
                              Total TCS:
                            </label>
                          </div>
                        </div>
                        <div className="col-span-1 ">
                          <div className="flex flex-col items-end gap-y-[0.5vw]">
                            <label className=" text-[0.9vw] font-semibold">{`${Formatamount(
                              Get_Voijeans_list.total_amount
                            )}`}</label>
                            <label className=" text-[0.9vw] font-semibold">{`${Formatamount(
                              Get_Voijeans_list.total_igst_amt
                            )}`}</label>
                            <label className=" text-[0.9vw] font-semibold">{`0`}</label>
                          </div>
                        </div>
                      </div>
                      <div className="mt-[1vw]">
                        <div className="border-b-[0.1vw] border-black w-full"></div>
                        <div className="my-[0.5vw] flex items-center justify-between">
                          <label className="text-[1.5vw] font-semibold">
                            Net Amount:
                          </label>
                          <label className="font-semibold text-[1.5vw]">
                            {`₹ ${Formatamount(
                              Math.round(Get_Voijeans_hsncode.total_net_amt)
                            )}`}
                          </label>
                        </div>
                        <div className="border-b-[0.1vw] border-black w-full"></div>
                      </div>
                    </div>
                    {/* <div className="border-t-[0.1vw] border-black w-[13vw] my-[1vw]"></div>
                <div className="flex mt-[0.5vw] gap-x-[4.2vw]">
                  <label className="text-[#737982] font-bold text-[0.9vw]">
                    Amount Due:
                  </label>
                  <label className="text-[0.9vw] font-bold">$5775</label>
                </div>
                <div className="border-t-[0.1vw]  border-black w-[13vw] my-[1vw]"></div> */}
                  </div>
                </div>
              </div>
              <div className="mt-[2vw]">
                <label className="text-[#3348FF] text-[1.2vw] font-bold">
                  Terms and Conditions
                </label>
                <div className="grid grid-cols-2 gap-x-[2vw] w-full mt-[1vw]">
                  <div className="col-span-1 pl-[1vw] text-justify">
                    <div className="text-justify">
                      {terms.map((item, i) => (
                        <ul
                          key={i}
                          style={{ listStyleType: "disc" }}
                          className="text-justify"
                        >
                          <li className="text-[0.9vw] pb-[0.3vw]">{item}</li>
                        </ul>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-1 w-full text-justify">
                    <label className="text-[0.9vw] leading-normal text-justify">
                      {content}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#D1D6FF] mt-[2vw] w-full h-[3vw]"></div>
          </div>
        ) : (
          // from_bank_details: "axis";
          // id: 4;
          // in_invoice_no: "INF01032025000023";
          // remarks: "";
          // to_bank_details: "canara";
          // transaction_amt: 500;
          // transaction_date: "1999-11-12T00:00:00.000Z";
          // transaction_id: "48949849898";
          // voi_invoice_no: "2425/2/WBWS-128";
          <div
            className="px-[2vw] py-[1vw] gap-y-[2vw] flex flex-col w-full h-full"
            ref={advanceref}
          >
            <div className="flex border-dashed border-[0.15vw] rounded-[0.5vw] border-[#E8EAED] gap-x-[0.5vw]">
              <div className="flex items-center border-dashed border-r-[0.15vw] border-[#E8EAED]">
                <img src={LOGO} className="w-[10vw] p-[0.5vw]" />
              </div>
              <div className="gap-y-[0.5vw] h-full  mt-[0.3vw]">
                <label className="text-[0.9vw] font-semibold">
                  Innofashion
                </label>
                <div className="flex items-center flex-col">
                  {/* <label>Warehouse:</label> */}
                  <label className="text-[0.9vw]">
                    SAK NAGAR, TN SF NO-61/2PART,THOTTIPALAYAM VILLAGE ZONE,
                    TIRUPUR-641603.
                  </label>
                </div>
                <div className="flex items-center gap-x-[0.5vw]">
                  <label className="text-[#737982] text-[0.9vw]">GSTIN:</label>
                  <label className="text-[0.9vw]">33AAGCI9374J1Z5</label>
                </div>
                <div className="flex items-center gap-x-[0.8vw]">
                  <label className="text-[#737982] text-[0.9vw]">Email:</label>
                  <label className="text-[0.9vw]">INNO.DB@innofashion.IN</label>
                </div>
                <div className="flex items-center gap-x-[0.5vw]">
                  <label className="text-[#737982] text-[0.9vw]">Phone:</label>
                  <label className="text-[0.9vw]">9121760868</label>
                </div>
                {/* <div className="flex items-center">
                  <label>Warehouse:</label>
                  <label>
                    No. D-3/4/A -3/10/11/S-43/44/45, Peb Building1St Phase,
                    Doddaballapura Industrial Area, Kasaba Hobli Bengaluru North
                    Taluk, Dod Ballapur-561203 , Karnataka
                  </label>
                </div> */}
              </div>
            </div>
            <div className="grid grid-cols-3 ">
              <div className="col-span-1 flex flex-col">
                <label className="text-gray-400 text-[1vw]">Invoice No</label>
                <label className="text-[1vw]">
                  {Get_Transaction?.voi_invoice_no}
                </label>
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="text-gray-400 text-[1vw]">
                  Transaction Amount
                </label>
                <label>{Get_Transaction?.transaction_amt}</label>
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="text-gray-400 text-[1vw]">
                  Transaction Date
                </label>
                <label className="text-[1vw]">
                  {dayjs(Get_Transaction?.transaction_date).format(
                    "DD MMM, YYYY"
                  )}
                </label>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="col-span-1 flex flex-col">
                <label className="text-gray-400 text-[1vw]">
                  Transaction ID
                </label>
                <label className="text-[1vw]">
                  {Get_Transaction?.transaction_id}
                </label>
              </div>{" "}
              <div className="col-span-1 flex flex-col">
                <label className="text-gray-400 text-[1vw]">Status</label>
                <label className="text-[1vw]">Advance Paid</label>
              </div>{" "}
              <div className="col-span-1 flex flex-col">
                <label className="text-gray-400 text-[1vw]">Payment</label>
                <label className="text-[1vw]">Partially Paid</label>
              </div>{" "}
            </div>
            <div className="grid grid-cols-3">
              <div className="col-span-1 flex flex-col">
                <label className="text-gray-400 text-[1vw]">From Bank</label>
                <label>{Get_Transaction?.from_bank_details}</label>
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="text-gray-400 text-[1vw]">From Bank</label>
                <label className="text-[1vw]">
                  {Get_Transaction?.to_bank_details}
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
