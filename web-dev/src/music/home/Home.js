import style from "./style.module.css";
import HKY from "../../images/HKY.png";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Aside from "../../component/sliderBar/index";
import { useSelector } from "react-redux";

import Adverise from "../../component/advertise";

export const Home = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const [showAd, setShowAd] = useState(false);

  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    console.log("currentUser", currentUser);
    // show AD
    let role = currentUser?.role;
    if (role && role === "user") {
      setShowAd(true);
    }
  }, []);
  return (
    <div className={"p-0 container-fluid " + style.wrapper}>
      {
        /* ad component */
        showAd && <Adverise close={() => setShowAd(false)} />
      }
      <div className={"w-100 h-100 row"}>
        <Aside className="col-lg-2 col-md-2 col-sm-3 flex-column h-100" />

        <div
          className={
            "col-lg-10 col-md-10 col-sm-9 h-100 d-flex flex-column p-0"
          }
        >
          <div
            className={"h-100 flex-grow-1 " + style.content}
            style={{ overflow: "auto" }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
