import { useEffect, useState } from "react";
import axios from "axios";

import { Flex, GridItem, Image, Text, useDisclosure } from "@chakra-ui/react";
import PostModal from "../PostModal/PostModal";
import authStore from "../../stores/authStore";

import { FaComment } from "react-icons/fa";

const ProfilePost = ({ img, caption, postId, onDelete, postUser }) => {
  const user = authStore((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [loadingComment, setLoadingComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    axios
      .get(`https://woofles.onrender.com/api/comments/${postId}`)
      .then((res) => {
        setCommentCount(res.data.length);
      })
      .catch((err) => console.error("Failed to fetch comment count:", err));
  }, [postId]);

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`https://woofles.onrender.com/api/comments/${postId}`)
        .then((res) => {
          setComments(res.data);
        })
        .catch((err) => console.error("Failed to fetch comments:", err));
    }
  }, [isOpen, postId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      setLoadingComment(true);
      await axios.post(`https://woofles.onrender.com/api/comments/${postId}`, {
        userId: user._id,
        text: newComment,
      });

      const res = await axios.get(
        `https://woofles.onrender.com/api/comments/${postId}`
      );
      setComments(res.data);
      setCommentCount(res.data.length);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
    } finally {
      setLoadingComment(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://woofles.onrender.com/api/posts/${postId}`);
      onClose();
      if (onDelete) onDelete(postId);
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  return (
    <>
      <GridItem
        position={"relative"}
        borderRadius={4}
        aspectRatio={2 / 3}
        cursor={"pointer"}
        overflow={"hidden"}
        onClick={onOpen}
      >
        <Flex
          position={"absolute"}
          top={0}
          bottom={0}
          left={0}
          right={0}
          zIndex={1}
          justify={"center"}
          opacity={0}
          backgroundColor={"#00000080"}
          _hover={{ opacity: 1 }}
          transition={"all 0.3s"}
        >
          <Flex justify={"center"} align={"center"} gap={25} color={"#FFFFFF"}>
            <Flex justify={"center"} align={"center"} gap={1}>
              <FaComment />
              <Text fontWeight={500}>{commentCount}</Text>
            </Flex>
          </Flex>
        </Flex>

        <Image src={img} alt="post" w={"100%"} h={"100%"} objectFit={"cover"} />
      </GridItem>

      <PostModal
        isOpen={isOpen}
        onClose={onClose}
        img={img}
        caption={caption}
        postId={postId}
        postUser={postUser}
        user={user}
        handleDelete={handleDelete}
        comments={comments}
        newComment={newComment}
        setNewComment={setNewComment}
        handleCommentSubmit={handleCommentSubmit}
        loadingComment={loadingComment}
      />
    </>
  );
};

export default ProfilePost;
