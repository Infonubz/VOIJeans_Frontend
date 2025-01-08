import axios from "axios";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_URL;

export const VoiJeansLogin = async (values, validationResult) => {
  const Voipayload = {
    email: values.email_id,
    password: values.password,
  };

  const url = `${apiUrl}/login`;
  const method = "post";
  const payload = Voipayload;

  try {
    const response = await axios({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data, "ghjk");

    if (response?.data?.error) {
      toast.warning(response.data.error);
    } else {
      sessionStorage.setItem("USER_ID", response.data.userId);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("User_name", response.data.user_name);
      sessionStorage.setItem("User_email", response.data.user_email);

      return response.data;
    }
  } catch (error) {
    console.log(error, "fghj");

    if (error.response.data.error) {
      toast.warning(error.response.data.error);
    } else {
      console.log(
        error?.response?.data?.message,
        "An error occurred. Please try again."
      );
      toast.error(error?.response?.data?.message);
    }
    return null;
  }
};

export const InnofashionLogin = async (values, validationResult) => {
  const Voipayload = {
    email: values.email_id,
    password: values.password,
  };

  const url = `${apiUrl}/innoFashion-login`;
  const method = "post";
  const payload = Voipayload;

  try {
    const response = await axios({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data, "ghjk");

    if (response?.data?.error) {
      toast.warning(response.data.error);
    } else {
      sessionStorage.setItem("USER_ID", response.data.userId);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("User_name", response.data.user_name);
      sessionStorage.setItem("User_email", response.data.user_email);
      return response.data;
    }
  } catch (error) {
    console.log(error, "fghj");

    if (error.response.data.error) {
      toast.warning(error.response.data.error);
    } else {
      console.log(
        error?.response?.data?.message,
        "An error occurred. Please try again."
      );
      toast.error(error?.response?.data?.message);
    }
    return null;
  }
};

