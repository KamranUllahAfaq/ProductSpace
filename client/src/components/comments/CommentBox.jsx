import React, { useEffect, useState } from "react";
import {
  Layout,
  Space,
  Menu,
  Input,
  Avatar,
  Modal,
  Carousel,
  Button,
  Typography,
  Divider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
import { useSelector } from "react-redux";

const CommentBox = ({ comments, postComment }) => {
  const [addReply, setAddReply] = useState({ id: "", state: false });

  const [commentData, setCommentData] = useState([]);
  function getChildren(comment, allComments) {
    var newCom = {
      ...comment,
      children: allComments
        .filter((c) => c.parentComment === comment._id)
        .map((c) => getChildren(c, allComments)),
    };

    return newCom;
  }

  const filterComments = () => {
    const newComments = comments.map((comment) =>
      getChildren(comment, comments)
    );
    setCommentData(newComments.filter((comment) => !comment.parentComment));
  };
  useEffect(() => {
    filterComments();
  }, [comments]);
  return (
    <div>
      {commentData.map((comment, index) => (
        <SingleComment
          key={index}
          type="parent"
          postComment={postComment}
          comment={comment}
          addReply={addReply}
          setAddReply={setAddReply}
        />
      ))}
    </div>
  );
};

const SingleComment = ({
  comment,
  type,
  postComment,
  addReply,
  setAddReply,
}) => {
  const [replyComment, setReplyComment] = useState("");
  const user = useSelector((state) => state.user);

  const openCommentBox = (commentId) => {
    setAddReply({ id: commentId, state: true });
  };
  const closeCommentBox = () => {
    setAddReply({ id: "", state: false });
  };
  const nestedComments = (comment.children || []).map((comment, index) => {
    return (
      <SingleComment
        key={index}
        comment={comment}
        type="child"
        postComment={postComment}
        addReply={addReply}
        setAddReply={setAddReply}
      />
    );
  });
  return (
    <div style={{ marginLeft: type === "child" && 100 }}>
      <div style={{ display: "flex" }}>
        <Avatar src={comment.user.image} size={36} />
        <Typography.Text
          style={{ fontSize: 16, fontWeight: "bold", marginLeft: 20 }}
        >
          {comment.user.name}
        </Typography.Text>
      </div>

      <div>
        <Typography.Text style={{ fontSize: 16, marginLeft: 60 }}>
          {comment.text}
        </Typography.Text>
      </div>

      <div>
        <Typography.Text style={{ fontSize: 12, marginLeft: 60 }}>
          {moment(comment.createdOn).format("MMM Do YYYY")}
        </Typography.Text>
      </div>

      <Button
        style={{ color: "green" }}
        type="link"
        onClick={() => {
          openCommentBox(comment._id);
        }}
      >
        Reply
      </Button>
      {addReply.id === comment._id && addReply.state && (
        <div>
          <Input
            size="medium"
            placeholder="Enter Your Reply"
            style={{ marginLeft: 100, width: 600 }}
            prefix={<Avatar src={`data:image/png;base64,${user.image}`} />}
            suffix={
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  postComment(replyComment, comment._id);
                  closeCommentBox();
                  setReplyComment("");
                }}
              >
                Reply
              </Button>
            }
            value={replyComment}
            onChange={(event) => {
              setReplyComment(event.target.value);
            }}
          />
        </div>
      )}
      <>{nestedComments}</>
      <Divider />
    </div>
  );
};

export default CommentBox;
