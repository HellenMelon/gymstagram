"use client";

import { useSession } from "next-auth/react";
import { type FormEvent, useState, useEffect } from "react";
import Navbar from "~/app/_components/navbar";
import { Plus } from "iconoir-react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { UploadButton } from "~/app/_components/uploadthing";

export default function MakeGroupForm() {
  const [groupName, setGroupName] = useState("");
  const [groupPhoto, setGroupPhoto] = useState("");
  const [usernames, setUserIds] = useState("");

  const ctx = api.useUtils();

  const router = useRouter();

  // react query hooks
  const { mutate: createGroup } = api.group.createGroup.useMutation({
    onSuccess: () => {
      void ctx.group.getGroupsOfUser.invalidate();

      router.push("/groups");
    },
  });

  const session = useSession();

  if (session.status === "loading") return <></>;
  if (session.status === "unauthenticated") router.push("/auth/login");
  if (!session.data) return <></>;

  const create = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userNameArray = usernames
      .split(",")
      .map((username) => username.trim());

    // Function for creating and setting the group
    try {
      createGroup({
        name: groupName,
        photo: groupPhoto,
        usernames: userNameArray,
      });
      // Redirect or show success message
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  return (
    <form className="w-[80%] space-y-5" onSubmit={create}>
      <div>
        <div className="mt-1">
          <input
            id="groupName"
            name="groupName"
            type="text"
            required
            placeholder="Group Name"
            className="block w-full appearance-none border-b border-gray-300 py-2 placeholder-gray-400 shadow-sm transition-all focus:border-[#bbdf8c] focus:outline-none active:outline-none sm:text-sm"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="members"
          name="members"
          type="text"
          className="block w-full appearance-none border-b border-gray-300 py-2 placeholder-gray-400 shadow-sm transition-all focus:border-[#bbdf8c] focus:outline-none active:outline-none sm:text-sm"
          value={usernames}
          placeholder="Add Users (comma separated names)"
          onChange={(e) => setUserIds(e.target.value)}
        />
      </div>

      <div>
        <UploadButton
          className="ut-button:h-auto ut-button:w-full ut-button:bg-gray-600 ut-allowed-content:hidden"
          endpoint="imageUploader"
          content={{
            button() {
              return (
                <div className="flex w-full items-center justify-center">
                  <Plus width={40} height={40} />
                </div>
              );
            },
            allowedContent() {
              return <></>;
            },
          }}
          onClientUploadComplete={(e) => setGroupPhoto(e[0]!.url)}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
        <p className="py-3 text-gray-400">Upload Group Photo</p>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-[#bbdf8c] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#b3db7f] focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Make Group
        </button>
      </div>
      <Navbar />
    </form>
  );
}
