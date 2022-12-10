import { useReducer } from "react";
function GetShowtimes(state, { type, payload }) {
  switch (type) {
    case "ADDSHOWTIME":
      return { ...state, showtimes: payload };
    case "GETROOMS":
      return { ...state, rooms: payload };
    case "GET_TIMELINE":
      return { ...state, timeline: payload };
    default:
      return state;
  }
}

function ListShowtime() {
  return useReducer(GetShowtimes, []);
}

export default ListShowtime;
