import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex justify-between">
      <Link href="/" className="text-xl font-bold">CreatorSocial</Link>
      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            <span>Hello, {user.name}</span>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="hover:underline">Login</Link>
            <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
