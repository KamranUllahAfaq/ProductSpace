import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import { toast } from "react-hot-toast";
import DiscussionDetails from "./DiscussionDetails";
const REST_API_ENDPOINT = process.env.REACT_APP_API;
const DiscussionDetailsScreen = () => {
  const { state } = useLocation();
  const discussion = state;
  return (
    <div>
      <DiscussionDetails discussion={discussion} />
    </div>
  );
};

export default DiscussionDetailsScreen;
