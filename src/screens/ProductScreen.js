import React, { useContext, useReducer } from "react";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import houseApi from "../api/houseApi";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "FETCH_REQUEST":
//       return { ...state, loading: true };
//     case "FETCH_SUCCESS":
//       return { ...state, room: action.payload, loading: false };
//     case "FETCH_FAIL":
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
const ProductScreen = () => {
  const params = useParams();
  const { objectId } = params;
  // const [{ room, loading, error }, dispatch] = useReducer(reducer, {
  //   room: [],
  //   loading: true,
  //   error: "",
  // });
  // useEffect(() => {
  //   const fetchRooms = async () => {
  //     dispatch({ type: "FETCH_REQUEST" });
  //     try {
  //       const response = await houseApi.getRoomById(objectId);
  //       console.log("check data 1", response);
  //       dispatch({
  //         type: "FETCH_SUCCESS",
  //         payload: response,
  //       });
  //     } catch (error) {
  //       dispatch({ type: "FETCH_FAIL", payload: error.message });
  //     }
  //   };
  //   fetchRooms();
  // }, [objectId]);

  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { cart } = state;

  // const addToCartHandler = async () => {
  //   const existItem = cart.cartItems.find((x) => x.objectId === room.objectId);
  //   const quantity = existItem ? existItem.quantity + 1 : 1;
  //   const response2 = await houseApi.getRoomById(room.objectId);
  //   console.log("check data 2", response2.count);
  //   if (response2.count < quantity) {
  //     window.alert("sorry . Product is out of stock");
  //     return;
  //   }
  //   console.log("first");
  //   ctxDispatch({
  //     type: "CART_ADD_ITEM",
  //     payload: {
  //       ...room,
  //       quantity: 1,
  //     },
  //   });
  //   console.log("second");
  // };

  // return loading ? (
  //   <div>Loading...</div>
  // ) : error ? (
  //   <div>{error}</div>
  // ) : (
  //   <section className="about" key={room.objectId}>
  //     <Helmet>
  //       <title>{room.name}</title>
  //     </Helmet>

  //     <div className="container flex mtop">
  //       <div className="left row">
  //         <h4>{room.name}</h4>
  //         <p>
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
  //           ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  //           aliquip ex ea commodo consequat.
  //         </p>
  //         <p>
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
  //           ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  //           aliquip.
  //         </p>
  //         <button onClick={addToCartHandler} className="btn2">
  //           Add to List
  //         </button>
  //       </div>
  //       <div className="right row">
  //         {objectId}
  //         <img src={room.parent.image} alt="test" />
  //       </div>
  //     </div>
  //   </section>
  return <div>{objectId}</div>;
};
export default ProductScreen;
