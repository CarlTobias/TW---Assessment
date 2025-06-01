import { useEffect, useState } from "react";
import axios from "axios";

import { Container, Flex, Spinner, Text } from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import authStore from "../../stores/authStore";

const HomeFeed = () => {
  const user = authStore((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "https://woofles.onrender.com/api/posts"
        );
        console.log("Fetched posts from backend:", res.data);
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" color="orange.300" />
      </Flex>
    );
  }

  return (
    <Container maxW={"container.sm"} py={0} px={2}>
      <Flex flexDirection={"column"} gap={10}>
        {posts.length === 0 ? (
          <Text color="gray.400" textAlign="center">
            No posts to show.
          </Text>
        ) : (
          posts.map((post) => (
            <FeedPost
              key={post._id}
              img={post.imageUrl}
              username={post.user?.username}
              avatar={post.user?.profilePic}
              createdAt={post.createdAt}
              caption={post.caption}
              postId={post._id}
              postUser={post.user}
              user={user}
            />
          ))
        )}
      </Flex>
    </Container>
  );
};

export default HomeFeed;
