import { MusicList } from "./components/MusicList";
import { useState, useEffect } from "react";
import {
  getTrackRecommendations,
  getNewReleasedAlbums,
} from "../../../music-service";

export const Main = () => {
  const [newReleaseList, setNewReleaseList] = useState([]);
  const [newReleaseListSource, setNewReleaseListResource] = useState([]);

  const [recommendationList, setRecommendationList] = useState([]);
  const [recommendationListSource, setRecommendationListResource] = useState(
    []
  );

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
      <MusicList
        data={recommendationList}
        key="Recommendation"
        title={"Recommendation"}
      />
    </div>
  );
};
