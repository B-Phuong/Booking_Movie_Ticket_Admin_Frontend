import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import { API_FOODDRINKS } from "../../common/ApiController";
import "../Movies/MovieManage.css";
import { Button } from "../../Components/Button/Button";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { List } from "react-content-loader";
import ItemFoodDrink from "../../Components/ItemFoodDrink/ItemFoodDrinks";

export default function AllFoodDrinks() {
  const store = useContext(StoreContext);
  const [biDanh, setBiDanh] = useState();

  // console.log(">>ID in AllFoodsDrinks", biDanh);

  useEffect(() => {
    fetch(API_FOODDRINKS.GET_ALL)
      .then((res) => res.json())
      .then((dt) => {
        store.fooddrinks.GetAllDispatch({
          type: "GETALLFOODDRINKS",
          payload: dt.data,
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let fooddrinks = store.fooddrinks.LsFDs?.listFDs;
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
              <div className="container-body">
                <table className="layout display responsive-table">
                  <thead>
                    <tr>
                      <th>Số thứ tự</th>
                      <th>Tên combo</th>
                      <th>Hình ảnh</th>
                      <th colSpan={2}>Mô tả</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fooddrinks.map((item, index) => (
                      <ItemFoodDrink fooddrinks={item} index={index} />
                    ))}
                  </tbody>
                </table>
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
