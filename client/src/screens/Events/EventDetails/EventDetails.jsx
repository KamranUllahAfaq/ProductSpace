import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import moment from "moment";
import { Button, Divider, Typography } from "antd";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const REST_API_ENDPOINT = process.env.REACT_APP_API;

const EventDetails = () => {
  const params = useParams();
  const [event, setEvent] = useState();
  const [refresh, setRefresh] = useState(false);

  const user = useSelector((state) => state.user);

  const goingIn = () => {
    var eventCopy = { ...event };
    if (eventCopy.going.includes(user._id)) {
      var ind = eventCopy.going.indexOf(user._id);
      eventCopy.going.splice(ind, 1);
    } else {
      eventCopy.going.push(user._id);
    }
    setEvent(eventCopy);
  };

  const goingInReq = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .put(
          `${REST_API_ENDPOINT}events/going/${event._id}`,
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

  const interestedIn = () => {
    var eventCopy = { ...event };
    if (eventCopy.interested.includes(user._id)) {
      var ind = eventCopy.interested.indexOf(user._id);
      eventCopy.interested.splice(ind, 1);
    } else {
      eventCopy.interested.push(user._id);
    }
    setEvent(eventCopy);
  };

  const interestedInReq = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .put(
          `${REST_API_ENDPOINT}events/interested/${event._id}`,
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

  const fetchEvent = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}events/${params.id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setEvent(res.data);
        });
    } catch (error) {
      toast.error("Error Occured");

      console.log(error);
    }
  };
  useEffect(() => {
    fetchEvent();
  }, []);
  return (
    <div style={{ marginInline: "12%", marginBlock: 40 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ width: "50%" }}>
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: 35,
            }}
          >
            {event?.description}
          </Typography>
          <div style={{ display: "flex", marginTop: 30 }}>
            <div style={{ alignItems: "center", justifyContent: "center" }}>
              <Typography>Published On</Typography>
              <Typography style={{ fontWeight: "bold" }}>
                {moment(event?.createdOn).format("MMM Do YYYY")}
              </Typography>
            </div>
            <div
              style={{
                marginLeft: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>Author</Typography>
              <Typography style={{ fontWeight: "bold" }}>
                {event?.createdBy?.name}
              </Typography>
            </div>
            <div
              style={{
                marginLeft: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>Venue</Typography>
              <Typography style={{ fontWeight: "bold" }}>
                {event?.venue}
              </Typography>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <img src={event?.thumbnail} alt="thumb" width="75%" height="auto" />
        </div>
      </div>
      <Divider />
      <div style={{ margin: "4%" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ margin: 10 }}>
            <Button
              type={event?.going.includes(user._id) ? "primary" : "default"}
              size="large"
              onClick={() => {
                goingIn();
                goingInReq();
              }}
            >
              Going
            </Button>
          </div>
          <div style={{ margin: 10 }}>
            <Button
              type={
                event?.interested.includes(user._id) ? "primary" : "default"
              }
              size="large"
              onClick={() => {
                interestedIn();
                interestedInReq();
              }}
            >
              Interested
            </Button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div style={{ margin: 10 }}>
            <Typography
              style={{
                marginTop: 10,
                fontSize: 18,
              }}
            >
              Start Date
            </Typography>
            <Typography
              style={{
                marginTop: 10,
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              {moment(event?.startDate).format("MMM Do YYYY")}
            </Typography>
          </div>
          <div style={{ margin: 10, marginLeft: 150 }}>
            <Typography
              style={{
                marginTop: 10,
                fontSize: 18,
              }}
            >
              End Date
            </Typography>
            <Typography
              style={{
                marginTop: 10,
                fontSize: 22,

                fontWeight: "bold",
              }}
            >
              {moment(event?.endDate).format("MMM Do YYYY")}
            </Typography>
          </div>
        </div>
        <Divider />

        <Typography
          style={{
            marginTop: 50,
            fontWeight: "bold",
            fontSize: 23,
          }}
        >
          Guidelines:
        </Typography>

        <Typography
          style={{
            marginTop: 20,
            fontWeight: "bold",
          }}
        >
          {event?.guidelines}
        </Typography>
      </div>
      <Divider />
      <div style={{ margin: "4%" }}>
        <Typography
          style={{
            marginTop: 20,
            fontWeight: "bold",
            fontSize: 23,
          }}
        >
          Content
        </Typography>

        {event?.content ? parse(event?.content) : null}
      </div>
    </div>
  );
};

export default EventDetails;
