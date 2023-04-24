import { MusicList } from "./components/MusicList";
import { useState, useEffect } from "react";
import {
  getTrackRecommendations,
  getNewReleasedAlbums,
} from "../../../music-service";
import { useSelector } from "react-redux";

export const Main = () => {
  const [newReleaseList, setNewReleaseList] = useState([]);
  const [newReleaseListSource, setNewReleaseListResource] = useState([]);

  const [recommendationList, setRecommendationList] = useState([]);
  const [recommendationListSource, setRecommendationListResource] = useState(
    []
  );

  const curUser = useSelector((state) => state.auth.currentUser);

  const handleGetNewReleasbedAlbums = async () => {
    await getNewReleasedAlbums().then((res) => {
      setNewReleaseListResource(res);
      // substr five length
      setNewReleaseList(res.slice(0, 5));
    });
  };

  const handleGetTrackRecommendations = async () => {
    await getTrackRecommendations().then((res) => {
      setRecommendationListResource(res);
      // substr five length
      setRecommendationList(res.slice(0, 5));
    });
  };

  useEffect(() => {
    handleGetNewReleasbedAlbums();
    handleGetTrackRecommendations();
  }, []);

  return (
    <div className={"p-3 h-100 overflow-auto"}>
      <MusicList
        data={newReleaseList}
        key="New Release"
        title={"New Release"}
      />
      {curUser ? (
        <MusicList
          data={recommendationList}
          key="Recommendation"
          title={"Recommendation"}
        />
      ) : (
        <div style={{ widht: "100%", height: "360px" }}>
          <h3 className={"text-white"}>Recommendation</h3>
          <img
            src={require("../search/jay.jpeg")}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
};
