import React, { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CheckoutStep from "../components/CheckoutStep";
import { Store } from "../Store";
function OrderDetail() {

  const navigate = useNavigate()
  const params = useParams();
  const { objectId } = params;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { order },
  } = state;
  const [fullName, setFullName] = useState(order.fullName || "");
  const [email, setEmail] = useState(order.email || "");
  const [phone, setPhone] = useState(order.phone || "");
 

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/order");
    }
  }, [userInfo, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_ORDER",
      payload: {
        fullName,
        email,
        phone,
      },
    });
    localStorage.setItem(
      "order",
      JSON.stringify({
        fullName,
        email,
        phone,
      })
    );

    navigate(`/payment/${objectId}`);
  };
  return (
    <div>
      <Helmet>
        <title>Order Form</title>
      </Helmet>
      <CheckoutStep step1 step2></CheckoutStep>
      <div className="container small-container">
        <h1 className="my-3">Order Form</h1>
       
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default OrderDetail;
