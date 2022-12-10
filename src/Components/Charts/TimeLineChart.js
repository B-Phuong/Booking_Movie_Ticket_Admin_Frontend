import ApexCharts from "apexcharts";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { List } from "react-content-loader";
import { getTimelineOfShowtime } from "../../Redux/Action/ChartActions";
import { StoreContext } from "../../Redux/Store/Store";

const TimeLineChart = () => {
  const store = useContext(StoreContext);
  const [isLoading, setLoading] = useState(true);
  let token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    getTimelineOfShowtime({ store })
    setLoading(false)
  }, []);

  let data = store.charts?.TimelineOfShowtime?.timeline;
  let changeLabel = {
    'morning': 'Sáng',
    'afternoon': 'Trưa',
    'evening': 'Chiều',
    'night': 'Tối'
  }
  let timeline = []
  let count = []
  for (var i in data) {
    timeline.push(changeLabel[i])
    count.push(data[i])
  }
  var options = {
    series: count,
    options: {
      chart: {
        width: '60%',
        type: 'pie',
      },
      labels: timeline,
      theme: {
        monochrome: {
          enabled: true
        }
      },
      plotOptions: {
        pie: {
          size: '200',
          dataLabels: {
            offset: -5
          }
        }
      },
      title: {
        text: ""
      },
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex]
          return [name, val.toFixed(1) + '%']
        }
      },
      legend: {
        show: false
      }
    },
  };

  return (
    <>
      {!isLoading ? (
        <div style={{ width: "400px" }}>
          <ReactApexChart options={options.options} series={options.series} type="pie" />
        </div>
      ) : (
        <List />
      )}
    </>
  );
};
export default TimeLineChart;
