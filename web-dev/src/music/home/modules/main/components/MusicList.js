import style from "./style.module.css";
import { useNavigate } from "react-router";

export const MusicList = ({ title, data }) => {
  const navigate = useNavigate();

  console.log("data", data);

  return (
    <div className={"w-100"}>
      <div className={"d-flex justify-content-between"}>
        <h3 className={"text-white"}>{title}</h3>
      </div>
      <div className={"p-2 row justify-content-evenly"}>
        {data.map((item, index) => {
          return (
            <>
              {title === "New Release" && (
                <div
                  key={index}
                  className={
                    "card me-2 p-0 col-lg-2 col-md-2 col-sm-3 flex-shrink-0 bg-dark " +
                    style.music
                  }
                  onClick={() => {
                    navigate(`/music/album/${item.id}`);
                  }}
                >
                  <div className={"card-body p-2"}>
                    <img
                      width={"100%"}
                      className={"rounded rounded-2"}
                      src={item.images[0]["url"] || ""}
                    />
                    <p className={"mt-3 text-white"}>{item.name}</p>
                    <p>
                      <small className={"text-secondary " + style.introduction}>
                        {item.artists[0].name}
                      </small>
                    </p>
                  </div>
                </div>
              )}
              {title === "Recommendation" && (
                <div
                  key={index}
                  className={
                    "card me-2 p-0 col-lg-2 col-md-2 col-sm-3 flex-shrink-0 bg-dark " +
                    style.music
                  }
                  onClick={() => {
                    navigate(`/music/track/${item.id}`);
                  }}
                >
                  <div className={"card-body p-2"}>
                    <img
                      width={"100%"}
                      className={"rounded rounded-2"}
                      src={item.album.images[0].url}
                    />
                    <p className={"mt-3 text-white"}>{item.artists[0].name}</p>
                    <p>
                      <small className={"text-secondary " + style.introduction}>
                        {item.name}
                      </small>
                    </p>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};
