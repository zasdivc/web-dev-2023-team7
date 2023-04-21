import React from "react";
import {useSelector} from "react-redux";
import {deleteComment} from "./comments-service";

const CommentItem = ({comment}) => {
    const { currentUser } = useSelector((state) => state.auth);

    const deleteCommentHandler = async (id) => {
        await deleteComment(id);
    }

    return (
        <li className="list-group-item  pt-2 pb-2">
                    <img className="rounded-circle float-start me-5"
                         width="50px" height="50px"
                         src="/images/default.JPG"/>

                    {currentUser.role === 'admin'&&<i className="bi bi-x-lg float-end"
                       onClick={() => deleteCommentHandler(comment._id)}></i>}
                    <span className={`${comment.role === "admin" ? "text-danger" : (comment.role  === "moderator" ? "text-primary" : "")}`}>
                        <span className="fw-bold me-3">{comment.username}</span><i className="bi bi-patch-check-fill"></i>
                    </span>
                    <span className="text-muted"> {comment.createdAt.split("T")[0]} {comment.createdAt.split("T")[1].split(".")[0]}</span>
                    <br/>
                    <div className={`${comment.role === "admin" ? "text-danger" : (comment.role  === "premium" ? "text-primary" : "")}`}>
                        {comment.comment}
                    </div>
        </li>
    );
};

export default CommentItem;