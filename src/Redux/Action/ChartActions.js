import { API_ACCOUNTS, API_CHARTS } from "../../common/ApiController";
import swal from 'sweetalert'
import Reducer from '../Reducer/ReducerAccounts'
import { SIGN_IN } from "../Constant/accountConst";
import { useContext } from "react";
import { StoreContext } from "../Store/Store";
let token = JSON.parse(localStorage.getItem("token"));
export const getStaticAction = async ({ store }) => {
    let res = await fetch(API_CHARTS.GETTICKETS, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "GET",
    })
    let response = await res.json()
    let getYear = (date) => {
        return new Date(date).getFullYear()
    }
    // console.log(">> response by year", new Date(response.data[0].thoiGianDat).getFullYear())//.getYear())
    // console.log(">> this ysear", new Date().getFullYear())
    let sum = function (items, prop) {
        return items.reduce(function (a, b) {
            return a + b[prop];
        }, 0);
    };

    let filterByYear = response.data.filter((item) => getYear(item.thoiGianDat) === Number("2022"))
    // console.log(">> filterByYear", filterByYear)
    let total = sum(filterByYear, 'tienThanhToan')
    // console.log(">> total", total)
    store.ticketBooking.GetStatisticalDispatch({
        type: "GET_BY_YEAR",
        payload: total
    });
}

export const getQuarterlyRevenueAction = ({ store, info }) => {
    fetch(API_CHARTS.GETREVENUE, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(info),
    })
        .then((res) => res.json())
        .then(async (dt) => {
            await store.ticketBooking.GetTicketsByTimeDispatch({
                type: "GETTICKETSBYTIME",
                payload: dt.data,
            });
            // console.log(">> in useEffect", dt.data);
        });
}
export const getShowtimeTicketSold = async ({ store }) => {
    let res = await fetch(API_CHARTS.GETTICKETS, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "GET",
    })
    let data = await res.json()
    store.ticketBooking.TicketBookingDispatch({
        type: "GETTICKETBOOKINGS",
        payload: data.data,
    });
    // console.log(">> CALL GET", data)
}

export const getTop10User = async ({ store }) => {
    getShowtimeTicketSold({ store })
    let data = store.ticketBooking?.GetAllTicketBooking?.lsTicketBookings
    // console.log(">> dataa", data)
    let dateFilter = [];
    if (data != undefined)
        data?.forEach((item) => {
            let idUser = item.tentaiKhoan;
            const found = dateFilter.find((el) => el.user === idUser.tentaiKhoan);
            // console.log(">> found", found);
            if (!found)
                dateFilter.push({
                    user: idUser.tentaiKhoan,
                    total: item.tienThanhToan ? item.tienThanhToan : 0,
                });
            else {
                found.total += item.tienThanhToan;
            }
        });
    store.charts.Top10UsersDispatch({
        type: "GET_TOP_10",
        payload: dateFilter,
    });
    // console.log(">> dateFilter user", dateFilter);
}

export const getRevenueByTheater = async ({ store }) => {
    let res = await fetch(API_CHARTS.GET_REVENUE_BY_THEATER, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "GET",
    })
    let data = await res.json()
    store.charts.RevenueByTheaterDispatch({
        type: "REVENUE_BY_THEATER",
        payload: data.data,
    });
}

export const getTimelineOfShowtime = async ({ store }) => {
    let res = await fetch(API_CHARTS.GET_TIMELINE_SHOWTIME, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "GET",
    })
    let data = await res.json()
    // console.log(">> GET timeline", data)
    store.charts.TimelineOfShowtimeDispatch({
        type: "GET_TIMELINE",
        payload: data.data,
    });
}