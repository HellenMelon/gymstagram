"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { api } from "~/trpc/react";

export default function RegisterForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signUp, isPending } = api.auth.register.useMutation({
    onSuccess: () => {
      router.push("/auth/login");
    },
  });

  const register = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signUp({
      username,
      name,
      email,
      password,
    });
  };

  return (
    <form className="min-w-[80%] space-y-6" onSubmit={register}>
      <div>
        <div className="mt-1">
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Name"
            className="block w-full appearance-none border-b border-gray-300 py-2 placeholder-gray-400 shadow-sm transition-all focus:border-[#bbdf8c] focus:outline-none active:outline-none sm:text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
          />
        </div>
      </div>
      <div>
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
            disabled={isPending}
          />
        </div>
      </div>
      <div>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email"
            className="block w-full appearance-none border-b border-gray-300 py-2 placeholder-gray-400 shadow-sm transition-all focus:border-[#bbdf8c] focus:outline-none active:outline-none sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          />
        </div>
      </div>

      <div>
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
            disabled={isPending}
          />
        </div>
      </div>

      {/* <div className="flex flex-row items-center">
        <p>Upload a profile picture</p>
        <UploadButton
          className="ut-button:bg-[#bbdf8c]"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div> */}

      <div className="flex items-center justify-center gap-8">
        <p className="text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#8cd52d] hover:text-[#c1e097]"
          >
            Login
          </Link>{" "}
          instead.
        </p>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-[#bbdf8c] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#b3db7f] focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Join Us!
        </button>
      </div>
    </form>
  );
}
