import React, { useEffect, useContext, useState, useMemo } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import { API_MOVIE } from "../../common/ApiController";
import "./Menu.css";
import "./MovieManage.css";
import DataTable from 'react-data-table-component'
import { Button } from "../../Components/Button/Button";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import { FixedSizeList } from 'react-window';
import { List } from "react-content-loader";
import ItemMovie from "../../Components/ItemMovie/ItemMovie";
import EditMovieModal from "../../Components/EditMovieModal/EditMovieModal";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { CSVLink } from "react-csv";


export default function AllMovies2() {
  const store = useContext(StoreContext);
  const [biDanh, setBiDanh] = useState();
  const [isComing, setIsComing] = useState(true);

  useEffect(() => {
    if (isComing) {
      //let data = store.lsShowingMovie.ShowingMovie.lsShowingMovie
      fetch(API_MOVIE.COMING)
        .then((res) => res.json())
        .then((dt) => {
          store.lsComingMovie.ComingMovieDispatch({
            type: "GETCOMINGMOVIES",
            payload: dt.data,
          });
        });
    } else {
      fetch(API_MOVIE.SHOWING)
        .then((res) => res.json())
        .then((dt) => {
          store.lsShowingMovie.ShowingMovieDispatch({
            type: "GETSHOWINGMOVIES",
            payload: dt.data,
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComing]);

  let movies = isComing
    ? store.lsComingMovie.ComingMovie?.listMovie
    : store.lsShowingMovie.ShowingMovie?.listMovie;
  const data = movies
  console.log(">> data", data)
  const formattedDate = (dateInput) => {
    let today = new Date(dateInput);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return yyyy + "-" + mm + "-" + dd;
  };
  const headers = [
    { label: "Tên phim", key: "tenPhim" },
    { label: "Mô tả", key: "moTa" },
    { label: "Số lượng bán", key: "soLuongBan" },
    { label: "ngày khởi chiếu", key: "ngayKhoiChieu" }
  ];
  const dataExport = data?.map((item) => {
    return { ...item, ngayKhoiChieu: formattedDate(item.ngayKhoiChieu) }
  })
  const dataa = dataExport
  const columns = [
    {
      name: 'Tên phim',
      //selector: row => row.tenPhim,
      sortable: true,
      width: "200px",
      cell: (row) => <td className="organisationname">
        {row.tenPhim}
      </td >
    },
    {
      name: 'Hình ảnh',
      width: "fit-content",
      minHeight: "100px",
      // selector: row => row.moTa,
      cell: (row) => <td className="organisationname image" >
        <img height="80px" width="60px" src={row.hinhAnh} alt="" />
      </td >,
    },
    {
      name: 'Mô tả',
      // selector: row => row.moTa,
      width: "420px",
      cell: (row) => <td>
        <div className="organisationname-description">{row.moTa}</div>
      </td>,
    },
    {
      name: !isComing ? 'Đã bán' : "",
      selector: row => row.soLuongBan,
      sortable: true,
      width: "fit-content",
      cell: (row) => {
        !isComing ? (<td>
          <div className="organisationname" style={{ width: "80px", textAlign: "center" }}>{row.soLuongBan}</div>
        </td>) : <></>
      },
    },
    {
      name: 'Thao tác',
      width: "140px",
      cell: (row) => <td className="actions">
        <EditMovieModal biDanh={row.biDanh} show={false} coming={isComing} />
      </td>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  const customStyles = {
    header: {
      style: {
        fontSize: '22px',
        width: "fit-content",
        minHeight: '56px',
        // paddingLeft: '16px',
        // paddingRight: '8px',
      },
    },
    headRow: {
      style: {
        minHeight: '52px',
        width: "100%",
        fontSize: "16px",
        background: "#D5E0CC",
        border: "1px solid #B3BFAA",
        // padding: ".5em 1em",
        fontWeight: "bold",

      },
      denseStyle: {
        minHeight: '32px',
      },
    },
    rows: {
      style: {
        fontWeight: 400,
        minHeight: "150px"
      },
    },
    noData: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #005f5f 0%, rgb(48, 176, 180) 20%) !important',
      },
    },
  };

  if (data) {
    return (
      <>
        <div>
          <div style={{ padding: "0em 3em 3em 3em" }}>
            <div className="row">
              <div className="col-md-4">
                <button
                  className="button-custom no"
                  disabled={isComing ? true : false}
                  width="160px"
                  height="40px"
                  name="Phim sắp chiếu"
                  onClick={() => setIsComing(true)}
                >
                  Phim sắp chiếu
                </button>
              </div>
              <div className="col-md-4">
                <button
                  className="button-custom no"
                  disabled={!isComing ? true : false}
                  width="160px"
                  height="40px"
                  name="Phim đang chiếu"
                  onClick={() => setIsComing(false)}
                >
                  Phim đang chiếu
                </button>
              </div>
            </div>
            {movies.length == 0 ? (
              <div className="container-body" style={{ overflowY: "hidden" }}>
                <div
                  style={{
                    color: "white",
                    marginTop: "1em",
                    minWidth: "917px",
                  }}
                >
                  Hiện chưa có thông tin phim!
                </div>
              </div>
            ) : (
              <div style={{ border: "1px solid #B3BFAA" }}>
                <div style={{ padding: "18px 0px 0px 18px", backgroundColor: "#242f40" }}>
                  <CSVLink data={dataa} headers={headers} filename={"danhSachPhim.csv"}>
                    <i className="fa fa-file-export fa-lg" style={{ color: "#b5c4a9", fontSize: "16px" }}> CSV</i>
                  </CSVLink>
                </div>
                <DataTableExtensions export={false} print={false} columns={columns} data={data}>
                  <DataTable
                    columns={columns}
                    data={data}
                    customStyles={customStyles}
                    pagination
                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                    highlightOnHover
                  />
                </DataTableExtensions>

              </div>
            )}



          </div>
        </div >
      </>
    );
  } else {
    return (
      // <div style={{ padding: "48px" }}>
      <List style={{ padding: "48px", width: "925px" }} />
      //</div>
    );
  }
}
