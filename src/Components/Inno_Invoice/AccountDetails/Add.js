import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, Select } from "antd";
import { IoMdArrowDropup } from "react-icons/io";
import { AccountSubmit } from "../../../Api/Voi_Jeans/Invoice";

const validationSchema = Yup.object().shape({
  acc_holder_name: Yup.string().required("Name is required"),
  branch_name: Yup.string().required("Branch Name is required"),
  bank_name: Yup.string().required("Bank Name is required"),
  acc_type: Yup.string().required("Bank Type is required"),
  ifsc_code: Yup.string()
    .required("IFSC Code is required")
    .min(11, "IFSC Code be 11 digits long")
    .max(11, "IFSC Code must be 11 digits long"),
  acc_no: Yup.string()
    .typeError("Must be a number")
    .required("Account Number is required")
    .min(10, "Bank account number must be at least 10 digits long")
    .max(18, "Bank account number cannot exceed 18 digits"),
});
export default function AddAccount({ setCurrentTab }) {
  const dispatch = useDispatch();
  const acc_type = [
    { value: "Savings", label: "Savings" },
    { value: "Current", label: "Current" },
  ];
  const handleSubmit = (values) => {
    AccountSubmit(values, dispatch, setCurrentTab, Get_ById[0]?.acc_id);
  };
  const Get_ById = useSelector((state) => state.akr.account_byid);
  console.log(Get_ById, "Get_ById");

  return (
    <div>
      <Formik
        initialValues={{
          acc_holder_name: Get_ById ? Get_ById[0]?.acc_holder_name : "",
          acc_no: Get_ById ? Get_ById[0]?.acc_no : "",
          ifsc_code: Get_ById ? Get_ById[0]?.ifsc_code : "",
          branch_name: Get_ById ? Get_ById[0]?.branch_name : "",
          bank_name: Get_ById ? Get_ById[0]?.bank_name : "",
          acc_type: Get_ById ? Get_ById[0]?.acc_type : "",
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
              <div className="grid grid-cols-2 px-[2vw] mb-[2vw] mt-[2vw]  gap-x-[4vw]">
                <div className="relative">
                  <label className="text-[1vw] font-semibold">
                    Account Holder Name
                    <span className="text-[1vw] pl-[0.25vw] text-red-500">
                      *
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="acc_holder_name"
                    id="acc_holder_name"
                    placeholder="Enter Account Holder Name"
                    value={values.acc_holder_name}
                    autoComplete="off"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="border-b-[0.15vw]   border-[#535354]  text-[1vw] h-[2.5vw] w-full outline-none  placeholder:text-[1vw] "
                  />
                  <ErrorMessage
                    name="acc_holder_name"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
                <div className="relative">
                  <label className="text-[1vw] font-semibold">
                    Account Number
                    <span className="text-[1vw] pl-[0.25vw] text-red-500">
                      *
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="acc_no"
                    id="acc_no"
                    placeholder="Enter Account Number"
                    value={values.acc_no}
                    autoComplete="off"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="border-b-[0.15vw]   border-[#535354]  text-[1vw] h-[2.5vw] w-full outline-none  placeholder:text-[1vw] "
                  />
                  <ErrorMessage
                    name="acc_no"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 px-[2vw] mb-[2vw] gap-x-[4vw]">
                <div className="relative">
                  <label className="text-[1vw] font-semibold">
                    Bank Name
                    <span className="text-[1vw] pl-[0.25vw] text-red-500">
                      *
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="bank_name"
                    id="bank_name"
                    placeholder="Enter Bank Name"
                    value={values.bank_name}
                    autoComplete="off"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="border-b-[0.15vw]   border-[#535354]  text-[1vw] h-[2.5vw] w-full outline-none  placeholder:text-[1vw] "
                  />
                  <ErrorMessage
                    name="bank_name"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
                <div className="relative">
                  <label className="text-[1vw] font-semibold">
                    IFSC Code
                    <span className="text-[1vw] pl-[0.25vw] text-red-500">
                      *
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="ifsc_code"
                    id="ifsc_code"
                    placeholder="Enter IFSC Code"
                    value={values.ifsc_code}
                    autoComplete="off"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="border-b-[0.15vw]   border-[#535354]  text-[1vw] h-[2.5vw] w-full outline-none  placeholder:text-[1vw] "
                  />
                  <ErrorMessage
                    name="ifsc_code"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 px-[2vw] mb-[3vw] gap-x-[4vw]">
                <div className="relative">
                  <label className="text-[1vw] font-semibold">
                    Branch Name
                    <span className="text-[1vw] pl-[0.25vw] text-red-500">
                      *
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="branch_name"
                    id="branch_name"
                    placeholder="Enter Branch Name"
                    value={values.branch_name}
                    autoComplete="off"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="border-b-[0.15vw]   border-[#535354]  text-[1vw] h-[2.5vw] w-full outline-none  placeholder:text-[1vw] "
                  />
                  <ErrorMessage
                    name="branch_name"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
                <div className="relative">
                  <label className="text-[1vw] font-semibold">
                    Select Bank Type
                    <span className="text-[1vw] pl-[0.25vw] text-red-500">
                      *
                    </span>
                  </label>
                  {/* <Field
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter City"
                    value={values.city}
                    autoComplete="off"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="border-b-[0.15vw]   border-[#535354]  text-[1vw] h-[2.5vw] w-full outline-none  placeholder:text-[1vw] "
                  /> */}

                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          optionActiveBg: "#C0C6FF",
                          optionSelectedColor: "#FFF",
                          optionSelectedBg: "#3348FF",
                          optionHeight: "2",
                        },
                      },
                    }}
                  >
                    <Select
                      showSearch
                      //   value={values.business}
                      onChange={(value) => {
                        handleChange({
                          target: { name: "acc_type", value },
                        });
                      }}
                      name="acc_type"
                      placement="bottomRight"
                      listHeight={250}
                      className="border-b-[0.15vw] outline-none border-[#535354]  text-[1vw] h-[2.5vw] w-full placeholder:text-[1vw] "
                      placeholder="Select Bank Type"
                      filterOption={
                        (input, option) =>
                          option?.value
                            ?.toLowerCase()
                            ?.includes(input.toLowerCase()) // Make it case-insensitive
                      }
                      value={values.acc_type}
                      optionFilterProp="value"
                      suffixIcon={
                        <span style={{ fontSize: "1vw", color: "#3348FF" }}>
                          <IoMdArrowDropup size="2vw" />
                        </span>
                      }
                      style={{ padding: 0 }}
                      options={acc_type}
                    />
                  </ConfigProvider>
                  {/* <Field
                    as="select"
                    name="acc_type"
                    value={values.acc_type}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="border-b-[0.15vw]   border-[#535354]  text-[1vw] h-[2.5vw] w-full outline-none  placeholder:text-[1vw] "
                  >
                    <option label="Select Bank Type" value="" className="" />
                    <option
                      label="Proprietorship"
                      value="Proprietorship"
                      className=""
                    />
                    <option
                      label="Partnership"
                      value="Partnership"
                      className=""
                    />
                    <option
                      label="Private Limited"
                      value="Private Limited"
                      className=""
                    />
                    <option
                      label="Public Sector"
                      value="Public Sector"
                      className=""
                    />
                  </Field> */}
                  <ErrorMessage
                    name="acc_type"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
              </div>
              <div className="flex float-end px-[2vw]  pb-[2vw]  gap-x-[1vw]">
                <div
                  className="border-[#FF9797] rounded-full w-[8vw] py-[0.1vw] px-[0.1vw] border-[0.1vw] cursor-pointer"
                  onClick={() => setCurrentTab(1)}
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
                        {Get_ById[0]?.acc_id ? "Update" : "Submit"}
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
