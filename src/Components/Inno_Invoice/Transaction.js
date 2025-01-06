import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MdOutlineDoubleArrow } from "react-icons/md";
import {
  Get_Innofashion_Search_By_Date,
  InnofashionRequest,
  TransactionSubmit,
} from "../../Api/Innofashion/Invoice";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  invoice_no: Yup.string()
    .required("Invoice No is required")
    // .min(5, "Min 5 characters required")
    .max(17, "Max 17 characters only"),
  from_bank: Yup.string()
    .required("From Bank is required")
    // .min(20, "Min 20 characters needed")
    .max(53, "Max 50 characters only"),
  to_bank: Yup.string()
    .required("To Bank is required")
    // .min(20, "Min 20 characters needed")
    .max(53, "Max 50 characters only"),
  transaction_amt: Yup.number()
    .typeError("Must be a number")
    .required("Transaction Amount is required"),
  transaction_date: Yup.string().required("Transaction is required"),
  transaction_id: Yup.number()
    .typeError("Must be a number")
    .required("Transaction ID is required"),
});
export default function Transaction({
  setShowStatus,
  invoiceno,
  page,
  currentTab,
  setTransShow,
  currentdata,
}) {
  const dispatch = useDispatch();
  const inno = useSelector((state) => state.akr.inno_date);

  const handleSubmit = async (value) => {
    console.log("hi");
    try {
      const data = await TransactionSubmit(
        value,
        dispatch,
        invoiceno,
        currentTab,
        page,
        inno[0]?.adv_paid_date
      );
      // InnofashionRequest(
      //   1,
      //   dispatch,
      //   invoiceno,
      //   "invoice",
      //   "",
      //   false,
      //   2,
      //   false
      // );
      setShowStatus(false);
      setTransShow(false);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };
  console.log(inno, "9874565currentdata5inno");
  useEffect(() => {
    Get_Innofashion_Search_By_Date(dispatch, invoiceno);
  }, []);
  return (
    <div>
      <div className="bg-[#3348FF] flex items-center pl-[1vw] py-[0.5vw]">
        <label className="text-white text-[1.25vw] font-bold">
          Invoice Transaction Details
        </label>
      </div>
      <Formik
        initialValues={{
          invoice_no: invoiceno ? invoiceno : "",
          transaction_date: "",
          from_bank: "",
          to_bank: "",
          transaction_amt: currentdata ? currentdata.advance_amount : "",
          transaction_id: "",
        }}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        enableReinitialize
      >
        {({
          isSubmitting,
          isValid,
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          errors,
          touched,
        }) => (
          <>
            <Form onSubmit={handleSubmit} className="">
              <div className="grid grid-cols-2 px-[2vw] mb-[2vw] mt-[1vw]  gap-x-[4vw]">
                <div className="relative">
                  <label className="text-[1vw] font-semibold">
                    Invoice No
                    <span className="text-[1vw] pl-[0.25vw] text-red-500">
                      *
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="invoice_no"
                    id="invoice_no"
                    placeholder="Enter Invoice Number"
                    value={values.invoice_no}
                    autoComplete="off"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="border-b-[0.15vw]   border-[#3348FF]  text-[1vw] h-[2.5vw] w-full outline-none  placeholder:text-[1vw] "
                  />
                  <ErrorMessage
                    name="invoice_no"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
                <div className="relative">
                  <label className="text-[1vw] font-semibold">
                    Transaction Date
                    <span className="text-[1vw] pl-[0.25vw] text-red-500">
                      *
                    </span>
                  </label>
                  <Field
                    type="date"
                    name="transaction_date"
                    id="transaction_date"
                    placeholder="Enter Transaction Date"
                    value={values.transaction_date}
                    autoComplete="off"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="border-b-[0.15vw]   border-[#3348FF]  text-[1vw] h-[2.5vw] w-full outline-none  placeholder:text-[1vw] "
                  />
                  <ErrorMessage
                    name="transaction_date"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 px-[2vw] mb-[2vw] gap-x-[4vw]">
                <div className="relative">
                  <label className="text-[1vw] font-semibold">
                    From Bank
                    <span className="text-[1vw] pl-[0.25vw] text-red-500">
                      *
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="from_bank"
                    id="from_bank"
                    placeholder="Enter From Bank Details"
                    value={values.from_bank}
                    autoComplete="off"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="border-b-[0.15vw]   border-[#3348FF]  text-[1vw] h-[2.5vw] w-full outline-none  placeholder:text-[1vw] "
                  />
                  <ErrorMessage
                    name="from_bank"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
                <div className="relative">
                  <label className="text-[1vw] font-semibold">
                    Transaction Amount
                    <span className="text-[1vw] pl-[0.25vw] text-red-500">
                      *
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="transaction_amt"
                    id="transaction_amt"
                    placeholder="Enter Transaction Amount"
                    value={values.transaction_amt}
                    autoComplete="off"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="border-b-[0.15vw]   border-[#3348FF]  text-[1vw] h-[2.5vw] w-full outline-none  placeholder:text-[1vw] "
                  />
                  <ErrorMessage
                    name="transaction_amt"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 px-[2vw] mb-[3vw] gap-x-[4vw]">
                <div className="relative">
                  <label className="text-[1vw] font-semibold">
                    To Bank Details
                    <span className="text-[1vw] pl-[0.25vw] text-red-500">
                      *
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="to_bank"
                    id="to_bank"
                    placeholder="Enter To Bank Details"
                    value={values.to_bank}
                    autoComplete="off"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="border-b-[0.15vw]   border-[#3348FF]  text-[1vw] h-[2.5vw] w-full outline-none  placeholder:text-[1vw] "
                  />
                  <ErrorMessage
                    name="to_bank"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
                <div className="relative">
                  <label className="text-[1vw] font-semibold">
                    Transaction ID
                    <span className="text-[1vw] pl-[0.25vw] text-red-500">
                      *
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="transaction_id"
                    id="transaction_id"
                    placeholder="Enter Transaction ID"
                    value={values.transaction_id}
                    autoComplete="off"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="border-b-[0.15vw]   border-[#3348FF]  text-[1vw] h-[2.5vw] w-full outline-none  placeholder:text-[1vw] "
                  />
                  <ErrorMessage
                    name="transaction_id"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
              </div>
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
                    type="submit"
                  >
                    <span className="flex items-center justify-center gap-x-[0.5vw] cursor-pointer">
                      <label className="text-[1vw]  text-white  font-bold cursor-pointer">
                        Submit
                      </label>
                      <span>
                        <MdOutlineDoubleArrow size={"1.3vw"} color="white" />
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}
