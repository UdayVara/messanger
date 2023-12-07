"use client"
import React from "react";

function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <div className="w-full h-full flex items-center justify-center">
    <h4>Something Went Wrong.</h4>
    <button className="max-w-[100px] bg-sky-500 text-white py-1 rounded">Go to Homepage</button>
  </div>
}

export default Error;
