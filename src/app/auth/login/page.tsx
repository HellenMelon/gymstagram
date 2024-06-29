import Image from "next/image";
import LoginForm from "./loginForm";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-cyan-200 to-blue-500">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="logo"
            className="w-full max-w-64"
            width={300}
            height={300}
          />
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Login to your account
          </h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
