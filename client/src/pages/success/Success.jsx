import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    if (!payment_intent) return; // ✅ safety check

    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });

        const timer = setTimeout(() => {
          navigate("/orders");
        }, 3000);

        return () => clearTimeout(timer); // ✅ cleanup
      } catch (err) {
        console.error("Payment update failed:", err);
      }
    };

    makeRequest();
  }, [payment_intent, navigate]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>✅ Payment Successful</h2>
      <p>
        You are being redirected to the orders page. Please do not close this page.
      </p>
    </div>
  );
};

export default Success;