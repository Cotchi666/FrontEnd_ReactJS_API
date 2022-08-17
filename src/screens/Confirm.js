import React, { useContext, useEffect, useReducer } from "react";
import { Card, Col, Row, Button, ListGroup, Toast } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import CheckoutStep from "../components/CheckoutStep";
import { Store } from "../Store";
import LoadingBox from "../components/LoadingBox";
import { getError } from "../utils";
import { toast } from "react-toastify";
import orderAPI from "../api/orderAPI";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "CREATE_FAIL":
      return {
        ...state,
        loading: false,
      };
    default:
      return false;
  }
};
export default function Confirm() {
  const navigate = useNavigate();
  const params = useParams();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
  });
  //lay phan tu da duoc chon
  const a = cart.cartItems.find((obj) => {
    const { objectId } = params;
    return (obj.objectId = objectId);
  });

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const data = await orderAPI.createOrder(
        //order
        cart.order.fullName,
        cart.order.email,
        cart.order.phone,
        //room
        a.objectId
      );

      ctxDispatch({ type: "CART_CLEAR", payload: a });
      ctxDispatch({ type: "ADD_TO_ORDER_DETAIL", payload: data });
      // ctxDispatch({ type: "ORDER_CLEAR" ,payload: a});
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");

      navigate("/");

    } catch (error) {
      console.log(error);
      dispatch({ type: "CREATE_FAIL" });
      // toast.error("")
      toast.error(getError(error));
    }
  };
  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);
  return (
    <div>
      <CheckoutStep step1 step2 step3 step4>
        {" "}
      </CheckoutStep>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>

      <h1 className="my-3"> Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Information</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {cart.order.fullName} <br />
                <strong>Email: </strong> {cart.order.email}
                <br />
                <strong>Phone: </strong>
                {cart.order.phone}
              </Card.Text>
              <Link to="/order">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {cart.paymentMethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Your House</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item key={a.objectId}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={a.parent.image}
                        alt={a.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>
                      {"    "}
                    </Col>
                    <Col md={3}>
                      <Link to={`/classes/Room/${a.objectId}`}>{a.name}</Link>
                    </Col>
                    <Col md={3}>${a.parent.price}</Col>
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
                    <Col>${a.parent.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={a.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                  {loading && <LoadingBox></LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
