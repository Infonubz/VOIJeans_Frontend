import React, { useState } from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Checkbox } from "antd";
import logingif from "../../Assets/login.gif";
import half from "../../Assets/half.png";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { InnofashionLogin, VoiJeansLogin } from "../../Api/Login/AllLogin";

const validationSchema = Yup.object().shape({
  email_id: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address format"
    )
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Innofashion() {
  const navigation = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, setAuthtoken }
  ) => {
    console.log("hihi");

    try {
      const data = await InnofashionLogin(values, setAuthtoken);

      toast.success(data?.message);
      console.log(data, "datadatadatadatadata");

      if (data?.token) {
        navigation("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(error, "test");

      if (error.response && error.response.status === 401) {
        setFieldError("password", "Invalid Password / Username");
        // toast.error("Invalid Password / Username");
      } else {
        toast.error(error.message);
      }
    }
  };
  return (
    <div>
      <div className=" flex flex-col items-center justify-center">
        <label className="text-[2.35vw]  tracking-wide text-center">
          Track Invoice & Interest
        </label>
        <Formik
          initialValues={{
            email_id: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(
            values,
            { setSubmitting, setFieldError, setAuthtoken }
          ) => {
            handleSubmit(values, {
              // setSubmitting,
              // setFieldError,
              // setAuthtoken,
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="gap-y-[2.5vw] mt-[3vw] flex-col w-full flex">
                <div className="col-span-1 relative w-full">
                  {/* <label className="text-[#3348FF] text-[1.1vw]">
    Email / Phone
    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
      *
    </span>
  </label> */}
                  <span className="absolute left-[1vw] bg-white rounded-full p-[0.5vw] top-1/2 transform -translate-y-1/2">
                    <MdEmail size={"1.2vw"} />
                  </span>
                  <Field
                    type="text"
                    name="email_id"
                    placeholder="Email ID "
                    className="bg-[#ECF6FF] pr-[1.5vw]  rounded-full placeholder-blue border-[#3348FF] text-[1.2vw] h-[3.5vw] w-[26vw] outline-none pl-[4vw]"
                  />
                  <ErrorMessage
                    name="email_id"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw]"
                  />
                </div>

                <div className="col-span-1 ">
                  {/* <label className="text-[#3348FF] text-[1.1vw] ">
                        Password
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label> */}
                  <div className="relative flex items-center">
                    <span className="absolute left-[1vw] bg-white rounded-full p-[0.5vw] top-1/2 transform -translate-y-1/2">
                      <IoMdLock size={"1.2vw"} />
                    </span>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="bg-[#ECF6FF] pr-[3vw] rounded-full placeholder-blue border-[#3348FF]  text-[1.2vw] h-[3.5vw] w-[26vw] outline-none pl-[4vw]"
                    />
                    <div
                      className="absolute right-[1vw] cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <FaEye className="text-[1.5vw] " />
                      ) : (
                        <FaEyeSlash className="text-[1.5vw] " />
                      )}
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw]"
                    />
                  </div>
                </div>

                <div className="mt-[0.5vw]">
                  <button
                    type="submit"
                    // disabled={isSubmitting}
                    className="w-[26vw] cursor-pointer flex justify-center py-[0.8vw]  border border-transparent rounded-full shadow-sm text-[1.3vw] font-semibold text-white bg-[#3348FF]"
                  >
                    LOGIN
                  </button>
                </div>
                <div className="flex justify-between items-center w-[26vw]">
                  <div>
                    <Checkbox
                      onChange={(e) => {}}
                      className="text-[#989898] text-[1.2vw] "
                    >
                      Remember me
                    </Checkbox>
                  </div>
                  <div>
                    <p
                      className="text-[#989898] text-[1.2vw] cursor-pointer"
                      //   onClick={() => setForgotPassword(true)}
                    >
                      Forgot Password
                    </p>
                  </div>
                </div>
                <label className="text-[0.9vw] text-center underline underline-offset-2 text-[#3348FF]">
                  @Innofashion
                </label>
                {/* <p className="text-center text-[0.8vw] text-[#3348FF]">
                      CRM Version V-1.02
                    </p> */}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
