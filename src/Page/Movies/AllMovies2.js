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
import { getComingMoviesAction, getShowingMoviesAction } from "../../Redux/Action/MovieActions";
import { SearchBar } from "../../Components/SearchBar/SearchBar";


export default function AllMovies2() {
  const store = useContext(StoreContext);
  const [biDanh, setBiDanh] = useState();
  const [isComing, setIsComing] = useState(true);
  const [filterText, setFilterText] = React.useState('');
  useEffect(() => {
    if (isComing) {
      //let data = store.lsShowingMovie.ShowingMovie.lsShowingMovie
      getComingMoviesAction({ store })
    } else {
      getShowingMoviesAction({ store })
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
    { label: "Đánh giá", key: "danhGia" },
    { label: "Ngày khởi chiếu", key: "ngayKhoiChieu" },
    { label: "Thời lượng", key: "thoiLuong" },
    { label: "Thể loại", key: "theLoai" },
    { label: "Quốc gia", key: "quocGia" }
  ];
  const dataExport = data?.map((item) => {
    return { ...item, ngayKhoiChieu: formattedDate(item.ngayKhoiChieu) }
  })
  console.log(">> isComing", isComing)
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
        <img height="80px" width="60px" src={row.hinhAnh} alt={"Không tải được ảnh"} />
      </td >,
    },
    {
      name: 'Mô tả',
      // selector: row => row.moTa,
      width: "320px",
      cell: (row) => <td>
        <div className="organisationname-description">{row.moTa == "" ? "Chưa có mô tả" : row.moTa}</div>
      </td>,
    },
    {
      name: !isComing ? 'Đã bán' : "",
      selector: row => row.soLuongBan,
      sortable: true,
      width: "fit-content",
      cell: (row) => (
        !isComing ? <td>
          <div className="organisationname" style={{ minWidth: "80px", textAlign: "center" }}>{row.soLuongBan}</div>
        </td> : <></>
      ),
    },
    {
      name: !isComing ? 'Đánh giá' : "",
      selector: row => row.danhGia,
      sortable: true,
      width: "fit-content",
      cell: (row) => (
        !isComing ? <td>
          <div className="organisationname" style={{ minWidth: "70px", textAlign: "center" }}>{Number(row.danhGia)}</div>
        </td> : <></>
      )
    },
    {
      name: 'Thao tác',
      width: "fit-content",
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
  const paginationOptions = {
    rowsPerPageText: 'Số dòng mỗi trang',
    rangeSeparatorText: 'trên',
  };
  let filteredItems = data?.filter(
    item => item?.tenPhim && item?.tenPhim.toLowerCase().includes(filterText.toLowerCase()),
  );
  if (data) {
    return (
      <>
        <div style={{ minWidth: "925px" }}>
          <div style={{ padding: "0em 3em 3em 3em" }}>
            <div className="row" style={{ marginBottom: "20px" }}>
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
            <h5><strong>Danh sách phim</strong></h5>
            {movies.length == 0 ? (
              <div className="container-body" style={{ overflowY: "hidden" }}>
                <div
                  style={{
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
                  <CSVLink data={dataExport} headers={headers} filename={"danhSachPhim.csv"}>
                    <i className="fa fa-file-export fa-lg" style={{ color: "#b5c4a9", fontSize: "16px" }}> CSV</i>
                  </CSVLink>
                </div>
                <SearchBar onFilter={e => setFilterText(e.target.value)}
                  filterText={filterText}
                  placeholder="Nhập tên phim" />
                <div className="container-body">
                  <DataTable
                    columns={columns}
                    data={filteredItems}
                    customStyles={customStyles}
                    pagination
                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                    paginationPerPage="5"
                    highlightOnHover
                    paginationComponentOptions={paginationOptions}
                    noDataComponent="Không tìm thấy thông tin"
                  />
                </div>
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
