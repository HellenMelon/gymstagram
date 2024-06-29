import Button from "@mui/material/Button";
import Navbar from "../_components/navbar";
import NewPostHeader from "./newPostHeader";
import PostDate from "./postPhotoCaption";
import SelectWorkout from "./selectWorkout";
import SelectWorkout2 from "./selectWorkout2";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <div className="p-7"></div>
      <NewPostHeader name="New Post" />
      <PostDate />
      <SelectWorkout />
      <div className="item-center mt-5 flex justify-center">
        <Button
          variant="contained"
          sx={{
            width: "30%",
            backgroundColor: "#bbdf8c",
            fontsize: 20,
            ":hover": {
              backgroundColor: "#e2f7c6", // Button hover color
            },
          }}
          component="a"
          href="http://localhost:3000/feed"
        >
          POST
        </Button>
      </div>
      <div className="flex flex-grow flex-col items-center justify-center">
        <Image
          src="/logo.png"
          alt="logo"
          className="mt-4 w-60 max-w-64"
          width={100}
          height={100}
        />
      </div>
      <Navbar />
    </div>
  );
}
