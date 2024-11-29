"use client";

import { useState } from "react";

export default function PaymentButton() {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/doku-payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 200000,
          currency: "IDR",
          order: {
            invoice_number: "INV456",
          },
        }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
}
