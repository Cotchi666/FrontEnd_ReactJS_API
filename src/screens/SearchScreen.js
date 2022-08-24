import React, { useEffect, useReducer, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import houseApi from "../api/houseApi";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import Product from "../components/Product";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        rooms: action.payload.rooms,
        page: action.payload.page,
        pages: action.payload.pages,
        countRooms: action.payload.countRooms,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
// const prices = [
//   { name: "$1 to $50", value: "1-50" },
//   { name: "$51 to $200", value: "51-200" },
//   { name: "$201 to $1000", value: "201-1000" },
// ];
export default function SearchScreen() {
  const navigate = useNavigate();
  const { a } = useParams();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  console.log("sp", sp);
  console.log("search", search);
  console.log("a", a);
  // const category = sp.get("category") || "all";
  // const query = sp.get("query") || "all";
  // const price = sp.get("price") || "all";
  // const order = sp.get("order") || "newest";
  // const page = sp.get("page") || 1;

  const [{ loading, error, rooms, pages, countRooms }, dispatch] = useReducer(
    reducer,
    { loading: true, error: "" }
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await houseApi.getRoomByCate();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchData();
  }, []);

  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const res = await houseApi.getCate();
  //       const data = res.results;
  //       console.log("data", data);
  //       setCategories(data);

  //     } catch (error) {
  //       toast.error(getError(error));
  //     }
  //   };
  //   fetchCategories();
  // }, [dispatch]);
  // const getFilterUrl = (filter) => {
  //   const filterPage = filter.page || page;
  //   const filterCategory = filter.category || category;
  //   const filterQuery = filter.query || query;
  //   const filterPrice = filter.price || price;
  //   const sortOrder = filter.order || order;
  //   return `search?category=${filterCategory}&query=${filterQuery}&price${filterPrice}&order=${sortOrder}&page${filterPage}`;
  // };
  return (
    <div>
      <Helmet>
        <title>Search Rooms</title>
      </Helmet>
      {/* <Row>
        <Col md={3}>
          <h3>Department</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={"all" === category ? "text-bold" : ""}
                  to={getFilterUrl({ category: "all" })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={c === category ? "text-bold" : ""}
                    to={getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3> Price</h3>
            <ul>
              <li>
                {prices.map((p) => (
                  <li key={p.value}>
                    <Link
                      to={getFilterUrl({ price: p.value })}
                      className={p.value === price ? "text-bold" : ""}
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    {countRooms === 0 ? " No" : countRooms} Result
                    {query !== "all" && " : " + query}
                    {category !== "all" && " : " + category}
                    {price !== "all" && " : Price " + price}
                    {query !== "all" ||
                    category !== "all" ||
                    price !== "all" ? (
                      <Button
                        variant="light"
                        onClick={() => navigate("/search")}
                      >
                        <i className="fas fa-time-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest"> Price: High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {rooms.length === 0 && <MessageBox>No Room Found</MessageBox>}
              <Row>
                {rooms.map((room) => (
                  <Col sm={6} lg={4} className="mb-3" key={room.objectIc}>
                    <Product room={room}></Product>
                  </Col>
                ))}
              </Row>
              <div>
                {[...Array(pages).key()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    <Button
                      className={Number(page) === x + 1 ? "text-bold" : ""}
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row> */}
    </div>
  );
}
