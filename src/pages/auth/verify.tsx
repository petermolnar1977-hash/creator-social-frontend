import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import api from "@/lib/api";

export default function Verify() {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    if (!token) return;
    async function verifyEmail() {
      try {
        await api.get(`/auth/verify?token=${token}`);
        setMessage("Email verified! You can now login.");
      } catch {
        setMessage("Verification failed or token expired.");
      }
    }
    verifyEmail();
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p>{message}</p>
      </div>
    </>
  );
}
