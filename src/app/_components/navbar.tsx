import Link from "next/link";
import { Group, Gym, Home, Plus, ProfileCircle } from "iconoir-react";

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex flex-row">
      <Link
        href="/feed"
        className="flex aspect-square flex-grow flex-row items-center justify-center"
      >
        <Home width={32} height={32} />
      </Link>
      <Link
        href="/workouts"
        className="flex aspect-square flex-grow flex-row items-center justify-center"
      >
        <Gym width={32} height={32} />
        {/* <a className="flex-1 p-4 text-center">Dashboard</a> */}
      </Link>
      <Link
        href="/post"
        className="flex aspect-square flex-grow flex-row items-center justify-center"
      >
        <Plus width={40} height={40} />
        {/* <a className="flex-1 p-4 text-center">Dashboard</a> */}
      </Link>
      <Link
        href="/groups"
        className="flex aspect-square flex-grow flex-row items-center justify-center"
      >
        <Group width={32} height={32} />
        {/* <a className="flex-1 p-4 text-center">Dashboard</a> */}
      </Link>
      <Link
        href="/profile"
        className="flex aspect-square flex-grow flex-row items-center justify-center"
      >
        <ProfileCircle width={32} height={32} />
        {/* <a className="flex-1 p-4 text-center">Dashboard</a> */}
      </Link>
    </nav>
  );
}
