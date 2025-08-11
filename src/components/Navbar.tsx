import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex justify-between">
      <Link href="/" className="text-xl font-bold">CreatorSocial</Link>
      <div className="space-x-4">
        <Link href="/auth/login" className="hover:underline">Login</Link>
        <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign Up</Link>
      </div>
    </nav>
  );
}
