import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "iconoir-react";
import MakeGroupForm from "./makeGroupForm";

export default function MakeGroupPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#ffe6d9]">
      {/* <div className="flex w-full flex-grow items-center justify-center bg-[#ffe6d9]">
        <Image
          src="/logo.png"
          alt="logo"
          className="w-full max-w-64"
          width={300}
          height={300}
        />
      </div> */}
      <div className="flex h-screen w-full flex-col bg-white p-8 py-10 shadow-lg">
        <div className="flex flex-grow flex-col items-center justify-center">
          <Image
            src="/logo.png"
            alt="logo"
            className="mb-4 w-full max-w-40"
            width={300}
            height={300}
          />
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Make your group
          </h2>
          <MakeGroupForm />
        </div>
      </div>
      <Link href="/groups" className="fixed left-8 top-8">
        <ArrowLeft className="h-7 w-7" />
      </Link>
    </div>
  );
}
