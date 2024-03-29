import { useReducer } from "react";
import { SIGN_IN } from "../Constant/accountConst";
function GetAccount(state, { type, payload }) {
  switch (type) {
    case "SIGN_IN":
      return { account: payload };
    case "INITIAL":
      return { account: payload };
    case "PROFILE":
      return { profile: payload };
    default:
      return state;
  }
}

function Accounts() {
  return useReducer(GetAccount, []);
}

export default Accounts;
