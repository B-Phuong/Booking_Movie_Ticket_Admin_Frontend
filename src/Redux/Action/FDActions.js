import { API_FOODDRINKS } from "../../common/ApiController";
import swal from "sweetalert";
import swal2 from 'sweetalert2'
const spinner = () => {
    swal2.fire({
        title: 'Xin chờ giây lát',
        allowOutsideClick: false
    })
    swal2.showLoading()
}
export const addFDAction = async ({ store, fd, navigate }) => {
    spinner()
    const token = JSON.parse(localStorage.getItem("token"));
    let res = await fetch(API_FOODDRINKS.ADD, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: fd,
    });
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
            navigate("/signIn");
        }, 1000);
    }
    if (res.status === 201) {
        swal({
            title: "Thêm thành công!",
            text: "",
            icon: "success",
            buttons: false,
        });
        setTimeout(function () {
            navigate(0);
        }, 1000);
    } else
        swal({
            title: "Thêm thất bại",
            text: "Hãy thử lại",
            icon: "warning",
            dangerMode: true,
        });
}

export const editFDAction = async ({ store, fd, biDanh, navigate, setShow }) => {
    spinner()
    const token = JSON.parse(localStorage.getItem("token"));
    let res = await fetch(API_FOODDRINKS.UPDATE + biDanh, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: fd,
    });
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
            navigate("/signIn");
        }, 1000);
    }
    if (res.status === 200) {
        swal({
            title: "Cập nhật thành công!",
            text: "",
            icon: "success",
            buttons: false,
        });
        setTimeout(function () {
            setShow(false);
        }, 1000);
    } else
        swal({
            title: "Cập nhật thất bại",
            text: "Hãy thử lại",
            icon: "warning",
            dangerMode: true,
        });
}

export const getDetailFDAction = async ({ store, setDetailFD, setLoading, biDanh }) => {
    fetch(API_FOODDRINKS.DETAIL + biDanh)
        .then((res) => res.json())
        .then((dt) => {
            store.fooddrinks.GetDetailFDDispatch({
                type: "GETDETAILFOODDRINK",
                payload: dt.data[0],
            });
            setDetailFD({
                tenCombo: dt.data?.tenCombo,
                moTa: dt.data?.moTa,
                ghiChu: dt.data?.ghiChu,
                giaGoc: dt.data?.giaGoc,
                hinhAnh: dt.data?.hinhAnh,
                giamGia: dt.data?.giamGia,
                soLuongBan: dt.data?.soLuongBan.toString(),
            });

            setLoading(false);
        });
}

export const getAllFDsAction = async ({ store }) => {
    fetch(API_FOODDRINKS.GET_ALL)
        .then((res) => res.json())
        .then((dt) => {
            store.fooddrinks.GetAllDispatch({
                type: "GETALLFOODDRINKS",
                payload: dt.data,
            });
        });
}

export const deleteFDAction = async ({ store, props, navigate }) => {
    spinner()
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(">> props", props.biDanh)
    let res = await fetch(API_FOODDRINKS.DELETE + props.biDanh, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "DELETE",
    });
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
            navigate("/signIn");
        }, 1000);
    }
    if (res.status === 200) {
        swal({
            title: "Xóa combo thành công!",
            text: "",
            icon: "success",
            buttons: false,
        });

    } else
        swal({
            title: "Xóa combo thất bại",
            text: "Hãy thử lại",
            icon: "warning",
            dangerMode: true,
        });
}
