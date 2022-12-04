import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import { API_USER } from "../../common/ApiController";
import "../Movies/MovieManage.css";
import { Button } from "../../Components/Button/Button";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { List } from "react-content-loader";
import ItemUser from "../../Components/ItemUser/ItemUser";
import InfoUserModal from "../../Components/InfoUserModal/InfoUserModal";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

export default function AllUsers2() {
  const store = useContext(StoreContext);
  const [biDanh, setBiDanh] = useState();
  // console.log(">>ID in AllUsers", biDanh);
  let token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    fetch(API_USER.GET_ALL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((dt) => {
        store.users.UsersDispatch({
          type: "GET_ALL",
          payload: dt.data,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let users = store.users.listUsers?.users;
  const data = users
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
    { label: "Tên tài khoản", key: "tentaiKhoan" },
    { label: "Họ tên", key: "moTa" },
    { label: "Email", key: "email" }
  ];
  const dataExport = data?.map((item) => {
    return { ...item, ngayKhoiChieu: formattedDate(item.ngayKhoiChieu) }
  })
  const dataa = dataExport
  const columns = [
    {
      name: 'Tên tài khoản',
      selector: row => row.tentaiKhoan,
      sortable: true,
      width: "200px",
      cell: (row) => <td className="organisationname">
        {row.tentaiKhoan}
      </td >
    },
    {
      name: 'Ảnh đại diện',
      width: "140px",
      minHeight: "120px",
      // selector: row => row.moTa,
      cell: (row) => <td className="organisationname image" >
        <img height="80px" width="60px" style={{ width: "80px" }} src={row.anhDaiDien} alt="Không tải được ảnh" />
      </td >,
    },
    {
      name: 'Họ tên',
      // selector: row => row.moTa,
      width: "160px",
      cell: (row) => <td>
        <div className="organisationname-description" style={{ width: "160px" }} > {row.hoTen}</div>
      </td >,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      width: "200px",
      cell: (row) => <td>
        <div className="organisationname" style={{ width: "200px" }}>{row.email}</div>
      </td>,
    },
    {
      name: 'Thao tác',
      width: "120px",
      cell: (row) => <td className="actions">
        {console.log(">>. thao tác", row)}
        <InfoUserModal tenTaiKhoan={row.tentaiKhoan} show={false} />
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
  // console.log(">> users", users);
  if (users) {
    return (
      <>
        <div style={{ minWidth: "925px" }}>
          <div style={{ padding: "0em 3em 3em 3em" }}>
            {users.length == 0 ? (
              <div style={{ color: "white", marginTop: "1em" }}>
                Hiện chưa có người dùng nào!
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
