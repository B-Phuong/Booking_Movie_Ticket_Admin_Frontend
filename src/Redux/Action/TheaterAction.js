import { API_THEATERS } from "../../common/ApiController";

export const getTheaterAction = async ({ store }) => {
    fetch(API_THEATERS.THEATERS)
        .then((res) => res.json())
        .then((dt) => {
            store.lsTheater.TheaterDispatch({
                type: "GETTHEATERS",
                payload: dt.data,
            });
        });
}