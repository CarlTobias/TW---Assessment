import React, { useEffect, useState } from "react";

import { Box, Grid, GridItem, Skeleton } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";

const ProfilePosts = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchPosts = async () => {
      try {
        const userId = user._id;
        const response = await fetch(
          `http://localhost:3000/api/posts?userId=${userId}`
        );
        const data = await response.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [user?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !caption) {
      console.log("Please fill in both the image and caption fields.");
      return;
    }

    const newPost = { imageUrl: image, caption: caption, userId: user?._id };

    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: { "Content-Type": "application/json" },
      });
      const post = await response.json();

      setPosts([post, ...posts]);
    } catch (err) {
      console.error("Error uploading post:", err);
    }
  };
  console.log(user);

  const handleDeletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
  };

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
          : posts.map((post) => {
              const userId = post.userId;

              return (
                <ProfilePost
                  key={post._id}
                  postId={post._id}
                  img={post.imageUrl}
                  caption={post.caption}
                  postUser={
                    userId && typeof userId === "object"
                      ? {
                          _id: userId._id,
                          username: userId.username,
                          profilePic: userId.profilePic,
                        }
                      : {
                          _id: user._id,
                          username: user.username,
                          profilePic: user.profilePic,
                        }
                  }
                  onDelete={handleDeletePost}
                />
              );
            })}
      </Grid>
    </>
  );
};

export default ProfilePosts;
