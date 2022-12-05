import { API_USER } from "../../common/ApiController";

export const getAllUserAction = ({ store }) => {
    let token = JSON.parse(localStorage.getItem("token"));
    fetch(API_USER.GET_ALL, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "GET",
    })
        .then((res) => res.json())
        .then((dt) => {
            store.users.UsersDispatch({
                type: "GET_ALL",
                payload: dt.data,
            });
        });
}
export const getDetailAdminAction = ({ store }) => {
    let token = JSON.parse(localStorage.getItem("token"));
    fetch(API_USER.GET_DETAIL_ADMIN, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "GET",
    })
        .then((res) => res.json())
        .then((dt) => {
            console.log(">> data user admin", dt.data[0])
            store.accounts.AdminDetailDispatch({
                type: "GET_DETAIL_ADMIN",
                payload: dt.data[0],
            });
        });

}
