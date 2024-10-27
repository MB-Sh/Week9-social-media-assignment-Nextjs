"use client";
import Link from "next/link";

export default function ErrorPage({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-4xl font-bold text-red-500 mb-4">Oops! Something went wrong</h2>
      <p className="text-gray-700 mb-4">{error?.message || "An unexpected error occurred."}</p>

      {/* Retry button */}
      <button
        onClick={() => reset()}
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200 mb-4"
      >
        Try again
      </button>

     
      <Link href="/">
        <a className="text-blue-500 underline">Go Home</a>
      </Link>
    </div>
  );
}
