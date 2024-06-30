"use client";
import React from "react";
import Header from "~/app/_components/header";
import { RouterOutputs, api } from "~/trpc/react";
import Image from "next/image";
import { Box, Checkbox, Divider, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function GroupPage({ params }: { params: { groupID: string } }) {
  const { data: group, isLoading } = api.group.getGroup.useQuery({
    groupId: params.groupID,
  });

  const { data: users } = api.group.getUsersOfGroup.useQuery({
    groupId: params.groupID,
  });

  if (!group || !users) {
    return <></>;
  }

  const foundGroup = group[0]!;

  return (
    <div className="min-h-screen bg-[#e2f7c6]">
      <Header name={foundGroup.name} />
      <div className="p-10"></div>
      <Box
        className="h-[25%] rounded-md"
        width="90%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginLeft="5%"
        marginRight="5%"
        p={2}
        sx={{
          mt: 0,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Box shadow
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginTop: 0,
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 1.5,
            fontSize: 20,
          }}
        >
          🔥 Daily Streak 🔥
        </Typography>

        <Divider sx={{ width: "100%" }} />

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            marginBottom: 0.5,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              marginTop: 1,
              marginBottom: 1,
            }}
          >
            Streak: 1 Day
          </Typography>
        </Box>

        <Divider sx={{ width: "100%" }} />
        <Typography
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            marginTop: 1,
            marginBottom: 1,
          }}
        >
          Keep the streak going by completing the daily challenge!
        </Typography>
      </Box>

      <Box
        height={150}
        width="90%"
        display="flex"
        flexDirection="column"
        justifyContent="right"
        alignItems="center"
        marginLeft="5%"
        marginRight="5%"
        p={2}
        sx={{
          mt: 2,
          backgroundColor: "white",
          borderRadius: "8px", // Rounded corners
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Box shadow
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            textSize: 19,
            // mb: 2,
          }}
        >
          Workout Routine
          <Typography
            variant="body2"
            // component="div"
          >
            (Select Routine)
          </Typography>
        </Typography>

        <IconButton
          sx={{
            color: "#000",
            marginTop: "0px",
            marginBottom: "1px",
          }}
          onClick={() =>
            (window.location.href = "http://localhost:3000/workouts")
          }
        >
          <AddIcon
            sx={{
              color: "#000",
              marginTop: "0px",
              marginBottom: "1px",
            }}
            fontSize="large"
          />
        </IconButton>
      </Box>

      <div className="grid grid-cols-3 gap-8 p-10">
        {users.map((user) => (
          <UserComponent key={user.name} user={user} />
        ))}
      </div>
    </div>
  );
}

function UserComponent({
  user,
}: {
  user: RouterOutputs["group"]["getUsersOfGroup"][number];
}) {
  let photoString: string;
  if (!user.photo) {
    photoString = "/logo.png";
  } else {
    photoString = user.photo;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-[#bbdf8c]">
        <Image src={photoString} className="h-full" alt="logo" layout="fill" />
      </div>
      <div>{user.name}</div>
      <div>1:17:13</div>
    </div>
  );
}
