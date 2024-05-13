import React, { useState, useEffect } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";

const ProductDetailsScreen = () => {
  const { state } = useLocation();
  const product = state;

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailsScreen;
