import "./index.css";
import { useState, useEffect } from "react";
import { searchAlbumsAndTracks } from "../../../music-service";

export const Search = () => {
  const [searchStr, setSearchStr] = useState("");
  const [tracksList, setTracksList] = useState([]);
  const [albumsList, setAlbumsList] = useState([]);

  const debounce = (func, wait = 500) => {
    let timeout;

    return function () {
      const context = this;
      const args = arguments;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  };

  const getList = () => {
    if (searchStr) {
      searchAlbumsAndTracks(searchStr).then((res) => {
        setTracksList(res.tracks.items);
        setAlbumsList(res.albums.items);
      });
    } else {
      setTracksList([]);
      setAlbumsList([]);
    }
  };

  useEffect(() => {
    const debouncedGetList = debounce(() => {
      if (searchStr) {
        searchAlbumsAndTracks(searchStr).then((res) => {
          setTracksList(res.tracks.items);
          setAlbumsList(res.albums.items);
        });
      } else {
        setTracksList([]);
        setAlbumsList([]);
      }
    }, 500);

    debouncedGetList();
  }, [searchStr]);

  return (
    <div className="search-page">
      <div className="search-bar">
        <div className="search-action">
          <img className="icon-img" src={require("./icon-search-action.png")} />
          <input
            className="custom-input"
            type="text"
            placeholder="What do you want to listen to?"
            value={searchStr}
            onChange={(e) => {
              setSearchStr(e.target.value);
            }}
          />
          {searchStr && (
            <img
              className="icon-img icon-close"
              src={require("./icon-close.png")}
              onClick={() => setSearchStr("")}
            />
          )}
        </div>
      </div>

      <div className="cont-wrap p-2">
        {tracksList.length > 0 && (
          <>
            <div className={"d-flex justify-content-between"}>
              <h3 className={"text-white"}>Tracks</h3>
              <span className={"text-secondary"} role={"button"}></span>
            </div>
            <div className="p-2 row w-100 justify-content-evenly">
              {tracksList.map((item, index) => (
                <div
                  key={index}
                  className={
                    "card me-2 p-0 col-lg-2 col-md-2 col-sm-3 flex-shrink-0 bg-dark mb-5 music-item"
                  }
                >
                  <div className={"card-body p-2 "}>
                    <img
                      width={"100%"}
                      className={"rounded rounded-2"}
                      src={item.album.images[0]["url"] || ""}
                    />
                    <p className={"mt-3 text-white"}>{item.name}</p>
                    <p>
                      <small className={"text-secondary"}>
                        {item.album.artists[0].name}
                      </small>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {albumsList.length > 0 && (
          <>
            <div className={"d-flex justify-content-between"}>
              <h3 className={"text-white"}>Albums</h3>
              <span className={"text-secondary"} role={"button"}></span>
            </div>
            <div className="p-2 row w-100 justify-content-evenly">
              {albumsList.map((item, index) => (
                <div
                  key={index}
                  className={
                    "card me-2 p-0 col-lg-2 col-md-2 col-sm-3 flex-shrink-0 bg-dark mb-5 music-item"
                  }
                >
                  <div className={"card-body p-2 "}>
                    <img
                      width={"100%"}
                      className={"rounded rounded-2"}
                      src={item.images[1 || 0]["url"] || ""}
                    />
                    <p className={"mt-3 text-white"}>{item.name}</p>
                    <p>
                      <small className={"text-secondary"}>
                        {item.artists[0].name}
                      </small>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {tracksList.length < 1 && albumsList.length < 1 && (
          <img src={require("./jay.jpeg")} className="img-empty" />
        )}
      </div>
    </div>
  );
};
