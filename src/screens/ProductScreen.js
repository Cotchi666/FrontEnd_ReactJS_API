import React, { useContext, useReducer } from "react";
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Card,
  Badge,
  Button,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import houseApi from "../api/houseApi";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, room: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const ProductScreen = () => {
  const navigate = useNavigate()
  const params = useParams();
  const { objectId } = params;

  const [{ room, loading, error }, dispatch] = useReducer(reducer, {
    room: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchRooms = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await houseApi.getRoomById(objectId);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: response,
        });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchRooms();
  }, [objectId]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
 
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x.objectId === room.objectId);
    console.log("check exist item client", existItem)
    const quantity = existItem ? existItem.quantity + 1 : 1;
    console.log("check quantity client", quantity)
    const data = await houseApi.getRoomById(room.objectId);
    if (data.countInStock < quantity) {
      window.alert("sorry . Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: {
        ...room,
        quantity: 1,
      },
    });
    navigate('/cart')
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={room.parent.image}
            alt={room.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{room.name}</title>
              </Helmet>
              <h1>{room.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>{room.parent.location}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                This is a raw description, this is a raw description, this is a
                raw description.
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${room.parent.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {room.countInStock > 0 ? (
                        <Badge bg="success">available</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button onClick={addToCartHandler} varian="primary">
                      Click To Buy
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default ProductScreen;
