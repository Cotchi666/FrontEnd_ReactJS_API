import React, { useContext, useEffect, useReducer, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CheckoutStep from "../components/CheckoutStep";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: "",
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function Order() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const params = useParams;

  const { objectId } = params;
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });
  useEffect(() => {
    if (!userInfo) {
      return navigate("/signin");
    }
    if (
      !order.objectId ||
      (order.objectId && order.objectId !== objectId)
    ) {
    }
  }, []);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div></div>
  );
}
