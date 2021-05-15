import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setcontent] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });

    setcontent("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Add Comment</label>
          <input
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Add</button>
      </form>
    </div>
  );
};

export default CommentCreate;