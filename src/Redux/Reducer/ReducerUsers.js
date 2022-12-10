import { useReducer } from "react";
function GetUser(state, { type, payload }) {
  switch (type) {
    case "GET_ALL":
      return { ...state, users: payload };
    case "GET_DETAIL":
      const found = state.users.find((item) => item.tentaiKhoan === payload);
      // console.log(">> GET_DETAIL", found);
      if (found) return { ...state, detail: found };
      break;
    case "GET_TOP_10":
      // console.log(">> GET_TOP_10", payload);
      return { ...state, top10Users: payload };
    case "GET_DETAIL_ADMIN":
      // console.log(">> GET_DETAIL_ADMIN", payload);
      return { ...state, adminDetail: payload };
    default:
      return state;
  }
}

function Users() {
  return useReducer(GetUser, []);
}

export default Users;
