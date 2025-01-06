import { ConfigProvider, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formatamount } from "../Common/RuppesFormat";
import { Get_Voijeans_Invoice_ProductList_By_Id } from "../../Api/Voi_Jeans/Invoice";
import "../../App.css";
export default function InvoiceProductList({ invoice_no }) {
  const Get_Voijeans_Productlist = useSelector(
    (state) => state.akr.voi_jeans_productlist_by_id
  );
  const Get_Voijeans_list = useSelector((state) => state?.akr?.voi_jeans_by_id);

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
      title: <span className="text-[0.9vw]">Product</span>,
      key: "category_name",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingsstestingss", row.category_name);
        return (
          <>
            <label className="text-[0.8vw]">{row.category_name}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">Item Code</span>,
      key: "item_code",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingss", row.item_code);
        return (
          <>
            <label className="text-[0.8vw]">{`${row.item_code}`}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">Item Name</span>,
      key: "item_name",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingss", row.item_name);
        return (
          <>
            <label className="text-[0.8vw]">{`${row.item_name}`}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">Size</span>,
      key: "size",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingsss_qty", row.size);
        return (
          <>
            <label className="text-[0.8vw]">{row.size}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">Qty</span>,
      key: "qty",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingss", row.qty);
        return (
          <>
            <label className="text-[0.8vw]">{row.qty}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">MRP</span>,
      key: "mrp",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingss", row.mrp);
        return (
          <>
            <label className="text-[0.8vw]">{row.mrp}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">Per Rate</span>,
      key: "rate",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingss", row.rate);
        return (
          <>
            <label className="text-[0.8vw]">{row.rate}</label>
          </>
        );
      },
    },
    {
      title: <span className="text-[0.9vw]">Net Amount</span>,
      key: "amt",
      align: "center",
      // width: "5vw",
      render: (row, index, i) => {
        console.log("testingss", row.amt);
        return (
          <>
            <label className="text-[0.8vw]">{row.amt}</label>
          </>
        );
      },
    },
  ];

  console.log(Get_Voijeans_Productlist, "Get_Voijeans_Productlisttest");

  return (
    <div>
      {" "}
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
          columns={columns}
          pagination={false}
          dataSource={
            Get_Voijeans_Productlist?.product_list?.length > 0
              ? Get_Voijeans_Productlist?.product_list
              : []
          }
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

                <td></td>
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
                  {Get_Voijeans_list?.total_quantity}
                </td>
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
                  {Get_Voijeans_list?.total_amount}
                </td>
              </tr>
            );
          }}
          rowClassName={(record, index) => `custom-row-${index}`}
        />
      </ConfigProvider>
    </div>
  );
}
