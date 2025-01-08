import { ConfigProvider, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdAutoDelete, MdDelete } from "react-icons/md";
import {
  Delete_account,
  Get_Inno_Account_By_ID,
  Get_Voi_Account_By_ID,
} from "../../../Api/Voi_Jeans/Invoice";
import ModalPopup from "../../Common/Modal";
export default function TableList({ setCurrentTab }) {
  const user_id = sessionStorage.getItem("USER_ID");

  const Get_Account_List = useSelector((state) =>
    user_id === "INNO001"
      ? state.akr.inno_account_list
      : state.akr.voi_account_list
  );
  const [activePage, setActivePage] = useState(1);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const itemsPerPage = 7;
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    Get_Account_List?.length > 0 &&
    Get_Account_List?.slice(indexOfFirstItem, indexOfLastItem);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentItems?.length === 0) {
      setActivePage(activePage - 1);
    }
  }, [currentItems, setActivePage, activePage]);
  const [deleteshow, setDeleteShow] = useState(false);
  const [currentdata, setCurrentData] = useState("");
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
      title: <span className="text-[0.9vw] ">Account No</span>,
      key: "acc_no",
      align: "center",
      // width: "15vw",
      sorter: (a, b) => a.acc_no?.localeCompare(b.acc_no),
      render: (row) => {
        console.log("testingss", row.id);
        return (
          <>
            <label className="text-[0.9vw]">{row.acc_no}</label>
          </>
        );
      },
    },

    {
      title: <span className="text-[0.9vw] ">Bank Name</span>,
      key: "bank_name",
      align: "center",
      // width: "15vw",
      sorter: (a, b) => a.bank_name?.localeCompare(b.bank_name),
      render: (row) => {
        console.log("testingss", row.id);
        return (
          <>
            {row?.bank_name?.length > 20 ? (
              <Tooltip
                color="white"
                overlayInnerStyle={{ color: "#3348FF" }}
                className="cursor-pointer"
                placement="top"
                title={row?.bank_name}
              >
                <span className="text-[0.9vw]">{`${(row?.bank_name).slice(
                  0,
                  20
                )}...`}</span>
              </Tooltip>
            ) : (
              <span className="text-[0.9vw]">{row?.bank_name}</span>
            )}
            {/* <label className="text-[0.9vw]">{row.bank_name}</label> */}
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw] ">Account Holder Name</span>,
      key: "acc_holder_name",
      align: "center",
      // width: "15vw",
      sorter: (a, b) => a.acc_holder_name?.localeCompare(b.acc_holder_name),
      render: (row) => {
        console.log("testingss", row.id);
        return (
          <>
            {/* <label className="text-[0.9vw]">{row.acc_holder_name}</label> */}
            {row?.acc_holder_name?.length > 20 ? (
              <Tooltip
                color="white"
                overlayInnerStyle={{ color: "#3348FF" }}
                className="cursor-pointer"
                placement="top"
                title={row?.acc_holder_name}
              >
                <span className="text-[0.9vw]">{`${(row?.acc_holder_name).slice(
                  0,
                  20
                )}...`}</span>
              </Tooltip>
            ) : (
              <span className="text-[0.9vw]">{row?.acc_holder_name}</span>
            )}
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw] ">Action</span>,
      key: "ifsc_code",
      align: "center",
      // width: "15vw",
      render: (row) => {
        console.log("testingss", row.id);
        return (
          <>
            <div className="flex items-center justify-center gap-x-[0.5vw]">
              <span>
                <FaEdit
                  size={"1.2vw"}
                  color="#3348FF"
                  className=" cursor-pointer"
                  onClick={() => {
                    setCurrentTab(2);
                    setCurrentData(row);
                    if (user_id === "INNO001") {
                      Get_Inno_Account_By_ID(dispatch, row.acc_id);
                    } else {
                      Get_Voi_Account_By_ID(dispatch, row.acc_id);
                    }
                  }}
                />
              </span>
              <span>
                <MdDelete
                  onClick={() => {
                    setDeleteShow(true);
                    setCurrentData(row);
                  }}
                  size={"1.2vw"}
                  color="#3348FF"
                  className=" cursor-pointer"
                />
              </span>
            </div>{" "}
          </>
        );
      },
    },
  ];
  const handleDelete = () => {
    Delete_account(dispatch, currentdata?.acc_id);
    setDeleteShow(false);
  };
  return (
    <>
      <div className="h-full w-full px-[1vw]">
        <div className="h-[40vh] w-full ">
          {" "}
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
        </div>
        <div className="h-[10vh] w-full flex items-center justify-center ">
          {Get_Account_List?.length > 7 && (
            <div className="flex items-center pt-[5vh] justify-between w-full h-full px-[1vw]">
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
                  {Get_Account_List?.length || 0}
                </span>
                <span>data</span>
              </div>
              {/* Pagination */}
              <div className="">
                <ReactPaginate
                  activePage={activePage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={Get_Account_List?.length}
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
      </div>
      <ModalPopup
        className="border border-[#3348FF] border-b-8 border-r-8 border-b-[#3348FF] border-r-[#3348FF] rounded-md"
        show={deleteshow}
        onClose={() => setDeleteShow(false)}
        height={"35vh"}
        width={"25vw"}
        closeicon={false}
        footer={null}
        radius={false}
      >
        <div className="flex flex-col mt-[1vw] justify-center">
          <div className="items-center flex-col flex justify-center mt-[0.5vw]">
            <MdAutoDelete color="#3348FF" size={"4vw"} />
            <p className="text-[1.2vw] font-semibold  mt-[1vw]">
              Are you Sure ?
            </p>
            <p className="text-[0.9vw]  mt-[0.5vw]">
              Want to Delete{" "}
              <span className="font-bold">{currentdata?.acc_holder_name}</span>{" "}
              Account Details ?
            </p>
          </div>
          <div className="flex items-center mt-[1.5vw] gap-[2vw] justify-center">
            <button
              className="border-[#3348FF] border-[0.1vw] rounded-[0.5vw] text-[1.1vw] font-semibold text-[#3348FF] w-[8vw]  h-[2.5vw]"
              onClick={() => setDeleteShow(false)}
            >
              No
            </button>
            <button
              className="bg-[#3348FF] text-white font-semibold text-[1.1vw] w-[8vw] h-[2.5vw] rounded-[0.5vw]"
              // onClick={() => DeletePromoData()}
              onClick={() => handleDelete()}
            >
              Yes
            </button>
          </div>
        </div>
      </ModalPopup>
    </>
  );
}
