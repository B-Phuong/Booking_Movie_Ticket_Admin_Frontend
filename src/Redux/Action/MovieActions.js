import swal from "sweetalert";
import { API_MOVIE } from "../../common/ApiController";
import swal2 from 'sweetalert2'
const spinner = () => {
    swal2.fire({
        title: 'Xin chờ giây lát',
        allowOutsideClick: false
    })
    swal2.showLoading()
}
export const addMovieAction = async ({ store, fd, navigate }) => {
    spinner()
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(API_MOVIE.ADD, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: fd,
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
                    navigate("/signIn");
                }, 1000);
            }
            if (res.status == 201) {
                swal({
                    title: "Thêm phim thành công",
                    text: "",
                    icon: "success",
                });
                setTimeout(function () {
                    navigate(0);
                }, 1000);
            } else return res.json();
        })
        .then((response) => {
            swal2.close()
            // console.log("response", response);
            if (response != true)
                return swal({
                    title: "Thêm phim thất bại",
                    text: response.error,
                    icon: "error",
                });
        });
}

export const editMovieAction = async ({ store, fd, navigate, biDanh, setIsEdit }) => {
    spinner()
    const token = JSON.parse(localStorage.getItem("token"));
    let res = await fetch(API_MOVIE.UPDATE + biDanh, {
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
            buttons: true,
        });
        setIsEdit(false);
        setTimeout(function () {
            navigate(0);
        }, 1000);
    } else
        swal({
            title: "Cập nhật thất bại",
            text: "Hãy thử lại",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
}

export const deleteMovieAction = async ({ props, navigate }) => {
    spinner()
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(API_MOVIE.DELETE + props.biDanh, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "DELETE",
    })
        .then((res) => {
            swal2.close()
            if (res.status == 200) {
                swal({
                    title: "Xóa phim thành công",
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
                    title: "Xóa phim thất bại",
                    text: response.error,
                    icon: "error",
                });
        });
}

export const getComingMoviesAction = async ({ store }) => {
    fetch(API_MOVIE.COMING)
        .then((res) => res.json())
        .then((dt) => {
            store.lsComingMovie.ComingMovieDispatch({
                type: "GETCOMINGMOVIES",
                payload: dt.data,
            });
        });
}

export const getShowingMoviesAction = async ({ store }) => {
    fetch(API_MOVIE.SHOWING)
        .then((res) => res.json())
        .then((dt) => {
            store.lsShowingMovie.ShowingMovieDispatch({
                type: "GETSHOWINGMOVIES",
                payload: dt.data,
            });
        });
}

export const getDetailMovieAction = async ({ store, setLoading, slug }) => {
    fetch(API_MOVIE.DETAIL + slug.slug)
        .then((res) => res.json())
        .then((dt) => {
            store.movie.DetailMovieDispatch({
                type: "GETDETAILMOVIE",
                payload: dt.data[0],
            });
            setLoading(false);
        });
}