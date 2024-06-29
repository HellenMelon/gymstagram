import React from "react";

export default function NewPostHeader({ name }: { name: string }) {
  return (
    <div
      className="fixed left-0 right-0 top-0 flex justify-center"
      style={{
        width: "100%",
        backgroundColor: "white",
        padding: "15px", // Adding some padding for better appearance
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Optional: Add a subtle shadow for depth
        zIndex: 1000, // Ensure it stays on top
        fontSize: "20px", // Increase the text size
        fontWeight: "bold",
      }}
    >
      <button className="text-lg text-black">&larr;</button>
      <span className="mx-auto">{name}</span>
      <div style={{ width: "30px" }}></div>{" "}
    </div>
  );
}
