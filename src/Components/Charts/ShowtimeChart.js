import ApexCharts from "apexcharts";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { List } from "react-content-loader";
import { API_CHARTS } from "../../common/ApiController";
import { getShowtimeTicketSold } from "../../Redux/Action/ChartActions";
import { StoreContext } from "../../Redux/Store/Store";
import ReactApexChart from 'react-apexcharts'

const ShowtimeChart = () => {
  const store = useContext(StoreContext);
  const [isLoading, setLoading] = useState(true);
  let token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    // fetch(API_CHARTS.GETTICKETS, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    //   method: "GET",
    // })
    //   .then((res) => res.json())
    //   .then((dt) => {
    //     store.ticketBooking.TicketBookingDispatch({
    //       type: "GETTICKETBOOKINGS",
    //       payload: dt.data,
    //     });

    //   });
    getShowtimeTicketSold({ store })
    setLoading(false)
  }, []);
  const formattedDate = (dateInput) => {
    let today = new Date(dateInput);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "-" + mm + "-" + yyyy;
  };
  let data = store.ticketBooking?.GetAllTicketBooking?.lsTicketBookings;
  let dateShowtime = [];
  // // console.log(">> ticket Bookings", data);
  if (data)
    data.forEach((item) => {
      let formatDate = formattedDate(item.maLichChieu?.ngayChieu);
      const found = dateShowtime.find((el) => el.date === formatDate);
      if (!found) dateShowtime.push({ date: formatDate, quantity: 0 });
      else {
        found.quantity += 1;
      }
    });
  var formatDate = dateShowtime.map((item) => {
    return item["date"];
  });
  var count = dateShowtime.map((item) => {
    return item["quantity"];
  });
  // console.log(">> formatDate", formatDate);
  // console.log(">> count", count);
  var options = {
    series: [
      {
        name: "SỐ LƯỢNG",
        type: "area",
        data: count.length == 1 ? [0, ...count] : count,
      },
    ],
    chart: {
      height: 400,
      width: 800,
      type: "line",
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "solid",
      opacity: [0.35, 1],
    },
    labels: formatDate.length == 1 ? ["01-01-2022", ...formatDate] : formatDate,
    markers: {
      size: 0,
    },
    // xaxis: {
    //   title: {
    //     text: "Ngày chiếu",
    //     fill: "blue",
    //   },
    // },
    yaxis: [
      {
        title: {
          // text: "Số lượng",
          fill: "blue",
        },
        fill: "blue",
      },
      //   {
      //     opposite: true,
      //     title: {
      //       text: "Series B",
      //     },
      //   },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " vé";
          }
          return y;
        },
      },
    },
  };
  return (
    <>
      {!isLoading ? (
        <ReactApexChart options={options} series={options.series} type="line" height={400} />
      ) : (
        <List style={{ padding: "16" }} speed={2}
          backgroundColor={'#333'}
          foregroundColor={'#999'}>
        </List>
      )}
    </>
  );
};
export default ShowtimeChart;
