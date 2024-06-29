import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { DummyPostData, DummyPostDataType } from "./dummyDataPosts";
import { Box } from "@mui/material";

interface postProps {
  post: DummyPostDataType;
}

function Post({ post }: postProps) {
  return (
    <Card
      sx={{
        // border: "1px solid #000", // Border color
        borderRadius: "8px", // Rounded corners
        width: "90%",
        marginLeft: "5%",
        marginRight: "5%",
        maxWidth: 600,
        margin: "auto",
        mt: 2,
      }}
    >
      <CardHeader title={post.createdById} subheader={post.createdAt} />
      <CardMedia
        component="img"
        height="400"
        image={post.image}
        alt={post.caption}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.caption}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function PostFeed() {
  const postsData = DummyPostData;
  return (
    <Box>
      {postsData.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Box>
  );
}
