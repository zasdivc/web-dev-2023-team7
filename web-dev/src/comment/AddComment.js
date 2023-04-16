import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {createComment} from "./comment-reducer";

const AddComment = () => {
    let [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const commentClickHandler = () => {
        const newComment = {
            comment: comment
        }
        dispatch(createComment(newComment));
    }

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
                            onClick={commentClickHandler}>
                        Comment
                    </button>
                </div>
            </div>
            <div className="col-12"><hr/></div>
        </div>
    );
}
export default AddComment;