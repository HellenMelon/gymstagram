import React from "react";

export default function Header({ name }: { name: string }) {
  return (
    <div className="fixed left-0 right-0 top-0 m-5 flex justify-center">
      {name}
    </div>
  );
}
