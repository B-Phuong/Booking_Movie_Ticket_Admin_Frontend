import "../../Page/Movies/MovieManage.css";
import ApexCharts from "apexcharts";
import { useContext } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_USER } from "../../common/ApiController";
import { getStaticAction } from "../../Redux/Action/ChartActions";
import './Chart.css';
import { getAllUserAction } from "../../Redux/Action/UserActions";
import { getComingMoviesAction, getShowingMoviesAction } from "../../Redux/Action/MovieActions";
const BoxChart = () => {
  const store = useContext(StoreContext);
  let token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    //GetStaticAction()
    getAllUserAction({ store })
    getShowingMoviesAction({ store })
    getComingMoviesAction({ store })
    getStaticAction({ store })
  }, []);

  const Card = ({ label, number, icon }) => {
    return (
      <div className="col-xl-3 col-lg-6">
        <div className="stati card card-stats mb-4 mb-xl-0" style={{ background: "transparent", borderRadius: "1rem" }}>
          <div className="card-body" style={{ borderStyle: "dashed", borderRadius: "1rem" }}>
            <div className="row">
              <div className="col">
                <h6 className="card-title text-uppercase text-muted mb-0" style={{ color: "#242f40" }}>
                  {label}
                </h6>
                <span className="h5 font-weight-bold mb-0">{number}</span>
              </div>
              <div className="col-auto">
                <div className="icon icon-shape bg-warning text-pink rounded-circle shadow">
                  <i className={icon}></i>
                </div>
              </div>
            </div>
            {/* <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-danger mr-2"><i className="fas fa-arrow-down"></i> 3.48%</span>
              <span className="text-nowrap">Since last week</span>
            </p> */}
          </div>
        </div>
      </div>)
  }
  let statisticalByYear = store.ticketBooking.GetStatisticalByYear?.total
  let sumOfAccounts = store.users.listUsers?.users?.length;
  let sumOfShowingMovies = store.lsShowingMovie.ShowingMovie?.listMovie?.length;
  let sumOfComingMovies = store.lsComingMovie.ComingMovie?.listMovie?.length;
  return (
    <div className="row" style={{ paddingLeft: "20px" }}>

      <Card label="Tổng số tài khoản khách" number={sumOfAccounts} icon="fa fa-users fa-lg" />
      <Card label="Số phim đang chiếu" number={sumOfShowingMovies} icon="fa fa-film fa-lg" />
      <Card label="Số phim sắp chiếu" number={sumOfComingMovies} icon="fa fa-file-video fa-lg" />
      < Card label={`Doanh thu năm ${new Date().getFullYear()}`} number={statisticalByYear} icon="fa fa-money-bill fa-lg" />

    </div >
  );
};
export default BoxChart;
