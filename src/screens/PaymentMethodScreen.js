import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import CheckoutStep from "../components/CheckoutStep";
import { Store } from "../Store";

export default function PaymentMethodScreen() {
  const params = useParams();
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { formOrder, paymentMethod },
  } = state;
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "Paypal"
  );
  useEffect(() => {
    if (!formOrder.phone || !formOrder.fullName) {
      navigate("/formOrder");
    }
  }, [formOrder, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    const { objectId } = params;
    console.log('Check paymetn id', objectId)
    navigate(`/confirm/${objectId}`);
  };

  return (
    <div>
      <CheckoutStep step1 step2 step3></CheckoutStep>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3"> Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Credit"
              label="Credit"
              value="Credit"
              checked={paymentMethodName === "Credit"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
