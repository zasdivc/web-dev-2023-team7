import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import CommentItem from "./CommentItem";
import {findCommentsByTrackId} from "./comments-service";
const CommentList = ({trackId}) => {
    // const commentsArray = useSelector(state => state.comments)
    const [commentsArray, setCommentsArray] = useState([]);
    useEffect(() => {
        fetchCommentsByTrackId();
    }, [trackId]);

    // useEffect(() => {
    //     fetchCommentsByTrackId();
    // }, [commentsArray]);


    const fetchCommentsByTrackId = async () => {
        console.log("fetch comments by track id");
        const comments = await findCommentsByTrackId(trackId);
        console.log(comments);
        setCommentsArray(comments);
    }
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