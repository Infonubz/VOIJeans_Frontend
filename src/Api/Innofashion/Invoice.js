import axios from "axios";
import { toast } from "react-toastify";
import {
  DEBIT_NOTE_BY_ID,
  INNOFASHION_COUNT,
  INNOFASHION_DATE,
  INNOFASHION_INVOICE_LIST,
  TRANSACTION_BY_ID,
} from "../../Store/Type";

const apiUrl = process.env.REACT_APP_API_URL;
export const Get_Innofashion_Invoice_List = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/innofashion-invoice-list`);
    dispatch({ type: INNOFASHION_INVOICE_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const Get_Innofashion_Count = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/innofashion-count`);
    dispatch({ type: INNOFASHION_COUNT, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const Get_Innfashion_Status_By_Id = async (dispatch, status, module) => {
  console.log(module, "testinghjkl8888");
  const status_id = status === 1 ? 5 : status === 2 ? 0 : status === 3 ? 1 : 4;
  const status_id_2 =
    status === 1
      ? 6
      : status === 2
      ? 4
      : status === 3
      ? 2
      : status === 4
      ? 3
      : status === 8
      ? 8
      : 1;
  try {
    const response = await axios.get(
      `${apiUrl}/innofashion-invoice/${
        module === "invoice" ? status_id : status_id_2
      }`
    );
    dispatch({ type: INNOFASHION_INVOICE_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const InnofashionRequest = async (
  value,
  dispatch,
  invoiceno,
  page,
  command,
  setError,
  setCommand,
  currentTab,
  fullamt
) => {
  console.log(value, currentTab, fullamt, page, "8888888888888");

  const Voipayload = {
    voi_advance_request_id: null,
    voi_advance_request: null,
    in_advance_request_id: null,
    in_advance_request: null,
    payment_status_id: null,
    payment_status: null,
    comment: command,
  };
  // if (page === "invoice") {
  if (currentTab === 2) {
    if (value === 1) {
      Voipayload.voi_advance_request_id = 9;
      Voipayload.voi_advance_request = "Closed";
      Voipayload.in_advance_request_id = 9;
      Voipayload.in_advance_request = "Closed";
      Voipayload.payment_status_id = 2;
      Voipayload.payment_status = "Paid";
    } else if (value === 2) {
      Voipayload.voi_advance_request_id = 3;
      Voipayload.voi_advance_request = "On Hold";
      Voipayload.in_advance_request_id = value;
      Voipayload.in_advance_request = "On Hold";
      Voipayload.payment_status_id = 0;
      Voipayload.payment_status = "Unpaid";
    } else {
      Voipayload.voi_advance_request_id = 4;
      Voipayload.voi_advance_request = "Rejected";
      Voipayload.in_advance_request_id = value;
      Voipayload.in_advance_request = "Rejected";
      Voipayload.payment_status_id = 0;
      Voipayload.payment_status = "Unpaid";
    }
  } else {
    if (value === 1) {
      Voipayload.voi_advance_request_id = 9;
      Voipayload.voi_advance_request = "Closed";
      Voipayload.in_advance_request_id = 9;
      Voipayload.in_advance_request = "Closed";
      Voipayload.payment_status_id = 2;
      Voipayload.payment_status = "Paid";
    } else if (value === 2) {
      Voipayload.voi_advance_request_id = 3;
      Voipayload.voi_advance_request = "On Hold";
      Voipayload.in_advance_request_id = value;
      Voipayload.in_advance_request = "On Hold";
      Voipayload.payment_status_id = 0;
      Voipayload.payment_status = "Unpaid";
    } else {
      Voipayload.voi_advance_request_id = 4;
      Voipayload.voi_advance_request = "Rejected";
      Voipayload.in_advance_request_id = value;
      Voipayload.in_advance_request = "Rejected";
      Voipayload.payment_status_id = 0;
      Voipayload.payment_status = "Unpaid";
    }
  }
  // } else {
  //   if (currentTab === 2) {
  //     if (value === 1) {
  //       Voipayload.voi_advance_request_id = 2;
  //       Voipayload.voi_advance_request = "Advance Paid";
  //       Voipayload.in_advance_request_id = value;
  //       Voipayload.in_advance_request = "Advance Paid";
  //       Voipayload.payment_status_id = 1;
  //       Voipayload.payment_status = "Partialy Paid";
  //     } else if (value === 2) {
  //       Voipayload.voi_advance_request_id = 3;
  //       Voipayload.voi_advance_request = "On Hold";
  //       Voipayload.in_advance_request_id = value;
  //       Voipayload.in_advance_request = "On Hold";
  //       Voipayload.payment_status_id = 0;
  //       Voipayload.payment_status = "Unpaid";
  //     } else {
  //       Voipayload.voi_advance_request_id = 4;
  //       Voipayload.voi_advance_request = "Rejected";
  //       Voipayload.in_advance_request_id = value;
  //       Voipayload.in_advance_request = "Rejected";
  //       Voipayload.payment_status_id = 0;
  //       Voipayload.payment_status = "Unpaid";
  //     }
  //   } else {
  //     if (value === 1) {
  //       Voipayload.voi_advance_request_id = 2;
  //       Voipayload.voi_advance_request = "Advance Paid";
  //       Voipayload.in_advance_request_id = value;
  //       Voipayload.in_advance_request = "Advance Paid";
  //       Voipayload.payment_status_id = 1;
  //       Voipayload.payment_status = "Partialy Paid";
  //     } else if (value === 2) {
  //       Voipayload.voi_advance_request_id = 3;
  //       Voipayload.voi_advance_request = "On Hold";
  //       Voipayload.in_advance_request_id = value;
  //       Voipayload.in_advance_request = "On Hold";
  //       Voipayload.payment_status_id = 0;
  //       Voipayload.payment_status = "Unpaid";
  //     } else {
  //       Voipayload.voi_advance_request_id = 4;
  //       Voipayload.voi_advance_request = "Rejected";
  //       Voipayload.in_advance_request_id = value;
  //       Voipayload.in_advance_request = "Rejected";
  //       Voipayload.payment_status_id = 0;
  //       Voipayload.payment_status = "Unpaid";
  //     }
  //   }
  // }
  if (page === "invoice") {
    if (value === 1) {
      Voipayload.voi_advance_request_id = 9;
      Voipayload.voi_advance_request = "Closed";
      Voipayload.in_advance_request_id = 9;
      Voipayload.in_advance_request = "Closed";
      Voipayload.payment_status_id = 2;
      Voipayload.payment_status = "Paid";
    } else if (value === 2) {
      Voipayload.voi_advance_request_id = 3;
      Voipayload.voi_advance_request = "On Hold";
      Voipayload.in_advance_request_id = value;
      Voipayload.in_advance_request = "On Hold";
      Voipayload.payment_status_id = 0;
      Voipayload.payment_status = "Unpaid";
    } else {
      Voipayload.voi_advance_request_id = 4;
      Voipayload.voi_advance_request = "Rejected";
      Voipayload.in_advance_request_id = value;
      Voipayload.in_advance_request = "Rejected";
      Voipayload.payment_status_id = 0;
      Voipayload.payment_status = "Unpaid";
    }
  } else {
    if (value === 1) {
      Voipayload.voi_advance_request_id = 2;
      Voipayload.voi_advance_request = "Advance Paid";
      Voipayload.in_advance_request_id = value;
      Voipayload.in_advance_request = "Advance Paid";
      Voipayload.payment_status_id = 1;
      Voipayload.payment_status = "Partially Paid";
    } else if (value === 2) {
      Voipayload.voi_advance_request_id = 3;
      Voipayload.voi_advance_request = "On Hold";
      Voipayload.in_advance_request_id = value;
      Voipayload.in_advance_request = "On Hold";
      Voipayload.payment_status_id = 0;
      Voipayload.payment_status = "Unpaid";
    } else {
      Voipayload.voi_advance_request_id = 4;
      Voipayload.voi_advance_request = "Rejected";
      Voipayload.in_advance_request_id = value;
      Voipayload.in_advance_request = "Rejected";
      Voipayload.payment_status_id = 0;
      Voipayload.payment_status = "Unpaid";
    }
  }

  console.log(command, "command852");

  const url = `${apiUrl}/voijeans-request/${invoiceno}`;
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
    setError(false);
    // setCommand("")
    console.log(response?.data, "ghjk");
    toast.success(response?.data?.message);
    // setShowStatus(false);
    if (currentTab === 3 && fullamt && value === 1) {
      Get_Innfashion_Status_By_Id(dispatch, 3, "invoice");
    } else if (currentTab === 3) {
      Get_Innfashion_Status_By_Id(dispatch, 3, "advreq");
    } else if (page === "invoice") {
      Get_Innfashion_Status_By_Id(dispatch, 2, "invoice");
    } else {
      Get_Innfashion_Status_By_Id(dispatch, 2, "advreq");
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
export const Get_Debit_Note_By_Id = async (dispatch, invoiceno) => {
  try {
    const response = await axios.get(`${apiUrl}/debit-note/${invoiceno}`);
    dispatch({
      type: DEBIT_NOTE_BY_ID,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const Get_Innofashion_Search = async (
  dispatch,
  invoiceno,
  status,
  page
) => {
  const status_id = status === 1 ? 5 : status === 2 ? 0 : status === 3 ? 1 : 4;
  const status_id_2 =
    status === 1
      ? 6
      : status === 2
      ? 4
      : status === 3
      ? 2
      : status === 4
      ? 3
      : status === 8
      ? 8
      : 1;
  try {
    const response = await axios.get(
      `${apiUrl}/innofashion-search/${
        page == "invoice" ? status_id : status_id_2
      }/${invoiceno}`
    );
    dispatch({ type: INNOFASHION_INVOICE_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const Get_Innofashion_Search_By_Date = async (
  dispatch,
  invoiceno,
  status,
  page
) => {
  try {
    const response = await axios.get(
      `${apiUrl}/innofashion-search/${1}/${invoiceno}`
    );
    dispatch({ type: INNOFASHION_DATE, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const TransactionSubmit = async (
  value,
  dispatch,
  invoiceno,
  currentTab,
  page,
  adv_paid_date
) => {
  const payloaddata = {
    voi_invoice_no: value.invoice_no,
    transaction_date:
      page != "invoice" ? value.transaction_date : adv_paid_date,
    from_bank_details: value.from_bank,
    to_bank_details: value.to_bank,
    transaction_amt: value.transaction_amt,
    remarks: "",
    transaction_id: value.transaction_id,
    voi_advance_request_id: page == "invoice" ? 9 : 2,
    voi_advance_request: page == "invoice" ? "Closed" : "Advance Paid",
    in_advance_request_id: page == "invoice" ? 9 : 1,
    in_advance_request: page == "invoice" ? "Closed" : "Make Payment",
    payment_status_id: page == "invoice" ? 2 : 1,
    payment_status: page == "invoice" ? "Paid" : "Partially Paid",
    comment: "",
    closing_date: page === "invoice" ? value.transaction_date : null,
    closing_amt: page === "invoice" ? value.transaction_amt : null,
  };

  const url = `${apiUrl}/transaction-details/${invoiceno}`;
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

    toast.success(response?.data?.message);
    // InnofashionRequest(1, dispatch, invoiceno, "invoice", "", false, 2, false);
    if (currentTab === 2) {
      Get_Innfashion_Status_By_Id(dispatch, 2, "advreq");
    } else if (currentTab === 3) {
      Get_Innfashion_Status_By_Id(dispatch, 3, "advreq");
    } else {
      Get_Innfashion_Status_By_Id(dispatch, 4, "advreq");
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
export const Get_Transaction_By_Id = async (dispatch, invoiceno) => {
  try {
    const response = await axios.get(
      `${apiUrl}/transaction-details/${invoiceno}`
    );
    dispatch({
      type: TRANSACTION_BY_ID,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
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
