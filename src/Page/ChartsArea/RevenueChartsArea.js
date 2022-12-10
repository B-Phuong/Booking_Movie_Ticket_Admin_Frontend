import BoxChart from "../../Components/Charts/BoxChart";
import QuarterlyRevenueChart from "../../Components/Charts/QuarterlyRevenueChart";
import Top10MoviesChart from "../../Components/Charts/Top10MoviesChart";
import ShowtimeChart from "../../Components/Charts/ShowtimeChart";
import { BarChart } from "../../Components/Charts/BarChart";
import RevenueBoxChart from "../../Components/Charts/RevenueBoxChart";
import TimeLineChart from "../../Components/Charts/TimeLineChart";

export default function RevenueChartsArea() {
  return (
    <>
      <RevenueBoxChart />
      {/* <div className="row">
        <div className="col-md-6 col-xl-6"> */}
      <div
        style={{
          color: "white",
          paddingLeft: "20px"
        }}
      >
        Doanh thu theo quý
      </div>
      <QuarterlyRevenueChart />
      {/* </div>
        <div className="col-md-4 col-xl-4"> */}
      <div
        style={{
          color: "white",
          paddingLeft: "20px"
        }}
      >
        10 khách hàng tiềm năng
      </div>
      <BarChart />



      {/* </div> */}
      {/* </div> */}
    </>
  );
}
