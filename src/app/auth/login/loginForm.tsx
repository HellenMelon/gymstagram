"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn("credentials", {
      username,
      password,
      callbackUrl: "/feed",
    });
  };

  return (
    <form className="space-y-6" onSubmit={login}>
      <div>
        {/* <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label> */}
        <div className="mt-1">
          <input
            id="username"
            name="username"
            type="text"
            required
            placeholder="Username"
            className="block w-full appearance-none border-b border-gray-300 py-2 placeholder-gray-400 shadow-sm transition-all focus:border-[#bbdf8c] focus:outline-none active:outline-none sm:text-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      <div>
        {/* <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label> */}
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full appearance-none border-b border-gray-300 py-2 placeholder-gray-400 shadow-sm transition-all focus:border-[#bbdf8c] focus:outline-none active:outline-none sm:text-sm"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center">
          <input
            id="remember_me"
            name="remember_me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-[#bbdf8c] focus:ring-[#bbdf8c]"
          />
          <label
            htmlFor="remember_me"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-[#a8db66] hover:text-[#c1e097]"
          >
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-[#bbdf8c] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#b3db7f] focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Sign in
        </button>
      </div>

      <div>
        <button
          onClick={() => router.push("/auth/register")}
          className="w-full justify-center text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Don't have an account? <span className="underline">Sign up</span>
        </button>
      </div>
    </form>
  );
}
