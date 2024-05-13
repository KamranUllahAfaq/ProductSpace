import { Button, Divider, Segmented, Typography, Input, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
// import { EventData } from "../data/EventData";
import moment from "moment";
const REST_API_ENDPOINT = process.env.REACT_APP_API;
const EventsScreen = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("All Events");
  const [description, setDescription] = useState("");

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [search, setSearch] = useState();

  const fethcAllEvents = async () => {
    try {
      await axios.get(`${REST_API_ENDPOINT}events`).then((res) => {
        setEvents(res.data);
        setFilteredEvents(res.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const filterEvents = (value) => {
    setSearch(value);

    setFilteredEvents(
      events.filter((event) => {
        return event.title.includes(value);
      })
    );
    if (value === "") {
      setFilteredEvents(events);
    }
  };
  useEffect(() => {
    fethcAllEvents();
  }, []);

  return (
    <div style={{ marginInline: "7%", marginTop: 20 }}>
      <div
        style={{
          height: 100,
          backgroundColor: "lightgrey",
          marginBlock: 40,
          padding: 50,
          paddingBlock: 30,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography style={{ width: "50%", fontSize: 26 }}>
          💌 Join 500K+ subscribers who get the best of tech every day right to
          their inbox
        </Typography>
        <div>
          <Button type="primary" onClick={() => navigate("myevents")}>
            My Events
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            type="primary"
            onClick={() => navigate("/events/new")}
          >
            Add Event
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        {type === "All Events" && (
          <Input
            size="large"
            placeholder="Search Events"
            value={search}
            onChange={(event) => {
              filterEvents(event.target.value);
            }}
            prefix={<SearchOutlined />}
            style={{ width: 400 }}
          />
        )}
      </div>
      <Eventss events={filteredEvents} />
    </div>
  );
};

const Eventss = ({ events }) => {
  return (
    <div style={{ marginTop: 10 }}>
      <Divider />
      {events.length < 1 && (
        <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
          No Events Found
        </Typography>
      )}
      <Row gutter={16}>
        {events.map((event, index) => (
          <Col
            key={index}
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            <Event event={event} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

const Event = ({ event }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate(`/event/details/${event?._id}`);
      }}
    >
      <img src={event?.thumbnail} width="100%" height={200} alt="thumbnail" />
      <div style={{ display: "flex" }}>
        <Typography style={{ fontSize: 12 }}>
          {event?.createdBy.name}
        </Typography>
        <Typography style={{ fontSize: 12, marginLeft: 6 }}>
          {event?.venue}
        </Typography>
        <Typography style={{ fontSize: 12, marginLeft: 6 }}>
          {moment(event?.createdOn).format("MMM Do YYYY")}
        </Typography>
      </div>
      <div>
        <Typography
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {event.title}
        </Typography>
      </div>
    </div>
  );
};

export default EventsScreen;
