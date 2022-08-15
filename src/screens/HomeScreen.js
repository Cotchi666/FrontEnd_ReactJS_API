import React, { useReducer } from "react";
import { useEffect } from "react";

import houseApi from "../api/houseApi";
import logger from "use-reducer-logger";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, rooms: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const HomeScreen = () => {
  const [{ rooms, loading, error }, dispatch] = useReducer(logger(reducer), {
    rooms: [],
    loading: true,
    error: "",
  });
  // const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await houseApi.getAllRoom();
        console.log("Fetch products successfully: ", response.results);
        // setRooms(response.results.slice(0, 9));
        dispatch({
          type: "FETCH_SUCCESS",
          payload: response.results.slice(0, 9),
        });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchRooms();
  }, []);
  return (
    <>
      <div className="products">
        <div>------------</div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
            {rooms.map((item) => (
              <Col sm={6} md={4} lg={4} className="mb-3" key={item.objectId}>
                <Product product={item}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
