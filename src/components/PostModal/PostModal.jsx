import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import Comment from "./Comment";
import PostFooter from "../HomeFeed/PostFooter";

import { MdDelete } from "react-icons/md";

const PostModal = ({
  isOpen,
  onClose,
  img,
  caption,
  postId,
  postUser,
  user,
  handleDelete,
  comments = [],
  newComment,
  setNewComment,
  handleCommentSubmit,
  loadingComment,
}) => {
  return (
    <Modal
      isCentered
      size={{ base: "3xl", md: "5xl" }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={0} backgroundColor={"#3C3835"} borderRadius={5}>
          <Flex w={{ base: "90%", sm: "70%", md: "100%" }} gap={4} mx={"auto"}>
            <Box flex={1.5} borderLeftRadius={4} overflow={"hidden"}>
              <Image
                src={img}
                alt="post"
                w={"100%"}
                maxH={"95vh"}
                objectFit={"cover"}
              />
            </Box>

            <Flex
              flex={1}
              flexDirection={"column"}
              pt={4}
              px={5}
              display={{ base: "none", md: "flex" }}
            >
              <Flex justify={"space-between"} align={"center"}>
                <Flex align={"center"} gap={2} color={"#FFFFFFCC"}>
                  <Avatar
                    src={postUser?.profilePic || "/images/default.jpg"}
                    size="sm"
                    name={postUser?.username}
                  />
                  <Text fontWeight={600} fontSize={16}>
                    {postUser?.username}
                  </Text>
                </Flex>

                {user?._id && postUser?._id && user._id === postUser._id && (
                  <Box
                    onClick={handleDelete}
                    cursor="pointer"
                    color="#FFFFFFCC"
                    _hover={{ color: "red.500" }}
                    transition="color 0.2s"
                  >
                    <MdDelete size={24} />
                  </Box>
                )}
              </Flex>

              <Text color="#FFFFFFCC" fontSize={14} my={4}>
                {caption}
              </Text>

              <Divider my={4} backgroundColor={"#FFFFFFCC"} />

              <VStack
                align="left"
                w="100%"
                h={{ md: "300px", lg: "500px" }}
                overflowY="auto"
              >
                {Array.isArray(comments) && comments.length === 0 ? (
                  <Text
                    color="#FFFFFF99"
                    fontStyle="italic"
                    mt={2}
                    w="100%"
                    textAlign="center"
                  >
                    No comments yet.
                  </Text>
                ) : (
                  comments.map((comment) => {
                    const date = new Date(comment.createdAt);
                    const formattedDate = `${date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })} ${date
                      .toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .toLowerCase()}`;

                    return (
                      <Comment
                        key={comment._id}
                        createdAt={formattedDate}
                        username={comment.userId.username}
                        profpic={
                          comment.userId.profilePic || "/images/default.jpg"
                        }
                        text={comment.text}
                      />
                    );
                  })
                )}
              </VStack>

              <Divider my={4} backgroundColor={"#000000CC"} />

              <PostFooter
                isProfilePage
                newComment={newComment}
                setNewComment={setNewComment}
                handleCommentSubmit={handleCommentSubmit}
                loadingComment={loadingComment}
              />

              <Flex
                justify="space-between"
                align="center"
                gap={2}
                w="100%"
                pb={5}
                px={0}
              >
                <InputGroup>
                  <Input
                    variant="flushed"
                    fontSize={14}
                    color="#FFF"
                    placeholder="Bark something..."
                    _placeholder={{ color: "#FFFFFF99" }}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleCommentSubmit()
                    }
                  />
                  <InputRightElement>
                    <Button
                      background="transparent"
                      fontWeight={600}
                      fontSize={14}
                      color="#FFF"
                      cursor="pointer"
                      _hover={{ color: "#E6883E" }}
                      isLoading={loadingComment}
                      onClick={handleCommentSubmit}
                    >
                      Post
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;
