import React from "react";
import Navbar from "../_components/navbar";
import Header from "../_components/header";

export default function GroupPage() {
  return (
    <div>
      <div className="justify-top flex min-h-screen flex-col items-center bg-white">
        <div>
          <Header name="Groups" />
        </div>
        <div className="flex w-[80%] flex-col items-center ">
          <GroupButton />
          <GroupButton />
        </div>
      </div>

      <div>
        <Navbar />
      </div>
    </div>
  );
}

function GroupButton() {
  return (
    <div className="m-5 w-full max-w-screen-2xl rounded-lg bg-[#e1fbbb] p-10 shadow-lg">
      <h2 className="text-center text-gray-900">My Group</h2>
    </div>
  );
}
