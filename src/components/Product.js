import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function Product(props) {
  const { product } = props;
  const category = product.parent.CategoryId.categories;
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

        <Button varian="primary">Click To Buy</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
