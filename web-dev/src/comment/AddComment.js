import {useSelector} from "react-redux";
import React, {useState} from "react";
import {createComment} from "./comments-service";


const AddComment = ({trackId, trackName}) => {
    let [comment, setComment] = useState('');
    const { currentUser } = useSelector((state) => state.auth);

    const postComment = async () => {
        console.log("post comment");
        const createdComment = {
            user: currentUser._id,
            username: currentUser.username,
            role: currentUser.role,
            trackId: trackId,
            trackName: trackName,
            comment: comment
        };
        console.log(createdComment);
        const newComment = await createComment(createdComment);
    };

    return (
        <div className="row">
            <div className="col-auto">
                <img className="rounded-circle" src="/images/default.JPG" width={50}/>
            </div>
            <div className="col-10">
                <textarea value={comment} placeholder="Type your comment about this track!"
                          className="form-control"
                          onChange={(event) => setComment(event.target.value)}>
                </textarea>
                <div>
                    <button className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
                            onClick={postComment}>
                        Comment
                    </button>
                </div>
            </div>
            <div className="col-12"><hr/></div>
        </div>
    );
}
export default AddComment;