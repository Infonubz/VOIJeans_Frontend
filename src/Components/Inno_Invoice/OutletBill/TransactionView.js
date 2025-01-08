import React, { useEffect, useRef, useState } from "react";
import Logo from "../../../Assets/VoiLogo.jpg";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { ConfigProvider, Table } from "antd";
import { Formatamount } from "../../Common/RuppesFormat";
import "../../../App.css";
import { Get_Voijeans_Status_By_Id } from "../../../Api/Voi_Jeans/Invoice";
import InvoiceProductList from "../../Voi_Invoice/InvoiceProductList";
import { useReactToPrint } from "react-to-print";
import LOGO from "../../../Assets/innlogo.png";
import { html2pdf } from "html2pdf.js";
import { jsPDF } from "jspdf";
import { RiBillLine } from "react-icons/ri";
import { TbFileInvoice } from "react-icons/tb";
import { Get_Transaction_By_Id, Get_Transaction_Outlet } from "../../../Api/Innofashion/Invoice";

export default function TransactionView({
  currentdata,
  page,
  setCurrentTabTemp,
  currentTabTemp,
}) {
  const Get_Voijeans_list = useSelector((state) => state.akr.voi_jeans_by_id);
  const Get_Transaction = useSelector((state) => state.akr.outlet_trans);
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
  

      Get_Transaction_Outlet(dispatch, currentdata?.in_invoice_no);
  }, [currentTabTemp]);
  // const [currentTab, setCurrentTab] = useState(1)
  const contentRef = useRef();
  const advanceref = useRef();
  console.log(currentdata, "currentdatacurrentdata");

  return (
    <>
      <div className="h-[100vh] w-full">
        <div className="px-[2vw] flex justify-between  py-[1vw]">
          <div className="flex items-end justify-end w-full">
            <button
              className="bg-[#3348FF] w-[10vw] rounded-[1vw] text-[1vw] font-semibold cursor-pointer text-white py-[0.25vw]"
              onClick={handlePrint}
            >
              Download PDF
            </button>
          </div>
        </div>

        <div
          className="px-[2vw] py-[1vw] gap-y-[2vw] flex flex-col w-full h-full"
          ref={advanceref}
        >
          <div className="flex border-dashed border-[0.15vw] rounded-[0.5vw] border-[#E8EAED] gap-x-[0.5vw]">
            <div className="flex items-center border-dashed border-r-[0.15vw] border-[#E8EAED]">
              <img src={LOGO} className="w-[10vw] p-[0.5vw]" />
            </div>
            <div className="gap-y-[0.5vw] h-full  mt-[0.3vw]">
              <label className="text-[0.9vw] font-semibold">Innofashion</label>
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
              <label className="text-gray-400 text-[1vw]">Transaction ID</label>
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
      </div>
    </>
  );
}
