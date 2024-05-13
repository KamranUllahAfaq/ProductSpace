import React, { useState, useEffect } from "react";
import { Typography, Button, Divider, Modal, Spin } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
const { confirm } = Modal;
const REST_API_ENDPOINT = process.env.REACT_APP_API;
const MyEvents = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyEvents = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      await axios
        .get(`${REST_API_ENDPOINT}events/myevents/${user._id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setEvents(res.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchMyEvents();
    setLoading(false);
  }, [refresh]);

  return (
    <div style={{ marginInline: "12%", marginBlock: 40 }}>
      <Typography style={{ fontSize: 30, fontWeight: "bold" }}>
        My Events
      </Typography>
      <div style={{ marginTop: 30 }}>
        {events.length < 1 && (
          <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
            No Events Found
          </Typography>
        )}
        {loading ? (
          <Spin />
        ) : (
          <>
            {events.map((event, index) => (
              <MyEventCard
                event={event}
                key={index}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MyEvents;

const MyEventCard = ({ event, refresh, setRefresh }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .delete(`${REST_API_ENDPOINT}events/${event._id}`, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Story Deleted Successfully");
          setRefresh(!refresh);
        });
    } catch (error) {
      console.log(error.message);
      toast.error("Error Occurred");
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this event?",
      icon: <ExclamationCircleFilled />,
      content: "Confirm",
      okText: "Confirm Delete",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div>
      <div
        className="mainDiv"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className="leftDiv"
          style={{
            display: "flex",
            flexDirection: "space-between",
            alignItems: "center",
          }}
        >
          <div
            className="thumbnail"
            onClick={() => {
              navigate(`/event/details/${event?._id}`);
            }}
          >
            <img src={event?.thumbnail} alt="thummb" width={100} />
          </div>
          <div
            className="productDetails"
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 15,
            }}
          >
            <Typography.Text strong style={{ fontSize: 18 }}>
              {event.description}
            </Typography.Text>
            <Typography.Text>
              Created On: {moment(event.createdOn).format("MMM Do YYYY")}
            </Typography.Text>
          </div>
        </div>
        <div className="rightDiv">
          <Button
            size="large"
            onClick={showDeleteConfirm}
            style={{ marginInline: 10 }}
            icon={<DeleteOutlined />}
          />
        </div>
      </div>
      <Divider />
    </div>
  );
};
