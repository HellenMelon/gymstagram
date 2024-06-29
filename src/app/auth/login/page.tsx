import Image from "next/image";
import LoginForm from "./loginForm";
import Link from "next/link";
import { ArrowLeft } from "iconoir-react";

export default function Login() {
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
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Login to your account
          </h2>
          <LoginForm />
        </div>
      </div>
      <Link href="/" className="fixed left-8 top-8">
        <ArrowLeft className="h-7 w-7" />
      </Link>
    </div>
  );
}
