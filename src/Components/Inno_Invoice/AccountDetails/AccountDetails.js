import React, { useEffect, useState } from "react";
import TableList from "./Table";
import AddAccount from "./Add";
import {
  Get_Inno_Account_List,
  Get_Voi_Account_List,
  Get_Voijeans_Invoice_List,
} from "../../../Api/Voi_Jeans/Invoice";
import { useDispatch } from "react-redux";
import { ACCOUNT_GET_BY_ID } from "../../../Store/Type";

export default function AccountDetails() {
  const Tabnames = [
    {
      id: 1,
      Tab: "Bank Account List",
    },
    {
      id: 2,
      Tab: "Add Bank Account",
    },
  ];
  const [currentTab, setCurrentTab] = useState(1);
  const dispatch = useDispatch();
  const user_id = sessionStorage.getItem("USER_ID");

  useEffect(() => {
    if (user_id === "INNO001") {
      Get_Inno_Account_List(dispatch);
    } else {
      Get_Voi_Account_List(dispatch);
    }
  }, []);
  useEffect(() => {
    if (currentTab === 1) {
      dispatch({
        type: ACCOUNT_GET_BY_ID,
        payload: [],
      });
    }
  }, [currentTab]);
  return (
    <div>
      <div>
        <div className="flex items-center py-[1vw] px-[2vw] gap-x-[2vw]">
          {Tabnames.map((item) => (
            <div
              className={`cursor-pointer w-[15vw] ${
                currentTab === item.id
                  ? "border-b-[0.2vw] font-semibold   border-[#3348FF]"
                  : ""
              } `}
              onClick={() => setCurrentTab(item.id)}
            >
              <div className="text-[1.2vw]  text-center">{item.Tab}</div>
            </div>
          ))}
        </div>
        {currentTab === 1 ? (
          <TableList setCurrentTab={setCurrentTab} />
        ) : (
          <AddAccount setCurrentTab={setCurrentTab} />
        )}
      </div>
    </div>
  );
}
