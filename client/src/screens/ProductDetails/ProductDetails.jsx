import React, { useState, useEffect, useRef } from "react";
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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import CommentBox from "../../components/comments/CommentBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Scrollbar, A11y } from "swiper";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import ProfileCard from "../../components/profileCard/ProfileCard";

const REST_API_ENDPOINT = process.env.REACT_APP_API;

const ProductDetails = ({ product, setDetailsOpen }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [refresh, setRefresh] = useState(false);
  const [product1, setProduct1] = useState(product);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const likeProduct = () => {
    var product2 = { ...product1 };
    if (product2.upvotes.includes(user._id)) {
      var ind = product2.upvotes.indexOf(user._id);
      product2.upvotes.splice(ind, 1);
    } else {
      product2.upvotes.push(user._id);
    }
    setProduct1(product2);
  };

  const likeProductReq = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .put(
          `${REST_API_ENDPOINT}product/upvote/${product1._id}`,
          { userId: user._id },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setRefresh(!refresh);
        });
    } catch (error) {
      toast.error("Error Occured");

      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}product/${product1._id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProduct1(res.data);
        });
    } catch (error) {
      toast.error("Error Occured");

      console.log(error);
    }
  };

  const fetchAllComments = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}product/comments/${product1._id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setComments(res.data);
        });
    } catch (error) {
      toast.error("Error Occured");

      console.log(error);
    }
  };

  const postComment = async (comment1, commentId) => {
    if (comment1) {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        var body;
        if (commentId) body = { text: comment1, parentComment: commentId };
        else body = { text: comment1 };
        await axios
          .post(`${REST_API_ENDPOINT}product/comments/${product1._id}`, body, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            toast.success("Comment Submitted Successfully");
            setComment("");
            setRefresh(!refresh);
          });
      } catch (error) {
        toast.error("Error Occured");

        console.log(error.message);
      }
    } else {
      toast.error("Write Comment First! ");
    }
  };

  useEffect(() => {
    fetchAllComments();
  }, []);

  useEffect(() => {
    getProduct();
    fetchAllComments();
  }, [refresh]);

  return (
    <div style={{ padding: "8%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar
          src={product1.thumbnail}
          alt="thumbnail"
          size={100}
          shape="square"
        />

        {product1.ambassadorProgram && product1.createdBy !== user._id && (
          <Button
            type="primary"
            size="large"
            onClick={() => {
              navigate(`/ambassador/apply/${product1._id}`);
            }}
          >
            Apply for Ambassador Program
          </Button>
        )}
        {product1.createdBy === user._id && (
          <Button
            type="primary"
            size="large"
            onClick={() => {
              navigate(`/ambassador/applications`);
            }}
          >
            Visit Applicants
          </Button>
        )}
      </div>

      <Typography.Title level={2}>{product1.name}</Typography.Title>

      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography.Text style={{ fontSize: 24 }}>
            {product1.tagline}
          </Typography.Text>

          <div>
            <Button
              size="large"
              onClick={() => {
                window.open(product1.link);
              }}
            >
              Visit
            </Button>
            <Button
              type={product1.upvotes.includes(user._id) ? "primary" : "default"}
              size="large"
              style={{ marginLeft: 10 }}
              onClick={() => {
                likeProduct();
                likeProductReq();
              }}
            >
              Upvote {product1.upvotes.length}
            </Button>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <Typography.Text style={{ fontSize: 14 }}>
            {product1.pricing}
          </Typography.Text>
        </div>
        <div style={{ marginTop: 20 }}>
          <Typography.Text style={{ fontSize: 16 }}>
            {product1.description}
          </Typography.Text>
        </div>
      </div>
      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          shape="circle"
          type="dashed"
          size="large"
          icon={<LeftOutlined />}
          ref={prevRef}
        ></Button>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          /*using the refs instead of className*/
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{ clickable: true }}
        >
          {product1.gallery.map((pic, index) => (
            <SwiperSlide>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={pic}
                  alt="gallery"
                  height={350}
                  style={{ margin: "auto" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          shape="circle"
          type="dashed"
          size="large"
          icon={<RightOutlined />}
          ref={nextRef}
        ></Button>

        {/* 
        <Carousel autoplay>
          {product1.gallery.map((pic, index) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={pic}
                alt="gallery"
                height={350}
                style={{ margin: "auto" }}
              />
            </div>
          ))}
        </Carousel> */}
      </div>
      <div
        className="Support Card"
        style={{
          padding: 20,
          backgroundColor: "lightgreen",
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Typography.Title level={2}>
          Support is great. Feedback is even better.
        </Typography.Title>
        <Typography.Text style={{ fontStyle: "italic" }}>
          "Thanks for checking out the launch. Can you please let me know in the
          comment section how do you plan to use these prompts, or how have you
          used these prompts? "
        </Typography.Text>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginBlock: 20 }}
      >
        <ProfileCard user={product1.createdBy} />
      </div>
      <div style={{ marginTop: 20 }} className="Comments">
        <Divider />
        <Input
          size="large"
          placeholder="Enter Your Comment"
          prefix={<Avatar src={user.image} />}
          suffix={
            <Button
              type="primary"
              size="large"
              onClick={() => {
                postComment(comment, "");
              }}
            >
              Comment
            </Button>
          }
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />

        <Divider />

        <CommentBox
          comments={comments}
          refresh={refresh}
          setRefresh={setRefresh}
          postComment={postComment}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
