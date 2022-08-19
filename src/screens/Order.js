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
  const params = useParams;
  const { objectId } = params;
  const { state } = useContext(Store);
  const { userInfo, cart } = state;
  const navigate = useNavigate();
  //

  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: [{}],
      error: "",
      successPay: false,
      loadingPay: false,
    });

  //

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  console.log("isPending", isPending);

  function createOrder(data, actions) {
    console.log("create order ready");
    const a = order.find((obj) => {
      return obj;
    });
    return actions.order
      .create({
        purchase_units: [{ amount: { value: a.totalPrice } }],
      })
      .then((data) => {
        console.log("create order done", data);
        return data;
      });
  }
  function onApprove(data, actions) {
    console.log("on approve ready");
    return actions.order.capture().then(async function (details) {
      try {
        console.log("create on ");
        dispatch({ type: "PAY_REQUEST" });
        const data = await paypalAPI.putPayPal();
        console.log("check paypal approve", data);

        dispatch({ type: "PAY_SUCCESS", payload: data });
        toast.success("Order is paid");
        console.log("create on done");
        
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
  console.log("use effect ready");
  useEffect(() => {
    console.log("1");
    //
    const fetchOrder = async () => {
      console.log("2");
      try {
        dispatch({ type: "FETCH_REQUEST" });
        //id of a house
        console.log("2.5");
        const data = await orderAPI.getOrder(objectId);
        console.log("check data order", data.results);
        console.log("3");
        dispatch({ type: "FETCH_SUCCESS", payload: data.results });
        console.log("4");
      } catch (e) {
        dispatch({ type: "FETCH_FAIL", payload: getError(e) });
      }
    };
    if (!userInfo) {
      return navigate("/signin");
    }
    if (!order || successPay) {
      fetchOrder();
      console.log("fetch order");
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
    } else {
      console.log("5");
      fetchOrder();
      console.log("6");
      console.log("loadPayPalScript ready");

      const loadPayPalScript = async () => {
        console.log("6.5.1.1");
        const data = await paypalAPI.getPayPal();
        console.log("7");
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": data.result,
            currency: "USD",
          },
        });
        console.log("8");
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
        console.log("9");
        console.log("loadPayPalScript done");
      };
      console.log("6.5");
      loadPayPalScript();
      console.log("6.5.1");
    }
  }, [paypalDispatch]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      {order.map((item) => {
        return (
          <div>
            <Helmet>
              <title>{item.objectId}</title>
            </Helmet>
            <h1 className="my-3">Order Id: {item.objectId} </h1>
            <Row key={item.objectId}>
              <Col md={8}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Information</Card.Title>
                    <Card.Text>
                      <strong>Name:</strong> {item.name}chua co <br />
                      <strong>Email: </strong> {item.email}
                      <br />
                      <strong>Phone: </strong>
                      {item.phone}
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
                      <ListGroup.Item key={item.room_id.objectId}>
                        <Row className="align-items-center">
                          <Col md={4}>
                            <img
                              src={item.room_id.parent.image}
                              alt={item.room_id.name}
                              className="img-fluid rounded img-thumbnail"
                            ></img>
                            {"    "}
                          </Col>
                          <Col md={3}>
                            <Link to={`/classes/Room/${item.room_id.objectId}`}>
                              {item.room_id.name}
                            </Link>
                          </Col>
                          <Col md={3}>${item.room_id.parent.price}</Col>
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
                          <Col>${item.room_id.parent.price}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            {" "}
                            <strong>Order Total</strong>
                          </Col>
                          <Col>
                            <strong>${item.totalPrice}</strong>
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
      })}
    </div>
  );
}
