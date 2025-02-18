import { ConfigProvider, Table, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ReactPaginate from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { IoMdArrowDropright } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import ModalPopup from "../../Common/Modal";
import "../../Common/Modal.css";
import InvoiceTemplate from "../../Voi_Invoice/InvoiceTemplate";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import RequestStatus from "../../Voi_Invoice/RequestStatus";
import { useDispatch, useSelector } from "react-redux";
import {
  Get_Voijeans_Invoice_By_Id,
  Get_Voijeans_Invoice_HSN_Code,
  Get_Voijeans_Invoice_List,
  Get_Voijeans_Invoice_ProductList_By_Id,
  Get_Voijeans_Status_By_Id,
} from "../../../Api/Voi_Jeans/Invoice";
import dayjs from "dayjs";
import { capitalizeFirstLetter } from "../../Common/Captalization";
import { Tabs } from "antd";
import {
  Get_Innfashion_Outlet_Bill,
  Get_Innfashion_Status_By_Id,
  Get_Innofashion_Invoice_List,
  Get_Innofashion_Search,
  Get_Innofashion_Search_By_Date,
} from "../../../Api/Innofashion/Invoice";
import PaymentRequestApprove from "./../RequestApprove";
import { MdFileDownload } from "react-icons/md";
import InnoInvoiceTemplate from "./../InvoiceTemplate";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import ReactToPrint from "react-to-print";
import { jsPDF } from "jspdf";
import Transaction from "./../Transaction";
import OutletTransaction from "./Transaction";
import LOGO from "../../../Assets/innlogo.png";
import TransactionView from "./TransactionView";

export default function OutletBill() {
  const componentRef = useRef();
  const [fullamt, setFullAmt] = useState(false);
  const [currentTab, setCurrentTab] = useState(2);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const Formatamount = (amt) => {
    const formattedAmount = new Intl.NumberFormat("en-IN").format(amt);
    return formattedAmount;
  };
  const Get_Innofashion_Outletbill_list = useSelector(
    (state) => state.akr.outlet_list
  );
  const Get_Outlet_Trans = useSelector((state) => state.akr.outlet_trans);
  const [invoiceno, setInvoiceNo] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const itemsPerPage = 10;
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    Get_Innofashion_Outletbill_list?.length > 0 &&
    Get_Innofashion_Outletbill_list?.slice(indexOfFirstItem, indexOfLastItem);
  useEffect(() => {
    if (currentItems?.length === 0) {
      setActivePage(activePage - 1);
    }
  }, [currentItems, setActivePage, activePage]);
  const [currentdata, setCurrentData] = useState("");
  // print
  // const reactToPrintFn = useReactToPrint({ contentRef });
  ///
  const printRef = useRef();
  const contentRef = useRef();
  const advanceref = useRef();
  const [invoiceview, showInvoiceView] = useState(false);
  const reactToPrintFn = () => {
    console.log("Hi"); // This will print to the console when clicked.
  };
  const columns = [
    {
      title: <span className="text-[0.9vw]">S. No</span>,
      key: "id",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingss", row.id);
        const serialNumber = (activePage - 1) * itemsPerPage + (i + 1);

        return (
          <>
            <label className="text-[0.9vw]">{serialNumber}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw] ">Inno Invoice No</span>,
      key: "in_invoice_no",
      align: "center",
      // width: "15vw",
      sorter: (a, b) => a.in_invoice_no?.localeCompare(b.in_invoice_no),
      render: (row) => {
        console.log("testingss", row.id);
        return (
          <>
            <label className="text-[0.9vw]">{row.in_invoice_no}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw] ">VOI Invoice No</span>,
      key: "voi_invoice_no",
      align: "center",
      // width: "15vw",
      sorter: (a, b) => a.voi_invoice_no?.localeCompare(b.voi_invoice_no),
      render: (row) => {
        console.log("testingss", row.id);
        return (
          <>
            <label className="text-[0.9vw]">{row.voi_invoice_no}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">Shipper</span>,
      key: "shipper_name",
      align: "center",
      // width: currentTab === 2 ? "35vw" : "25vw",
      sorter: (a, b) => a.party_branch_name?.localeCompare(b.party_branch_name),
      render: (row) => {
        return (
          <>
            {row?.party_branch_name?.length > 50 ? (
              <Tooltip
                color="white"
                overlayInnerStyle={{ color: "#3348FF" }}
                className="cursor-pointer"
                placement="top"
                title={capitalizeFirstLetter(row?.party_branch_name)}
              >
                <span className="text-[0.9vw]">{`${capitalizeFirstLetter(
                  row?.party_branch_name
                ).slice(0, 50)}...`}</span>
              </Tooltip>
            ) : (
              <span className="text-[0.9vw]">
                {capitalizeFirstLetter(row?.party_branch_name)}
              </span>
            )}
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">Invoice Date</span>,
      key: "invoice_date",
      align: "center",
      // width: "15vw",
      sorter: (a, b) =>
        dayjs(a.invoice_date).valueOf() - dayjs(b.invoice_date).valueOf(),
      render: (row) => {
        return (
          <>
            <label className="text-[0.9vw]">
              {dayjs(row.invoice_date).format("DD MMM, YYYY")}
            </label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">Invoice Amt</span>,
      key: "net_amount",
      align: "center",
      // width: "15vw",
      sorter: (a, b) => {
        if (
          typeof a?.net_amount === "number" &&
          typeof b?.net_amount === "number"
        ) {
          return a?.net_amount - b?.net_amount;
        }
        const valueA = String(a?.net_amount || "");
        const valueB = String(b?.net_amount || "");
        return valueA.localeCompare(valueB);
      },
      render: (row) => {
        return (
          <>
            <label className="text-[0.9vw]">{`₹ ${Formatamount(
              row.net_amount
            )}`}</label>
          </>
        );
      },
    },

    {
      title: <span className="text-[0.9vw]">Payment status</span>,
      key: "payment_status_id",
      align: "center",
      // width: "15vw",

      render: (row) => {
        // Partialy Paid = 1
        // Paid = 2
        // Overdue = 3
        return (
          <div className="flex flex-row gap-[1vw] justify-center items-center">
            <span
              className={`flex  border-[0.1vw] ${
                row.payment_status_id === 1
                  ? "w-[100%] border-[#c6eec2] cursor-not-allowed "
                  : row.payment_status_id === 2
                  ? "border-[#c6eec2] cursor-not-allowed "
                  : row.payment_status_id === 3
                  ? "border-[#eca2a2] bg-[#FDECEC]"
                  : "w-[80%] border-[#a5caec] cursor-pointer "
              } rounded-[1vw] h-[1.5vw] w-[9vw]`}
              onClick={() => {
                // if (row.in_advance_request_id === 0) {
                //   setShowStatus(true);
                // }else{
                //   setShowStatus(false);
                // }
                currentTab === 2 && setShowStatus(true);
                setInvoiceNo(row.in_invoice_no);
                setCurrentData(row);
                Get_Innofashion_Search_By_Date(dispatch, row.voi_invoice_no);
                // Get_Voijeans_Invoice_By_Id(dispatch, row.invoice_no);
              }}
            >
              <h1
                className={`text-[0.80vw] rounded-full h-full ${
                  row.payment_status_id === 1
                    ? "w-[100%] text-[#34AE2A] bg-[#ECFDF3]"
                    : row.payment_status_id === 2
                    ? "w-[100%] text-[#34AE2A] bg-[#ECFDF3]"
                    : row.payment_status_id === 3
                    ? "w-[100%] text-[#E52A2A]"
                    : "w-[80%] text-[#2A99FF] bg-[#dff4ff]"
                }  font-bold`}
              >
                {row.payment_status}
              </h1>
              {row.payment_status_id === 0 ? (
                <IoMdArrowDropright
                  size={"1.5vw"}
                  color="#2A99FF"
                  className="mt-[-0.1vw]"
                />
              ) : (
                ""
              )}
            </span>
            <span>
              {/* <FaEye
                size={"1.2vw"}
                className=" cursor-pointer"
                onClick={() => {
                  setShowInvoice(true);
                  // setInvoiceNo(row.invoice_no);
                  Get_Voijeans_Invoice_By_Id(dispatch, row.voi_invoice_no);
                  Get_Voijeans_Invoice_ProductList_By_Id(
                    dispatch,
                    row.voi_invoice_no
                  );
                  Get_Voijeans_Invoice_HSN_Code(dispatch, row.voi_invoice_no);
                }}
              /> */}
              <FaEye
                size={"1.2vw"}
                className=" cursor-pointer"
                onClick={() => {
                  if (currentTab === 2) {
                    showInvoiceView(true);
                    Get_Voijeans_Invoice_By_Id(dispatch, row.voi_invoice_no);
                    Get_Voijeans_Invoice_ProductList_By_Id(
                      dispatch,
                      row.voi_invoice_no
                    );
                    Get_Voijeans_Invoice_HSN_Code(dispatch, row.voi_invoice_no);
                    setCurrentData(row);
                  } else {
                    setShowInvoice(true);
                  }
                  // setInvoiceNo(row.invoice_no);
                  // Get_Voijeans_Invoice_By_Id(dispatch, row.voi_invoice_no);
                  // Get_Voijeans_Invoice_ProductList_By_Id(
                  //   dispatch,
                  //   row.voi_invoice_no
                  // );
                  // Get_Voijeans_Invoice_HSN_Code(dispatch, row.voi_invoice_no);
                  setCurrentData(row);
                }}
              />
            </span>
          </div>
        );
      },
    },
  ];

  //     sno: 1,
  //     id: 25561,
  //     name: "John Doe",
  //     invoicedate: "3rd Dec 2024",
  //     duedate: "3rd Dec 2024",
  //     amount: 20000,
  //     balance: 0.0,
  //     advrequest_id: 0,
  //     advrequest: "Request",
  //     status: "Partialy Paid",
  //     status_id: 1,
  //   },
  //   {
  //     key: 1,
  //     sno: 1,
  //     id: 25561,
  //     name: "John Doe",
  //     invoicedate: "3rd Dec 2024",
  //     duedate: "3rd Dec 2024",
  //     amount: 20000,
  //     balance: 0.0,
  //     advrequest_id: 0,
  //     advrequest: "Request",
  //     status: "Partialy Paid",
  //     status_id: 1,
  //   },
  //   {
  //     key: 1,
  //     sno: 1,
  //     id: 25561,
  //     name: "John Doe",
  //     invoicedate: "3rd Dec 2024",
  //     duedate: "3rd Dec 2024",
  //     amount: 20000,
  //     balance: 0.0,
  //     advrequest_id: 1,
  //     advrequest: "Requested",
  //     status: "Paid",
  //     status_id: 2,
  //   },
  //   {
  //     key: 1,
  //     sno: 1,
  //     id: 25561,
  //     name: "John Doe",
  //     invoicedate: "3rd Dec 2024",
  //     duedate: "3rd Dec 2024",
  //     amount: 20000,
  //     balance: 0.0,
  //     advrequest_id: 1,
  //     advrequest: "Requested",
  //     status: "Paid",
  //     status_id: 2,
  //   },
  //   {
  //     key: 1,
  //     sno: 1,
  //     id: 25561,
  //     name: "John Doe",
  //     invoicedate: "3rd Dec 2024",
  //     duedate: "3rd Dec 2024",
  //     amount: 20000,
  //     balance: 0.0,
  //     advrequest_id: 2,
  //     advrequest: "Approved",
  //     status: "Paid",
  //     status_id: 1,
  //   },
  //   {
  //     key: 1,
  //     sno: 1,
  //     id: 25561,
  //     name: "John Doe",
  //     invoicedate: "3rd Dec 2024",
  //     duedate: "3rd Dec 2024",
  //     amount: 20000,
  //     balance: 0.0,
  //     advrequest_id: 2,
  //     advrequest: "Approved",
  //     status: "Overdue",
  //     status_id: 3,
  //   },
  //   {
  //     key: 1,
  //     sno: 1,
  //     id: 25561,
  //     name: "John Doe",
  //     invoicedate: "3rd Dec 2024",
  //     duedate: "3rd Dec 2024",
  //     amount: 20000,
  //     balance: 0.0,
  //     advrequest_id: 3,
  //     advrequest: "Hold",
  //     status: "Overdue",
  //     status_id: 3,
  //   },
  //   {
  //     key: 1,
  //     sno: 1,
  //     id: 25561,
  //     name: "John Doe",
  //     invoicedate: "3rd Dec 2024",
  //     duedate: "3rd Dec 2024",
  //     amount: 20000,
  //     balance: 0.0,
  //     advrequest_id: 3,
  //     advrequest: "Hold",
  //     status: "Overdue",
  //     status_id: 3,
  //   },
  //   {
  //     key: 1,
  //     sno: 1,
  //     id: 25561,
  //     name: "John Doe",
  //     invoicedate: "3rd Dec 2024",
  //     duedate: "3rd Dec 2024",
  //     amount: 20000,
  //     balance: 0.0,
  //     advrequest_id: 4,
  //     advrequest: "Rejected",
  //     status: "Overdue",
  //     status_id: 3,
  //   },
  //   {
  //     key: 1,
  //     sno: 1,
  //     id: 25561,
  //     name: "John Doe",
  //     invoicedate: "3rd Dec 2024",
  //     duedate: "3rd Dec 2024",
  //     amount: 20000,
  //     balance: 0.0,
  //     advrequest_id: 4,
  //     advrequest: "Rejected",
  //     status: "Overdue",
  //     status_id: 3,
  //   },
  // ];
  const closeInvoiceModal = () => {
    setShowInvoice(false);
    showInvoiceView(false);
  };

  const dispatch = useDispatch();
  const user_id = sessionStorage.getItem("USER_ID");
  // useEffect(() => {
  //   if (user_id === "VOIJ001") {
  //     Get_Voijeans_Invoice_List(dispatch);
  //   }
  // }, []);
  // useEffect(() => {
  //   console.log("testing");
  //   if (invoiceno) {
  //     Get_Voijeans_Invoice_By_Id(dispatch, invoiceno);
  //   }
  // }, [invoiceno]);
  console.log(invoiceno, "invoicenoinvoiceno");
  const onChange = (key) => {
    console.log(key);
  };
  const Tabnames = [
    // {
    //   Tab: "All",
    //   id: 1,
    // },
    {
      Tab: "Unpaid",
      id: 2,
    },
    {
      Tab: "Paid",
      id: 3,
    },
  ];
  // useEffect(() => {
  //   if (user_id === "VOIJ001") {
  //     Get_Voijeans_Status_By_Id(dispatch, currentTab,"invoice");
  //   }
  // }, [currentTab]);
  // useEffect(() => {
  //   Get_Innofashion_Invoice_List(dispatch);
  // }, []);
  const downloadPDF = () => {
    const element = contentRef.current;
    html2pdf().from(element).save("content.pdf"); // Download the content as a PDF
  };
  useEffect(() => {
    Get_Innfashion_Outlet_Bill(dispatch, currentTab);
  }, [currentTab]);
  const [currentTabTemp, setCurrentTabTemp] = useState(1);
  console.log(currentdata, "currentdatacurrentdata852852");
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
  return (
    <>
      <div className="h-[70vh] w-full">
        <div className=" py-[1vw] pl-[1vw]">
          <div className="flex items-center ">
            <div className="relative flex  items-center w-[13.85vw] ">
              <BiSearchAlt
                className="absolute left-[0.8vw] top-[50%] transform -translate-y-1/2"
                size={"1vw"}
                color="#323232"
              />

              <input
                type="text"
                className="bg-white outline-none pl-[2.5vw] text-[1vw] pr-[3vw] w-[15vw] h-[2.3vw] border-[0.1vw] border-[#dddddd] rounded-[0.7vw] shadow-md shadow-[#dadbde]"
                placeholder="Search..."
                onChange={(e) =>
                  e.target.value != "" &&
                  Get_Innofashion_Search(
                    dispatch,
                    e.target.value,
                    currentTab,
                    "invoice"
                  )
                }
              />
            </div>
            <div className="flex items-center gap-x-[4vw] pl-[5vw]">
              {Tabnames.map((item) => (
                <div
                  className={`cursor-pointer ${
                    currentTab === item.id
                      ? "border-b-[0.2vw] font-semibold   border-[#3348FF]"
                      : ""
                  } `}
                  onClick={() => setCurrentTab(item.id)}
                >
                  <div className="text-[1vw]  text-center">{item.Tab}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ConfigProvider
          theme={{
            // components: {
            //   Table: {
            //     // Customize hover styles
            //     rowHoverBg: "rgb(255, 255, 255, 0)",
            //     rowSelectedBg: "rgb(255, 255, 255, 0)",
            //     rowSelectedHoverBg: "rgb(255, 255, 255, 0)",
            //     borderRadius: "2vw", // Row border-radius
            //     shadowHover: "0 4px 6px rgba(0, 0, 0, 0.15)", // Shadow for hover
            //     //shadowSelected: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for selected
            //   },
            components: {
              Table: {
                rowHoverBg: "rgb(255, 255, 255, 0)",
                rowSelectedBg: "rgb(255, 255, 255, 0)",
                borderRadius: "2vw",
                shadowHover: "0 4px 6px rgba(0, 0, 0, 0.15)",
              },
            },
            // },
          }}
        >
          <Table
            className="custom-table"
            columns={columns}
            pagination={false}
            dataSource={currentItems?.length > 0 ? currentItems : []}
            rowClassName={(record, index) => `custom-row-${index}`}
          />
        </ConfigProvider>
        {/* <ReactPaginate
        activePage={activePage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={getpromotionlist?.length}
        pageRangeDisplayed={3}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
        activeClass="active"
        prevPageText={<FontAwesomeIcon icon={faChevronLeft} size="1vw" />}
        nextPageText={<FontAwesomeIcon icon={faChevronRight} size="1vw" />}
        firstPageText={<FontAwesomeIcon icon={faAngleDoubleLeft} size="1vw" />}
        lastPageText={<FontAwesomeIcon icon={faAngleDoubleRight} size="1vw" />}
      /> */}
        <ModalPopup
          className="border border-[#3348FF] border-b-8 border-r-8 border-b-[#3348FF] border-r-[#3348FF] rounded-md"
          show={showInvoice}
          onClose={closeInvoiceModal}
          height={"65vh"}
          width={"50vw"}
          closeicon={false}
          footer={null}
          radius={false}
        >
          <TransactionView
            currentdata={currentdata}
            page={"outlet"}
            setCurrentTabTemp={setCurrentTabTemp}
            currentTabTemp={currentTabTemp}
          />
        </ModalPopup>
        <ModalPopup
          className="border border-[#3348FF] border-b-8 border-r-8 border-b-[#3348FF] border-r-[#3348FF] rounded-md"
          show={invoiceview}
          onClose={closeInvoiceModal}
          height={currentTab === 2 ? "100vh" : "65vh"}
          width={currentTab === 2 ? "60vw" : "50vw"}
          closeicon={false}
          footer={null}
          radius={false}
        >
          {/* <TransactionView
            currentdata={currentdata}
            page={"outlet"}
            setCurrentTabTemp={setCurrentTabTemp}
            currentTabTemp={currentTabTemp}
          /> */}
          <InnoInvoiceTemplate
            currentdata={currentdata}
            page={"outlet"}
            setCurrentTabTemp={setCurrentTabTemp}
            currentTabTemp={currentTabTemp}
            modal={"test"}
          />
        </ModalPopup>
        <ModalPopup
          className="border border-[#3348FF] border-b-8 border-r-8 border-b-[#3348FF] border-r-[#3348FF] rounded-md"
          show={showStatus}
          onClose={() => setShowStatus(false)}
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
          <OutletTransaction
            setShowStatus={setShowStatus}
            invoiceno={invoiceno}
            page={"invoice"}
            currentTab={currentTab}
            setTransShow={setShowStatus}
            currentdata={currentdata}
          />
        </ModalPopup>
      </div>
      <div className="h-[10vh] w-full flex items-center justify-center ">
        {Get_Innofashion_Outletbill_list?.length > 10 && (
          <div className="flex items-center pt-[2vh] justify-between w-full h-full px-[1vw]">
            {/* Showing Text */}
            <div className="text-black flex text-[1vw] gap-[0.5vw]">
              <span>Showing</span>
              <span className="font-bold">
                {currentItems?.length > 0
                  ? `${indexOfFirstItem + 1} - ${
                      indexOfFirstItem + currentItems?.length
                    }`
                  : "0"}
              </span>
              <span>from</span>
              <span className="font-bold">
                {Get_Innofashion_Outletbill_list?.length || 0}
              </span>
              <span>data</span>
            </div>
            {/* Pagination */}
            <div className="">
              <ReactPaginate
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={Get_Innofashion_Outletbill_list?.length}
                pageRangeDisplayed={3}
                onChange={handlePageChange}
                className="inline-flex divide-x divide-gray-300"
                itemClass="border border-gray-300"
                linkClass="px-[0.8vw] py-[0.5vw] text-black font-bold bg-gray-100 hover:bg-gray-200"
                activeClass="bg-blue-500 text-white"
                innerClass="inline-flex  divide-x divide-gray-300"
                prevPageText={
                  <FontAwesomeIcon icon={faChevronLeft} size="1vw" />
                }
                nextPageText={
                  <FontAwesomeIcon icon={faChevronRight} size="1vw" />
                }
                firstPageText={
                  <FontAwesomeIcon icon={faAngleDoubleLeft} size="1vw" />
                }
                lastPageText={
                  <FontAwesomeIcon icon={faAngleDoubleRight} size="1vw" />
                }
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
