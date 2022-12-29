import { useState } from "react"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from "react-date-range";
import * as locales from 'react-date-range/dist/locale';
// import "rsuite/dist/rsuite.min.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from "react";
import Stack from '@mui/material/Stack';
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import "./Calendar.css"
import { minWidth } from "@mui/system";
// import { DateRangePicker } from "rsuite";

export default function Calendar(props) {
  let price = {
    Mon: "95000",
    Tue: "95000",
    Wed: "75000",
    Thu: "95000",
    Fri: "115000",
    Sat: "115000",
    Sun: "115000",
  };
  const checkPrice = (formatDay) => {
    // const formatDay = e.target.value;
    const dayName = new Date(formatDay).toString().split(" ")[0];
    let priceTicket = price[dayName];
    return priceTicket
  }
  const formattedDate = (dateInput) => {
    let today = new Date(dateInput);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return yyyy + "-" + mm + "-" + dd;
  };
  const [dateList, setDateList] = useState()
  let dates = [];
  function getDatesInRange(startDate, endDate) {
    var date = new Date(startDate);
    const enddate = new Date(endDate);
    while (date <= enddate) {
      let priceTicket = checkPrice(new Date(date))
      dates.push({ ngayChieu: formattedDate(new Date(date)), giaVe: priceTicket });
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }
  var today = new Date();
  var chooseDate = new Date();
  var startDate = new Date(props.startDate)
  var endDate = new Date(props.endDate)
  if (today > startDate)
    chooseDate.setDate(today.getDate() + 1);
  else {
    chooseDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
  }
  const [state, setState] = useState({
    selection1: {
      startDate: chooseDate,
      endDate: chooseDate,
      key: 'selection1'
    },
    selection2: {
      startDate: chooseDate,
      endDate: chooseDate,
      key: 'selection2'
    }
  })

  const [value, setValue] = useState("")
  return (
    <div style={{ display: "flex" }}>
      <DateRange
        editableDateInputs={false}
        onChange={item => {
          setState({ ...state, ...item })
          console.log(">> item", item)
          if (item.selection1) {
            getDatesInRange(item.selection1.startDate, item.selection1.endDate)
            getDatesInRange(state.selection2.startDate, state.selection2.endDate)
          }
          else if (item.selection2) {
            getDatesInRange(state.selection1.startDate, state.selection1.endDate)
            getDatesInRange(item.selection2.startDate, item.selection2.endDate)
          }
          const unique = [...new Map(dates.map((m) => [m.ngayChieu, m])).values()];
          // console.log(">> dates", dates)
          if (unique.length > 0)
            props.handleSet(unique)
        }}
        minDate={chooseDate}
        maxDate={endDate}
        moveRangeOnFirstSelection={false}
        ranges={[state.selection1, state.selection2]}
        locale={locales["vi"]}
        months={1}
        direction="horizontal"
        showMonthAndYearPickers={false}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <div style={{ minWidth: "200px", paddingBottom: "16px", paddingLeft: "16px" }}>
            <TimePicker
              disableIgnoringDatePartForTimeValidation={true}
              renderInput={(params) => <TextField {...params} />}
              value={value}
              label="Thời gian chiếu"
              onChange={(newValue) => {
                setValue(newValue);
                props.handleTime(newValue)
              }}
              shouldDisableTime={(timeValue, clockType) => {
                if (clockType === 'hours' && (timeValue < 9 || timeValue > 23))
                  return true;
                if (clockType === 'minutes' && timeValue % 5) {
                  return true;
                }
                return false;
              }}
            />
            <br></br>
            Cảnh báo lỗi <br></br>
            <div className="warning-list">
              {
                props.warning?.map((item, index) => {
                  return (
                    <div style={{ color: "#e0b809" }}>
                      {index + 1}.&nbsp;
                      {item.ngayChieu}&nbsp; -&gt;  &nbsp;
                      {item.loi} &nbsp;
                      <br />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </Stack>
      </LocalizationProvider>
    </div>
    // <DateRangePicker
    //   onChange={item => setState({ ...state, ...item })}
    //   months={1}
    //   minDate={new Date()}
    //   // maxDate={new Date().setDate(new Date() + 90)}
    //   direction="vertical"
    //   scroll={{ enabled: true }}
    //   ranges={[state.selection]}
    // />
  )
}