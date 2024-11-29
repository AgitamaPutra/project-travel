"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRouter } from "next/navigation";
import CheckoutButton from "./_components/CheckoutButton";

// Tipe untuk respons pembayaran
interface PaymentResponse {
  success: boolean;
  message: string;
  data?: any;
}

export default function Home() {
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <CheckoutButton />
    </div>
  );
}
