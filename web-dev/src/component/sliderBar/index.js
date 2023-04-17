/*
 * author:
 * timestamp: 2023年04月16日 09:36:15
 * description: system aside slider bar
 */
import "./style.module.css";
import style from "./style.module.css";
import HKY from "../../images/HKY.png";

import { useLocation, useNavigate } from "react-router-dom";

const Aside = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  //check if user is logged in
  const isLoggedIn = () => {
      return localStorage.getItem("isLoggedIn") !== null;
  }

    //redirect to profile page if user is logged in
   if (isLoggedIn()) {
       navigate("/profile");
   }

  return (
    <div className={props.className + " " + style.siderbar}>
      <div className={style.sideHeader + " d-flex align-items-center"}>
        <img
          src={HKY}
          alt="Huskify"
          className="me-2"
          style={{ height: "50px", width: "50px" }}
        />
        <h4
          className={
            "text-white m-0 fw-bolder me-3 " + style["react-width-1400"]
          }
          style={{ fontSize: "30px" }}
        >
          Huskify
        </h4>
      </div>

      <ul
        className={`${style.menu} ${style["sidebar-menu"]} p-0`}
        style={{ marginTop: "20px" }}
      >
        <li
          onClick={() => navigate("/main")}
          className={pathname.includes("/main") ? style.active : ""}
        >
          <i
            className={
              pathname.includes("/main")
                ? "me-2 bi bi-house-door-fill"
                : "me-2 bi bi-house-door"
            }
          ></i>
          <span className={style["react-width-1400"]}>Home</span>
        </li>
        <li
          onClick={() => navigate("/search")}
          className={pathname.includes("/search") ? style.active : ""}
        >
          <i
            className={
              pathname.includes("/search")
                ? "me-2 bi bi-search-heart-fill"
                : "me-2 bi bi-search-heart"
            }
          ></i>
          <span className={style["react-width-1400"]}>Search</span>
        </li>
        <li
          onClick={() => navigate("/likes")}
          className={pathname.includes("/likes") ? style.active : ""}
        >
          <i
            className={
              pathname.includes("/likes")
                ? "me-2 bi bi-heart-fill"
                : "me-2 bi bi-heart"
            }
          ></i>
          <span className={style["react-width-1400"]}>Likes</span>
        </li>
      </ul>

      <p className={"text-white d-flex ps-5 align-items-center mt-auto"}>
        <i
          className=" bi bi-box-arrow-in-left"
          style={{ fontSize: "24px" }}
        ></i>
        <button className={"btn btn-link text-white text-decoration-none "}
                onClick={() => navigate("/login")}>
          <span className={style["react-width-1400"]}>Login</span>
        </button>
      </p>

      <p className={"text-white d-flex ps-5 align-items-center"}>
        <i className=" bi bi-people-fill" style={{ fontSize: "24px" }}></i>
        <button className={"btn btn-link text-white text-decoration-none "}
                onClick={() => navigate("/profile")}>
          <span className={style["react-width-1400"]}>Profile</span>
        </button>
      </p>
    </div>
  );
};

export default Aside;
