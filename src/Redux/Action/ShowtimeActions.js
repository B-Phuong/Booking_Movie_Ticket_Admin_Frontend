import swal from "sweetalert";
import { API_SHOWTIMES } from "../../common/ApiController";
import swal2 from 'sweetalert2'
const spinner = () => {
    swal2.fire({
        title: 'Xin chờ giây lát',
        allowOutsideClick: false
    })
    swal2.showLoading()
}
export const addShowtimeAction = async ({ store, body, navigate, props }) => {

    spinner()
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(">> new Showtime", JSON.stringify(body))
    fetch(API_SHOWTIMES.ADD + props.slug + "/showtime", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
    })
        .then((res) => {
            swal2.close()
            if (res.status === 401) {
                swal({
                    title: "Vui lòng đăng nhập lại",
                    text: "Phiên đăng nhập đã hết hạn",
                    icon: "warning",
                    buttons: true,
                });
                setTimeout(function () {
                    localStorage.clear();
                    navigate("/");
                }, 1000);
            }
            if (res.status == 201) {
                swal({
                    title: "Thêm lịch chiếu thành công",
                    text: "",
                    icon: "success",
                });
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            } else return res.json();
        })
        .then((response) => {
            if (response != true) {
                store.movie.FailedShowtimesDispatch({
                    type: "GET_FAILEDSHOWTIMES",
                    payload: response.data
                });
                // console.log(">> response.data", response.data)
                swal({
                    title: "Thêm lịch chiếu thất bại",
                    text: response.error,
                    icon: "error",
                });
            }
        });
}

export const deleteShowtimeAction = async ({ store, body, navigate, slug }) => {
    spinner()
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(API_SHOWTIMES.DELETE + slug.slug + "/showtime", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify(body),
    })
        .then((res) => {
            swal2.close()
            if (res.status == 200) {
                swal({
                    title: "Xóa lịch chiếu thành công",
                    text: "",
                    icon: "success",
                });
                setTimeout(function () {
                    navigate(0);
                }, 1000);
            } else return res.json();
        })
        .then((response) => {
            if (response != true)
                return swal({
                    title: "Xóa lịch chiếu thất bại",
                    text: response.error,
                    icon: "error",
                });
        });
}