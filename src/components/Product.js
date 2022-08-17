import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import houseApi from "../api/houseApi";
import { useContext } from "react";
import { Store } from "../Store";

function Product(props) {
  const { product } = props;
  const category = product.parent.CategoryId.categories;
  // const check = product.countInStock
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x.objectId === item.objectId);
    console.log("existItem", existItem)
    const quantity = existItem ? existItem.quantity + 1 : 1;
    console.log("quantity", quantity)
    const data = await houseApi.getRoomById(item.objectId);
    console.log("check data", data)
    if (data.countInStock < quantity) {
      window.alert("sorry . This house is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: {
        ...item,
        quantity,
      },
    });
  };

  
  return (
    <Card key={product.objectId}>
      <Link to={`/classes/Room/${product.objectId}`}>
        <img
          src={product.parent.image}
          className="card-img-top"
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <Link to={`/classes/Room/${product.objectId}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>${product.parent.price}</Card.Text>
        <Card.Text
          className="category"
          style={{
            color: category === "Featured" ? "#25b579" : "#ff9800",
          }}
        >
          {category}
        </Card.Text>
        <Card.Text>
          <i className="fa fa-location-dot"></i> {product.parent.location}
        </Card.Text>
      {product.countInStock === 0 ? (
          <Button variant="light" disable={true}>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>
            Click To Buy
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;
