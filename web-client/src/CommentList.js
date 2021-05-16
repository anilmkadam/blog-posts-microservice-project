import React from "react";

const CommentList = ({ comments }) => {

  const renderedComments = comments.map((comment) => {
    let content;
    switch(comment.status) {
      case "approved":
        content = comment.content;
      break;
      case "pending": 
        content = "This comment is awaiting Moderation.";
      break;
      case "rejected":
        content = "This comment has been rejected.";
      break;
    }
    return <li key={comment.id}>{content}</li>;
  });
  return <div>{renderedComments}</div>;
};

export default CommentList;