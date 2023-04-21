import {Link} from "react-router-dom";

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
                    <tr key={index}>
                        <td className="align-middle">{index + 1}</td>
                        <td className="align-middle">
                            <img
                                className="float-start"
                                width="40px"
                                height="40px"
                                src={artistTrack.album.images[1].url}
                            />
                            <Link
                                style={{ textDecoration: "none" }}
                                to={`/music/track/${artistTrack.id}`}
                            >
                        <span
                            style={{ color: "#fff" }}
                            className="size-20 ms-2"
                        >
                          {artistTrack.name}
                        </span>
                            </Link>
                        </td>
                        <td className="align-middle">
                            <Link
                                style={{ textDecoration: "none" }}
                                to={`/music/album/${artistTrack.album.id}`}
                            >
                        <span style={{ color: "#fff" }}>
                          {artistTrack.album.name}
                        </span>
                            </Link>
                        </td>
                        <td className=" d-flex  align-items-center">
                            <audio
                                className="float-start"
                                controls
                                src={artistTrack.preview_url}
                            ></audio>
                            <i className="bi bi-heart size-20 ms-4 text-muted"></i>
                        </td>
                        <td className="align-middle">
                            {Math.floor(artistTrack.duration_ms / 60000)}:
                            {Math.floor((artistTrack.duration_ms % 60000) / 1000)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>

    );

}

export default Tracklist;