import BoxChart from "../../Components/Charts/BoxChart";
import QuarterlyRevenueChart from "../../Components/Charts/QuarterlyRevenueChart";
import Top10MoviesChart from "../../Components/Charts/Top10MoviesChart";
import ShowtimeChart from "../../Components/Charts/ShowtimeChart";
import { BarChart } from "../../Components/Charts/BarChart";
import RevenueBoxChart from "../../Components/Charts/RevenueBoxChart";
import TimeLineChart from "../../Components/Charts/TimeLineChart";

export default function ChartsArea() {
  return (
    <div class="chart-area">
      <BoxChart />
      <div
        style={{
          color: "white",
          paddingLeft: "20px"
        }}
      >
        Lượt bán theo ngày chiếu
      </div>
      <ShowtimeChart />
      {/* </div>
        <div className="col-md-4 col-xl-4"> */}
      <div
        style={{
          color: "white",
          paddingLeft: "20px",
        }}
      >
        Tỉ lệ mua vé giữa các khung giờ
      </div>
      <TimeLineChart />

      {/* </div> */}
      {/* </div> */}
    </div>
  );
}
