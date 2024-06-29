"use client";

import { Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { type FormEvent, useState } from "react";

export default function PostDate() {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const postDate = date.toLocaleDateString(undefined, options);

  return (
    <div className="items-left flex flex-col">
      <div className="h-[10%] bg-white px-5 py-5">
        <p className="text-gray-500">When</p>
        <p className="font-semibold text-green-600">{postDate}</p>
      </div>
      <Divider sx={{ width: "100%" }} />

      <div className="flex items-center p-4">
        <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-gray-300">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <p className="text-gray-500">Add a photo!</p>
      </div>
      <Divider sx={{ width: "100%" }} />

      <div className="items-left justify-left mt-5 flex flex-col px-10 py-5">
        <p className="text-gray-500">Caption</p>
        <textarea
          className="h-32 focus:outline-none"
          placeholder="How did your workout go?"
        />
      </div>

      <Divider sx={{ width: "100%" }} />
    </div>
  );
}
