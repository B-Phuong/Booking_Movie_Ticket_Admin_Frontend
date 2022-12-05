import { API_ROOMS } from "../../common/ApiController";

export const getAllRoomsAction = ({ store }) => {
    fetch(API_ROOMS.GET)
        .then((res) => res.json())
        .then((dt) => {
            store.lsRooms.GetRoomsDispatch({
                type: "GETROOMS",
                payload: dt.data,
            });
        });
}