import React, { useContext, useEffect, useReducer, useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Form, Button, Card, ListGroup, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import orderAPI from "../api/orderAPI";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { getError } from "../utils";
import paypalAPI from "../api/paypalAPI";
import { toast } from "react-toastify";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };
    default:
      return state;
  }
}

export default function Order() {
  const params = useParams();
  const { objectId } = params;
  const { state } = useContext(Store);
  const { userInfo, cart } = state;
  const navigate = useNavigate();
  //

  console.log("check object id order", objectId);
  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
      order: {},
      successPay: false,
      loadingPay: false,
    });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  console.log("isPending", isPending);

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.room_id.parent.price } }],
      })
      .then((data) => {
        return data;
      });
  }
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const data = await paypalAPI.putPayPal();

        dispatch({ type: "PAY_SUCCESS", payload: data });
        toast.success("Order is paid");
      } catch (error) {
        dispatch({ type: "PAY_FAIL", payload: getError(error) });
        toast.error(getError(error));
      }
    });
  }
  function onError(error) {
    toast.error(getError(error));
  }
  //
  useEffect(() => {
    //
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        //id of a house
        const res = await orderAPI.getOrder(objectId);
        console.log("data", res);
        const dataOrder = res.result;
        dispatch({ type: "FETCH_SUCCESS", payload: dataOrder });
      } catch (e) {
        dispatch({ type: "FETCH_FAIL", payload: getError(e) });
      }
    };
    if (!userInfo) {
      return navigate("/signin");
    }
    if (
      !order.room_id.objectIdF ||
      successPay ||
      (order.room_id.objectId && order.room_id.objectId !== objectId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
    } else {
      const loadPayPalScript = async () => {
        const data = await paypalAPI.getPayPal();
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": data.result,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPayPalScript();
    }
  }, [paypalDispatch, userInfo, successPay]);
  console.log("false or true", order.room_id);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>{order.objectId}</title>
      </Helmet>
      <h1 className="my-3">Order Id: {order.objectId} </h1>
      <Row key={order.objectId}>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Information</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {order.name}chua co <br />
                <strong>Email: </strong> {order.email}
                <br />
                <strong>Phone: </strong>
                {order.phone}
              </Card.Text>
              {order.isGivenKey ? (
                <MessageBox variant="success">Given Key</MessageBox>
              ) : (
                <MessageBox variant="danger">Not Given Key</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {cart.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">Paid Success</MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Your House</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item key={order.room_id.objectId}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={order.room_id.parent.image}
                        alt={order.room_id.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>
                      {"    "}
                    </Col>
                    <Col md={3}>
                      <Link to={`/classes/Room/${order.room_id.objectId}`}>
                        {order.room_id.name}
                      </Link>
                    </Col>
                    <Col md={3}>${order.room_id.parent.price}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.room_id.parent.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      {" "}
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.room_id.parent.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {isPending ? (
                      <LoadingBox />
                    ) : (
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <LoadingBox></LoadingBox>}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
