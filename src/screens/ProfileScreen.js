import React, { useContext, useReducer, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import userAPI from "../api/userAPI";
import { Store } from "../Store";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};
export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [username, setUserName] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });
  const submitHandler = async (e) => {
    e.preventDefault({});
    try {
      const data = await userAPI.updateUser(
        userInfo.objectId,
        username,
        email,
        password
      );
      
      console.log(data)
      dispatch({ type: "UPDATE_SUCCESS", payload: data.result });
      ctxDispatch({ type: "USER_SIGN_IN", payload: data.result });
      localStorage.setItem("userInfo", JSON.stringify(data.result));
      toast.success("User update successfully");
    } catch (error) {
      dispatch({
        type: "UPDATE_FAIL",
      });
      toast.error(getError(error));
    }
  };
  return (
    <div className="container small-container">
      <Helmet>
        <title> User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile </h1>
      <form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Update</Button>{" "}
        </div>
      </form>
    </div>
  );
}
