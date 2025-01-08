import {
  ACCOUNT_GET_BY_ID,
  ACCOUNT_LIST,
  DEBIT_NOTE_BY_ID,
  INNO_ACCOUNT_LIST,
  INNOFASHION_COUNT,
  INNOFASHION_DATE,
  INNOFASHION_INVOICE_LIST,
  INNOFASHION_OUTLET_LIST,
  NOTIFICATION_LIST,
  OUTLET_TRANSACTION_BY_ID,
  TRANSACTION_BY_ID,
  VOI_ACCOUNT_LIST,
  VOI_JEANS_INVOICE_BY_ID,
  VOI_JEANS_INVOICE_HSN_CODE,
  VOI_JEANS_INVOICE_LIST,
  VOI_JEANS_INVOICE_PRODUCTLIST_BY_ID,
  VOIJEANS__AGEING_COUNT,
  VOIJEANS_COUNT,
} from "./Type";

const initialState = {
  voi_jeans_list: [],
  voi_jeans_by_id: [],
  voi_jeans_productlist_by_id: [],
  voi_jeans_hsn_code: [],
  innofashion_list: [],
  debit_note: [],
  transaction_byid: [],
  inno_count: [],
  voi_count: [],
  inno_date: [],
  voi_ageing_count: [],
  outlet_list: [],
  outlet_trans: [],
  notification_list: [],
  voi_account_list: [],
  inno_account_list: [],
  account_byid: [],
};
export const akrreducer = (state = initialState, action) => {
  const { type, payload, payload_count } = action;
  switch (type) {
    case VOI_JEANS_INVOICE_LIST:
      console.log(payload, "voi_jeans_list");
      return {
        ...state,
        voi_jeans_list: payload,
      };
    case VOI_JEANS_INVOICE_BY_ID:
      console.log(payload, "voi_jeans_list");
      return {
        ...state,
        voi_jeans_by_id: payload,
      };
    case VOI_JEANS_INVOICE_PRODUCTLIST_BY_ID:
      console.log(payload, "voi_jeans_list888");
      return {
        ...state,
        voi_jeans_productlist_by_id: payload,
      };
    case VOI_JEANS_INVOICE_HSN_CODE:
      console.log(payload, "voi_jeans_list");
      return {
        ...state,
        voi_jeans_hsn_code: payload,
      };
    case INNOFASHION_INVOICE_LIST:
      console.log(payload, "voi_jeans_list");
      return {
        ...state,
        innofashion_list: payload,
      };
    case DEBIT_NOTE_BY_ID:
      console.log(payload, "888888");
      return {
        ...state,
        debit_note: [payload],
      };
    case TRANSACTION_BY_ID:
      console.log(payload, "888888");
      return {
        ...state,
        transaction_byid: payload,
      };
    case INNOFASHION_COUNT:
      console.log(payload, "888888");
      return {
        ...state,
        inno_count: payload,
      };
    case VOIJEANS_COUNT:
      console.log(payload, "888888");
      return {
        ...state,
        voi_count: payload,
      };
    case INNOFASHION_DATE:
      console.log(payload, "888888");
      return {
        ...state,
        inno_date: payload,
      };
    case VOIJEANS__AGEING_COUNT:
      console.log(payload, "888888");
      return {
        ...state,
        voi_ageing_count: payload,
      };
    case INNOFASHION_OUTLET_LIST:
      console.log(payload, "888888");
      return {
        ...state,
        outlet_list: payload,
      };
    case OUTLET_TRANSACTION_BY_ID:
      return {
        ...state,
        outlet_trans: payload,
      };
    case NOTIFICATION_LIST:
      return {
        ...state,
        notification_list: payload,
      };

    case VOI_ACCOUNT_LIST:
      return {
        ...state,
        voi_account_list: payload,
      };
    case INNO_ACCOUNT_LIST:
      return {
        ...state,
        inno_account_list: payload,
      };
    case ACCOUNT_GET_BY_ID:
      return {
        ...state,
        account_byid: payload,
      };
    default:
      return state;
  }
};
