import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) redirect("/auth/login");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#f2cdb7] to-[#f2e0d4] text-white">
      {/* <h1 className="text-5xl font-medium">Gymstagram</h1> */}
      <Link href="/feed">
        <Image src="/logo.png" alt="logo" width={300} height={300} />
      </Link>
    </main>
  );
}
