"use client";

import { useSession } from "next-auth/react";

export default function Yeet() {
  const a = useSession();

  return <div>{JSON.stringify(a)}</div>;
}
