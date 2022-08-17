import { useContext } from "react";
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Card,
  Badge,
  Button,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <div>
      <Helmet>
        <title>Ordered House</title>
      </Helmet>
      <h1>Ordered House</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/"> Go ordering a new one</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.objectId}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.parent.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>
                      <Link to={`/classes/Room/${item.objectId}`}>
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={3}>${item.parent.price} </Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => {
                          navigate(`/signin?redirect=/order/${item.objectId}`);
                        }}
                      >
                        Checkout
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}
                    items) :$
                    {cartItems.reduce(
                      (a, c) => a + c.parent.price * c.quantity,
                      0
                    )}
                  </h3>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
