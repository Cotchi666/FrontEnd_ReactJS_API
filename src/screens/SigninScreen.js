import { Button, Container, Form } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import userAPI from "../api/userAPI";
import { useContext, useState } from "react";
import { Store } from "../Store";

export default function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const { state, dispatch: ctxDispatch } = useContext(Store); 

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data  = await userAPI.login(email, password);
      console.log("check data ", data)
      ctxDispatch({type : 'USER_SIGNIN', payload: data})
      
    } catch (error) {}
  };
  return (
    <Container className="small-container">
      <Helmet>
        <title> Sign In</title>
      </Helmet>
      <h1 className="my-3"> Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          New customer?
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}
