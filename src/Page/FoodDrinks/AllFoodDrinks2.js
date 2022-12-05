import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import { API_FOODDRINKS } from "../../common/ApiController";
import "../Movies/MovieManage.css";
import { Button } from "../../Components/Button/Button";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { List } from "react-content-loader";
import ItemFoodDrink from "../../Components/ItemFoodDrink/ItemFoodDrinks";
import EditFDModal from "../../Components/EditFDModal/EditFDModal";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import { getAllFDsAction } from "../../Redux/Action/FDActions";

export default function AllFoodDrinks2() {
  const store = useContext(StoreContext);
  const [biDanh, setBiDanh] = useState();

  // console.log(">>ID in AllFoodsDrinks", biDanh);

  useEffect(() => {
    getAllFDsAction({ store })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let fooddrinks = store.fooddrinks.LsFDs?.listFDs;

  const data = fooddrinks
  console.log(">> fooddrinks", data)
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
    { label: "Tên combo", key: "tenCombo" },
    { label: "Mô tả", key: "moTa" },
    { label: "Số lượng bán", key: "soLuongBan" },
    { label: "Giá tiền", key: "giaGoc" },
    { label: "Giảm giá", key: "giamGia" },
  ];
  const dataa = fooddrinks
  const columns = [
    {
      name: 'Tên combo',
      //selector: row => row.tenPhim,
      sortable: true,
      width: "200px",
      cell: (row) => <td className="organisationname">
        {row.tenCombo}
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
      width: "340px",
      cell: (row) => <td>
        <div className="organisationname-description">{row.moTa == "" ? "Chưa có mô tả" : row.moTa}</div>
      </td>,
    },
    {
      name: 'Đã bán',
      selector: row => row.soLuongBan,
      sortable: true,
      width: "fit-content",
      cell: (row) => <td>
        <div className="organisationname" style={{ width: "80px", textAlign: "center" }}>{row.soLuongBan}</div>
      </td>,
    },
    {
      name: 'Thao tác',
      width: "120px",
      cell: (row) => <td className="actions">
        <EditFDModal biDanh={row.biDanh} show={false} />
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
  // console.log(">> FOODDRINKS", fooddrinks);
  if (fooddrinks) {
    return (
      <>
        <div style={{ minWidth: "925px" }}>
          <div style={{ padding: "0em 3em 3em 3em" }}>
            {fooddrinks.length == 0 ? (
              <div className="container-body" style={{ overflowY: "hidden" }}>
                <div style={{ color: "white", marginTop: "1em" }}>
                  Hiện chưa có thông tin đồ ăn và thức uống!
                </div>
              </div>
            ) : (
              // <div className="container-body">
              //   <table className="layout display responsive-table">
              //     <thead>
              //       <tr>
              //         <th>Số thứ tự</th>
              //         <th>Tên combo</th>
              //         <th>Hình ảnh</th>
              //         <th colSpan={2}>Mô tả</th>
              //       </tr>
              //     </thead>
              //     <tbody>
              //       {fooddrinks.map((item, index) => (
              //         <ItemFoodDrink fooddrinks={item} index={index} />
              //       ))}
              //     </tbody>
              //   </table>
              // </div>
              <div style={{ border: "1px solid #B3BFAA" }}>
                <div style={{ padding: "18px 0px 0px 18px", backgroundColor: "#242f40" }}>
                  <CSVLink data={dataa} headers={headers} filename={"danhSachCombo.csv"}>
                    <i className="fa fa-file-export fa-lg" style={{ color: "#b5c4a9", fontSize: "16px" }}>CSV</i>
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
        </div>
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
