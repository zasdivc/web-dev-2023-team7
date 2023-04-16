import React from "react";
import {useDispatch} from "react-redux";
import {deleteComment} from "./comment-reducer";

const CommentItem = ({comment}) => {
    const dispatch = useDispatch();
    const deleteCommentHandler = (id) => {
        dispatch(deleteComment(id));
    }

    return (
        <li className="list-group-item">
                    <img className="rounded-circle float-start me-5"
                         width="50px" height="50px"
                         src="/images/default.JPG"/>

                    <i className="bi bi-x-lg float-end"
                       onClick={() => deleteCommentHandler(comment._id)}></i>
                    <span className="me-xl-2 fw-bold">{comment.userName}</span><i className="bi bi-patch-check-fill wd-color-blue"></i>
                    <span className="text-muted"> {comment.time}</span>
                    <br/>
                    <div>
                        {comment.comment}
            </div>
        </li>
    );
};

export default CommentItem;