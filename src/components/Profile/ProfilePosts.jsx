import React, { useEffect, useState } from "react";

import { Box, Grid, GridItem, Skeleton } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
import authStore from "../../stores/authStore";

const ProfilePosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const user = authStore((store) => store.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userId = user?._id;
        const response = await fetch(
          `http://localhost:3000/api/posts?userId=${userId}`
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);


  return (
    <>
      <Grid
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        w={"100%"}
        gap={1}
      >
        {isLoading
          ? [0, 1, 2, 3, 4, 5].map((_, idx) => (
              <GridItem key={idx}>
                <Skeleton>
                  <Box h={350}></Box>
                </Skeleton>
              </GridItem>
            ))
          : posts.map((post) => (
              <ProfilePost
                key={post._id}
                img={post.imageUrl}
                caption={post.caption}
              />
            ))}
      </Grid>
    </>
  );
};

export default ProfilePosts;
