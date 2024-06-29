import React from "react";
import { Button } from "@radix-ui/themes";
import Navbar from "../_components/navbar";
import Header from "../_components/header";
import Link from "next/link";
import { api } from "~/trpc/server";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { group } from "~/server/db/schema";
import { RouterOutputs } from "~/trpc/react";

export default async function GroupPage() {
  const session = await getServerAuthSession();

  if (!session) redirect("/auth/login");

  const groups = await api.group.getGroupsOfUser({ userId: session.user.id });

  return (
    <div>
      <div className="justify-top flex min-h-screen flex-col items-center bg-white">
        <div>
          <Header name="Groups" />
        </div>
        <div className="flex w-[80%] flex-col items-center ">
          <Link href="/groups/makeGroup">
            <div className="rounded-lg bg-[#5d8d30] px-7 py-3 text-white shadow-lg">
              Create a New Group
            </div>
          </Link>
          {groups.map((group) => (
            <GroupButton key={group.groupId} group={group} />
          ))}
        </div>
      </div>

      <div>
        <Navbar />
      </div>
    </div>
  );
}

function GroupButton({
  group,
}: {
  group: RouterOutputs["group"]["getGroupsOfUser"][number];
}) {
  return (
    <div className="m-5 w-full max-w-screen-2xl rounded-lg bg-[#e1fbbb] p-10 shadow-lg">
      <h2 className="text-center text-gray-900">{group.groupName}</h2>
    </div>
  );
}
