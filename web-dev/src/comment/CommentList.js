import React from "react";
import {useSelector} from "react-redux";
import CommentItem from "./CommentItem";
const CommentList = () => {
    const commentsArray = useSelector(state => state.comments)
    return (
        <div>
            <ul className="list-group">
                {
                    commentsArray.map(comment =>
                        <CommentItem
                            key={comment._id}
                            comment={comment}/>
                    )
                }
            </ul>
        </div>
    );
};

export default CommentList;