import { useReducer } from "react";
function GetShowtimes(state, { type, payload }) {
  switch (type) {
    case "ADDSHOWTIME":
      return { ...state, showtimes: payload };
    case "GETROOMS":
      return { ...state, rooms: payload };
    case "GET_TIMELINE":
      return { ...state, timeline: payload };
    case "GET_FAILEDSHOWTIMES":
      return { ...state, failed: payload };
    default:
      return state;
  }
}

function ListShowtime() {
  return useReducer(GetShowtimes, []);
}

export default ListShowtime;
