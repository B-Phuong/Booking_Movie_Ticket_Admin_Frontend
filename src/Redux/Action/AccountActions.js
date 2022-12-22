export const logOut = ({ store, navigate }) => {
    localStorage.clear();
    // console.log(">> store.accounts", store.accounts.userAccount)
    store.accounts.AccountDispatch({
        type: "SIGN_IN",
        payload: localStorage.getItem("taiKhoan"),
    });
    navigate("/AdminSignIn")
}