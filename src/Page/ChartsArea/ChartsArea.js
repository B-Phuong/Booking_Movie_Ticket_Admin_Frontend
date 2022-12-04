import BoxChart from "../../Components/Charts/BoxChart";
import QuarterlyRevenueChart from "../../Components/Charts/QuarterlyRevenueChart";
import Top10MoviesChart from "../../Components/Charts/Top10MoviesChart";
import ShowtimeChart from "../../Components/Charts/ShowtimeChart";
import { BarChart } from "../../Components/Charts/BarChart";

export default function ChartArea() {
  return (
    <>
      <BoxChart />
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
        Lượt bán theo ngày chiếu
      </div>
      <ShowtimeChart />
      <BarChart />
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
