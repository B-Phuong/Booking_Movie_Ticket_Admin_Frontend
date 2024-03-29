import swal from "sweetalert";
import { API_SHOWTIMES } from "../../common/ApiController";

export const addShowtimeAction = async ({ store, body, navigate, props }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(API_SHOWTIMES.ADD + props.slug + "/showtime", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
    })
        .then((res) => {
            if (res.status === 401) {
                swal({
                    title: "Vui lòng đăng nhập lại",
                    text: "Phiên đăng nhập đã hết hạn",
                    icon: "warning",
                    buttons: true,
                });
                setTimeout(function () {
                    localStorage.clear();
                    navigate("/signIn");
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
            if (response != true)
                return swal({
                    title: "Thêm lịch chiếu thất bại",
                    text: response.error,
                    icon: "error",
                });
        });
}

export const deleteShowtimeAction = async ({ store, body, navigate, slug }) => {
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