"use client";

import axios from "axios";
// components/CheckoutButton.js
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
const CheckoutButton = () => {
  useEffect(() => {
    // Load the Jokul Checkout script dynamically
    const script = document.createElement("script");
    script.src =
      "https://sandbox.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const handleCheckout = async () => {
    // Replace the URL with the actual payment URL from your backend response
    const request_id = `${uuidv4()}-${Date.now()}`;
    console.log(request_id);
    try {
      const response = await axios.post("/api/generate-payment", {
        order: {
          amount: 1000,
          invoice_number: request_id,
          currency: "IDR",
          callback_url: "http://localhost:3000",
          callback_url_cancel: "http://localhost:3000",
        },
        payment: {
          payment_due_date: 60,
          payment_method_types: [
            "VIRTUAL_ACCOUNT_BCA",
            "VIRTUAL_ACCOUNT_BANK_MANDIRI",
            "VIRTUAL_ACCOUNT_BANK_SYARIAH_MANDIRI",
            "VIRTUAL_ACCOUNT_DOKU",
            "VIRTUAL_ACCOUNT_BRI",
            "VIRTUAL_ACCOUNT_BNI",
            "VIRTUAL_ACCOUNT_BANK_PERMATA",
            "VIRTUAL_ACCOUNT_BANK_CIMB",
            "VIRTUAL_ACCOUNT_BANK_DANAMON",
            "ONLINE_TO_OFFLINE_ALFA",
            "CREDIT_CARD",
            "DIRECT_DEBIT_BRI",
            "EMONEY_SHOPEE_PAY",
            "EMONEY_OVO",
            "QRIS",
            "PEER_TO_PEER_AKULAKU",
            "PEER_TO_PEER_KREDIVO",
            "PEER_TO_PEER_INDODANA",
          ],
        },
        customer: {
          id: "JC-01",
          name: "Zolanda",
          phone: "628121212121",
          country: "ID",
        },
      });

      const paymentUrl =
        "https://jokul.doku.com/checkout/link/SU5WFDferd561dfasfasdfae123c20200510090550775";
      if (typeof loadJokulCheckout === "function") {
        loadJokulCheckout(response.data.data.response.payment.url);
      } else {
        console.error("Jokul Checkout script not loaded yet.");
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <button
      onClick={handleCheckout}
      style={{
        padding: "10px 20px",
        backgroundColor: "#0070f3",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Checkout Now
    </button>
  );
};

export default CheckoutButton;
