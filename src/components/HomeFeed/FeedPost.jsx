import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AspectRatio,
  Box,
  Image,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PostModal from "../PostModal/PostModal";

const FeedPost = ({
  img,
  username,
  avatar,
  createdAt,
  caption,
  postId,
  postUser,
  user,
  handleDelete,
}) => {
  const [likes, setLikes] = useState(postUser?.likes || []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newComment, setNewComment] = useState("");
  const [loadingComment, setLoadingComment] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`https://woofles.onrender.com:3000/api/comments/${postId}`)
        .then((res) => setComments(res.data))
        .catch((err) => console.error("Failed to fetch comments:", err));
    }
  }, [isOpen, postId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      setLoadingComment(true);
      await axios.post(`https://woofles.onrender.com:3000/api/comments/${postId}`, {
        userId: user._id,
        text: newComment,
      });

      const res = await axios.get(
        `https://woofles.onrender.com:3000/api/comments/${postId}`
      );
      setComments(res.data);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
    } finally {
      setLoadingComment(false);
    }
  };

  return (
    <VStack
      backgroundColor="#3C3835"
      borderRadius={10}
      align="stretch"
      spacing={0}
    >
      <PostHeader
        avatar={avatar}
        username={username}
        createdAt={createdAt}
      />
      <Box>
        <AspectRatio ratio={1} width="100%">
          <Image src={img} alt={username} objectFit="cover" display="block" />
        </AspectRatio>
      </Box>

      <PostFooter
        postId={postId}
        userId={user?._id}
        initialLikes={likes}
        username={username}
        caption={caption}
        onCommentClick={onOpen}
        onLikeToggle={(updatedLikes) => setLikes(updatedLikes)}
      />

      <PostModal
        isOpen={isOpen}
        onClose={onClose}
        img={img}
        caption={caption}
        postUser={postUser}
        user={user}
        handleDelete={handleDelete}
        comments={comments}
        newComment={newComment}
        setNewComment={setNewComment}
        handleCommentSubmit={handleCommentSubmit}
        loadingComment={loadingComment}
        postId={postId}
      />
    </VStack>
  );
};

export default FeedPost;
