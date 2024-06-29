"use client";

import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import Image from "next/image";
import { ProfileCircle } from "iconoir-react";
import { UploadButton } from "../_components/uploadthing";
import { signOut, useSession } from "next-auth/react";
import { api } from "~/trpc/react";

export default function Page() {
  const session = useSession();

  const { mutate: updateProfilePic } =
    api.auth.updateUserProfilePic.useMutation({
      onSuccess() {
        void session.update();
      },
    });

  if (session.status === "loading") return <></>;
  if (session.status === "unauthenticated") redirect("/auth/login");
  if (!session.data) return <></>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-[80%] flex-col items-center gap-4 overflow-hidden rounded-2xl border p-10">
        {/* {JSON.stringify(session)} */}
        {session.data.user.image ? (
          <div className="h-40 w-40 overflow-hidden rounded-full border-2 border-black">
            <Image
              src={session.data.user.image}
              className="h-full"
              alt="logo"
              width={300}
              height={300}
            />
          </div>
        ) : (
          <UploadButton
            className="ut-button:h-auto ut-button:w-auto ut-button:rounded-full ut-button:bg-gray-600"
            endpoint="imageUploader"
            content={{
              button() {
                return <ProfileCircle width={100} height={100} />;
              },
              allowedContent() {
                return <></>;
              },
            }}
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              updateProfilePic({ url: res[0]!.url });
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        )}
        <p className="text-center text-2xl">{session.data.user.name}</p>
        profile
      </div>
      <button
        className="mt-8 rounded-xl bg-[#54db5b] px-3 py-2 text-white"
        onClick={() => {
          void signOut();
        }}
      >
        Sign Out
      </button>
      <Navbar />
    </main>
  );
}
