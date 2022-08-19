import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import orderAPI from "../api/orderAPI";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function OrderHistoryScreen() {
  const { state } = useContext(store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const res = await orderAPI.getOrdersMine();
        dispatch({ type: "FETCH_SUCCESS", payload: res });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(reportError) });
      }
    };
    fetchData();
  }, [userInfo]);
  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1> Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              <tr key={order.objectId}>
                <td>{order.objectId}</td>
                <td>{order.createAt.subString(0, 10)}</td>
                <td>{order.room_id.parent.price.toFixed(2)}</td>
                <td>{order.isPaid ? " Paid" : " not Paid"}</td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order.objectId}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
