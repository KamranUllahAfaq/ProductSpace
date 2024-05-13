import React, { useEffect, useMemo, useState } from "react";
import RichTextBox from "../../../components/richtextbox/RichTextBox";
import {
  Typography,
  Button,
  Divider,
  DatePicker,
  Select,
  Spin,
  Input,
  Checkbox,
} from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ThumbnailStory from "../../../components/story/ThumbnailStory/ThumbnailStory";

// import { colors } from "../../../theme/Colors";
// import ThumbnailEvent from "../../../components/Event/ThumbnailEvent/ThumbnailEvent";
const REST_API_ENDPOINT = process.env.REACT_APP_API;
const AddEvent = () => {
  const [data, setData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    guidelines: "",
    venue: "",
  });
  const [value, setValue] = useState();
  const [product, setProduct] = useState();
  const [thumbnail, setThumbnail] = useState();

  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handlePChange = (value) => {
    setProduct(value);
  };

  const saveEvent = async () => {
    if (
      value &&
      data.venue &&
      data.startDate &&
      data.endDate &&
      product &&
      thumbnail
    ) {
      try {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem("token"));

        const formData = new FormData();
        formData.append("content", value);
        formData.append("title", data.title);
        formData.append("guidelines", data.guidelines);

        formData.append("thumbnail", thumbnail);
        formData.append("product", product);
        formData.append("startDate", data.startDate);
        formData.append("endDate", data.endDate);
        formData.append("venue", data.venue);

        formData.append("createdBy", user._id);
        await axios
          .post(`${REST_API_ENDPOINT}events`, formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            toast.success("Event Added Successfully");
            navigate(-1);
          });
      } catch (error) {
        toast.error("Error Occurred");
      }
      setLoading(false);
    } else {
      toast.error("Please Enter All The Details");
    }
  };

  const fetchMyProducts = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}ambassador/myproducts/${user._id}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const products = res.data.map((item) => {
            return { label: item.name, value: item._id };
          });
          setMyProducts(products);
          setLoading(false);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleVenue = (event) => {
    setData({ ...data, [event.target.name]: event.target.checked });
    if (event.target.checked) setData({ ...data, venue: "Online" });
    else setData({ ...data, venue: "" });
  };

  const handleStartDateTimeChange = (date, dateString) => {
    if (date) {
      setData({ ...data, startDate: dateString });
    }
  };
  const handleEndDateTimeChange = (date, dateString) => {
    if (date) {
      setData({ ...data, endDate: dateString });
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);
  return (
    <div>
      <div
        style={{
          paddingInline: "10%",
          paddingTop: 15,
          paddingBottom: 15,
          background:
            "linear-gradient(90deg, rgba(0,54,46,1) 0%, rgba(11,94,125,1) 100%)",
        }}
      >
        <div style={{ width: "60%" }}>
          <div
            style={{
              width: "fit-content",
              padding: 5,
              backgroundColor: "#1b4655",
            }}
          >
            <Typography.Text style={{ color: "white", fontWeight: "bold" }}>
              Add Events
            </Typography.Text>
          </div>

          <Typography.Text
            style={{ color: "white", fontWeight: "bold", fontSize: 50 }}
          >
            Promote your Products using events
          </Typography.Text>
          <Divider style={{ backgroundColor: "white" }} />
        </div>
      </div>

      {myProducts.length > 0 ? (
        <div div style={{ margin: "7%" }}>
          <Typography
            style={{
              textAlign: "center",
              margin: 10,
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Add Your Event
          </Typography>

          <div
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography style={{ fontSize: 20 }}>Choose Product</Typography>
            {loading ? (
              <Spin />
            ) : (
              <Select
                defaultValue="Select Product"
                style={{
                  minWidth: 400,
                  maxWidth: 250,
                }}
                size="large"
                onChange={handlePChange}
                options={myProducts}
              />
            )}
          </div>

          <div
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 30,
              display: "flex",
            }}
          >
            <div>
              <Typography style={{ fontSize: 20 }}>Start Date</Typography>
              <DatePicker
                style={{
                  minWidth: 400,
                  maxWidth: 250,
                }}
                size="large"
                showTime
                name="startDate"
                onChange={handleStartDateTimeChange}
              />
            </div>
            <div>
              <Typography style={{ fontSize: 20 }}>End Date</Typography>
              <DatePicker
                style={{
                  minWidth: 400,
                  maxWidth: 250,
                }}
                size="large"
                showTime
                name="endDate"
                onChange={handleEndDateTimeChange}
              />
            </div>
          </div>
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <Typography style={{ fontSize: 20 }}>Title</Typography>

            <Input.TextArea
              placeholder="Add Title for your Event"
              rows={2}
              value={data.title}
              name="title"
              onChange={handleChange}
            ></Input.TextArea>
          </div>

          <ThumbnailStory thumbnail={thumbnail} setThumbnail={setThumbnail} />
          <Typography style={{ fontSize: 20 }}>Add Thumbnail</Typography>
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <Typography style={{ fontSize: 20 }}>Venue</Typography>

            <Input.TextArea
              placeholder="Choose Venue"
              rows={1}
              value={data.venue}
              name="venue"
              onChange={handleChange}
            ></Input.TextArea>
            <Checkbox
              value={data.isOnline}
              name="isOnline"
              onChange={handleVenue}
            >
              Online
            </Checkbox>
          </div>
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <Typography style={{ fontSize: 20 }}>Guidelines</Typography>

            <Input.TextArea
              placeholder="Guideline for event"
              rows={4}
              value={data.guidelines}
              name="guidelines"
              onChange={handleChange}
            ></Input.TextArea>
          </div>
          <Typography style={{ fontSize: 20 }}>Content</Typography>

          <RichTextBox value={value} setValue={setValue} />
          <Button
            size="large"
            type="primary"
            style={{ width: "100%", marginTop: 70 }}
            onClick={saveEvent}
          >
            Add Event
          </Button>
        </div>
      ) : (
        <div>
          {" "}
          <Typography
            style={{
              marginTop: 20,
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            You are not the ambassador of any Product
          </Typography>
        </div>
      )}
    </div>
  );
};

export default AddEvent;
