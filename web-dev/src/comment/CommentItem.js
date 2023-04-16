import React from "react";
import {useDispatch} from "react-redux";
import {deleteComment} from "./comment-reducer";

const CommentItem = ({comment}) => {
    const dispatch = useDispatch();
    const deleteCommentHandler = (id) => {
        dispatch(deleteComment(id));
    }

    return (
        <li className="list-group-item  pt-2 pb-2">
                    <img className="rounded-circle float-start me-5"
                         width="50px" height="50px"
                         src="/images/default.JPG"/>

                    <i className="bi bi-x-lg float-end"
                       onClick={() => deleteCommentHandler(comment._id)}></i>
                    <span className={`${comment.userType === "admin" ? "text-danger" : (comment.userType  === "premium" ? "text-primary" : "")}`}>
                        <span className="fw-bold me-3">{comment.userName}</span><i className="bi bi-patch-check-fill"></i>
                    </span>
                    <span className="text-muted"> {comment.time}</span>
                    <br/>
                    <div className={`${comment.userType === "admin" ? "text-danger" : (comment.userType  === "premium" ? "text-primary" : "")}`}>
                        {comment.comment}
                    </div>
        </li>
    );
};

export default CommentItem;