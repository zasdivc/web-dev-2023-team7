import {Link} from "react-router-dom";
import CommentItem from "../../../comment/CommentItem";
import TrackItem from "./trackItem";

const Tracklist = ({ artistTracks }) => {
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Album</th>
                    <th scope="col">Preview</th>
                    <th scope="col">Duration</th>
                </tr>
                </thead>
                <tbody>
                {artistTracks.map((artistTrack, index) => (
                    <TrackItem key={index} artistTrack={artistTrack} index={index}/>
                ))}
                </tbody>
            </table>

        </div>

    );

}

export default Tracklist;