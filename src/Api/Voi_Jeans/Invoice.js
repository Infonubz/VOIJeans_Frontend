import axios from "axios";
import { toast } from "react-toastify";
import {
  ACCOUNT_GET_BY_ID,
  ACCOUNT_LIST,
  INNO_ACCOUNT_LIST,
  NOTIFICATION_LIST,
  VOI_ACCOUNT_LIST,
  VOI_JEANS_INVOICE_BY_ID,
  VOI_JEANS_INVOICE_HSN_CODE,
  VOI_JEANS_INVOICE_LIST,
  VOI_JEANS_INVOICE_PRODUCTLIST_BY_ID,
  VOIJEANS__AGEING_COUNT,
  VOIJEANS_COUNT,
} from "../../Store/Type";

const apiUrl = process.env.REACT_APP_API_URL;

export const Get_Voijeans_Invoice_List = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/voijeans-invoice-list`);
    dispatch({ type: VOI_JEANS_INVOICE_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const Get_Voijeans_Count = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/voijeans-count`);
    dispatch({ type: VOIJEANS_COUNT, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const Get_Voijeans_Ageing_Count = async (dispatch) => {
  console.log("dxfcghjhgbfc");

  try {
    const response = await axios.get(`${apiUrl}/count-credit-periods`);
    dispatch({ type: VOIJEANS__AGEING_COUNT, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const Get_Voijeans_Status_By_Id = async (dispatch, status, module) => {
  console.log(module, "testinghjkl8888");
  const status_id =
    status === 1
      ? 5
      : status === 2
      ? 0
      : status === 3
      ? 6
      : status === 4
      ? 2
      : status === 5
      ? 4
      : status === 8
      ? 8
      : status === 9
      ? 9
      : 1;
  const status_id_2 =
    status === 1
      ? 7
      : status === 2
      ? 1
      : status === 3
      ? 2
      : status === 4
      ? 3
      : status === 5
      ? 4
      : 1;
  try {
    const response = await axios.get(
      `${apiUrl}/voijeans-invoice/${
        module === "invoice" ? status_id : status_id_2
      }`
    );
    dispatch({ type: VOI_JEANS_INVOICE_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const Get_Voijeans_Invoice_By_Id = async (dispatch, invoiceno) => {
  try {
    const response = await axios.get(
      `${apiUrl}/voijeans-invoice-list/${invoiceno}`
    );
    dispatch({ type: VOI_JEANS_INVOICE_BY_ID, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const Get_Voijeans_Search = async (
  dispatch,
  invoiceno,
  status,
  page
) => {
  const status_id =
    status === 1
      ? 5
      : status === 2
      ? 0
      : status === 3
      ? 6
      : status === 4
      ? 2
      : status === 5
      ? 4
      : status === 8
      ? 8
      : 1;
  const status_id_2 =
    status === 1
      ? 7
      : status === 2
      ? 1
      : status === 3
      ? 2
      : status === 4
      ? 3
      : status === 5
      ? 4
      : 1;
  try {
    const response = await axios.get(
      `${apiUrl}/voijeans-search/${
        page == "invoice" ? status_id : status_id_2
      }/${invoiceno}`
    );
    dispatch({ type: VOI_JEANS_INVOICE_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const Get_Voijeans_Invoice_ProductList_By_Id = async (
  dispatch,
  invoiceno
) => {
  try {
    const response = await axios.get(`${apiUrl}/voijeans/${invoiceno}`);
    dispatch({
      type: VOI_JEANS_INVOICE_PRODUCTLIST_BY_ID,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const Get_Voijeans_Invoice_HSN_Code = async (dispatch, invoiceno) => {
  try {
    const response = await axios.get(`${apiUrl}/voijeans-hsncode/${invoiceno}`);
    dispatch({
      type: VOI_JEANS_INVOICE_HSN_CODE,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const VoiJeansRequest = async (
  Get_Voijeans_list,
  SelectedPercentage,
  reqamt,
  dispatch,
  creditValue
) => {
  console.log(typeof Number(reqamt), "reqamtreqamtreqamt");
  const stringValue = "5,488";
  const integerValue = parseInt(stringValue.replace(/,/g, ""), 10);

  console.log(integerValue, "integerValue"); // Output: 5488

  const Voipayload = {
    voi_advance_request_id: 1,
    voi_advance_request: "Requested",
    advance_amount: reqamt,
    in_advance_request_id: 4,
    in_advance_request: "Make Payment",
    advance_percentage: SelectedPercentage,
    balance_amount: Math.round(Get_Voijeans_list.net_amount) - reqamt,
    credit_period: creditValue,
  };

  const url = `${apiUrl}/voijeans-invoice-list/${Get_Voijeans_list.invoice_no}`;
  const method = "put";
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
    console.log(response?.data, "ghjk");
    toast.success(response?.data?.message);
    // setShowStatus(false);
    Get_Voijeans_Status_By_Id(dispatch, 2, "invoice");
  } catch (error) {
    console.log(error, "fghjsssssssss");

    if (error?.response?.data?.error) {
      toast.warning(error?.response?.data?.error);
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
export const Get_Notification_List = async (dispatch) => {
  const user_id = sessionStorage.getItem("USER_ID");

  try {
    const response = await axios.get(
      `${apiUrl}/${user_id === "INNO001" ? "innofashion" : "voi-jeans"}`
    );
    dispatch({ type: NOTIFICATION_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const NotificationUpdate = async (dispatch, value, id) => {
  const user_id = sessionStorage.getItem("USER_ID");
  const payloaddata = {
    is_read: value,
  };

  const url = `${apiUrl}/${
    user_id === "INNO001" ? "innofashion" : "voi-jeans"
  }/${id}`;
  const method = "put";
  const payload = payloaddata;

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
      Get_Notification_List(dispatch);
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
export const Get_Voi_Account_List = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/voi-jeans-bank-details`);
    dispatch({ type: VOI_ACCOUNT_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const Get_Inno_Account_List = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/innofashion-bank-details`);
    dispatch({ type: INNO_ACCOUNT_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const Get_Voi_Account_By_ID = async (dispatch, id) => {
  try {
    const response = await axios.get(`${apiUrl}/voi-jeans-bank-details/${id}`);
    dispatch({ type: ACCOUNT_GET_BY_ID, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};

export const Delete_account = async (dispatch, id) => {
  const user_id = sessionStorage.getItem("USER_ID");
  try {
    const response = await axios.delete(
      `${apiUrl}/${
        user_id === "INNO001"
          ? "innofashion-bank-details"
          : "voi-jeans-bank-details"
      }/${id}`
    );
    toast.success(response?.data);
    if (user_id === "INNO001") {
      Get_Inno_Account_List(dispatch);
    } else {
      Get_Voi_Account_List(dispatch);
    }
    // dispatch({ type: ACCOUNT_GET_BY_ID, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const Get_Inno_Account_By_ID = async (dispatch, id) => {
  try {
    const response = await axios.get(
      `${apiUrl}/innofashion-bank-details/${id}`
    );
    dispatch({ type: ACCOUNT_GET_BY_ID, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const AccountSubmit = async (value, dispatch, setCurrentTab, id) => {
  console.log(value, "valuevaluevaluevalue");

  const accpayload = {
    acc_holder_name: value?.acc_holder_name,
    acc_no: value?.acc_no,
    bank_name: value?.bank_name,
    ifsc_code: value?.ifsc_code,
    branch_name: value?.branch_name,
    acc_type: value.acc_type,
  };
  const user_id = sessionStorage.getItem("USER_ID");
  console.log(id, "idididwsssssssid");

  const url = id
    ? `${apiUrl}/${
        user_id === "INNO001"
          ? "innofashion-bank-details"
          : "voi-jeans-bank-details"
      }/${id}`
    : `${apiUrl}/${
        user_id === "INNO001"
          ? "innofashion-bank-details"
          : "voi-jeans-bank-details"
      }`;
  const method = id ? "put" : "post";
  const payload = accpayload;

  try {
    const response = await axios({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response, "responseresponse");
    setCurrentTab(1);
    toast.success(response?.data);
    const user_id = sessionStorage.getItem("USER_ID");
    dispatch({
      type: ACCOUNT_GET_BY_ID,
      payload: [],
    });
    if (user_id === "INNO001") {
      Get_Inno_Account_List(dispatch);
    } else {
      Get_Voi_Account_List(dispatch);
    }
  } catch (error) {
    console.log(error, "fghjsssssssss");

    if (error?.response?.data?.error) {
      toast.warning(error?.response?.data?.error);
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
const handleError = (error) => {
  console.error("Error details:", error);
  let errorMessage = "An error occurred";

  if (error.response) {
    console.error("Error response from server:", error.response);
    errorMessage = `Server responded with status ${error.response.status}`;
  } else if (error.request) {
    console.error("No response received:", error.request);
    errorMessage = "No response received from server";
  } else {
    console.error("Error setting up request:", error.message);
    errorMessage = error.message;
  }

  if (error.code === "ERR_NETWORK") {
    errorMessage =
      "Network Error: Unable to connect to the server. Please check the server status and your network connection.";
  }
  if (error.code === "ERR_CONNECTION_REFUSED") {
    errorMessage =
      "Network Error: Unable to connect to the server. Please check the server status and your network connection.";
  }
  toast.error(errorMessage);
};
