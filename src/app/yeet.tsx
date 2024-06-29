"use client";

import { useSession } from "next-auth/react";
import { UploadButton } from "./_components/uploadthing";

export default function Yeet() {
  const a = useSession();

  return (
    <div>
      {JSON.stringify(a)}
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
