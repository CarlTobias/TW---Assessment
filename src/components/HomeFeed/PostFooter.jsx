import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

import { IoPawOutline, IoPaw } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";

const PostFooter = ({
  username,
  caption = "",
  isProfilePage,
  newComment,
  setNewComment,
  handleCommentSubmit,
  loadingComment,
}) => {
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const handleLike = () => {
    setLike(!like);
    setLikes((prev) => (like ? prev - 1 : prev + 1));
  };

  const shownCaption =
    caption.length > 125 ? caption.slice(0, 125) + "..." : caption;

  return (
    <Box mt="auto">
      <Flex
        justify="left"
        align="center"
        gap={isProfilePage ? 2 : 4}
        w="100%"
        p={isProfilePage ? 0 : 4}
        pb={2}
        m={0}
      >
        <Box cursor="pointer" fontSize={25} onClick={handleLike}>
          {like ? <IoPaw color="#95CFF7" /> : <IoPawOutline color="#95CFF7" />}
        </Box>

        {isProfilePage ? (
          <Text fontWeight={500} color="#FFF">
            {likes === 1 ? "1 like" : `${likes} likes`}
          </Text>
        ) : (
          <Box cursor="pointer" fontSize={25}>
            <FaRegComment color="#F2D47E" />
          </Box>
        )}
      </Flex>

      {!isProfilePage && (
        <Text px={5} py={0} fontWeight={500} color="#FFF">
          {likes === 1 ? "1 like" : `${likes} likes`}
        </Text>
      )}

      {!isProfilePage && (
        <>
          <Flex px={5} pt={2} pb={0} fontWeight={600} color="#FFF">
            <Text>
              {username}{" "}
              <Text as="span" fontWeight={300}>
                {showFullCaption ? caption : shownCaption}
              </Text>
              {caption.length > 125 && (
                <Text
                  as="span"
                  fontWeight={400}
                  color="#FFF7EF99"
                  cursor="pointer"
                  onClick={() => setShowFullCaption(!showFullCaption)}
                >
                  {" "}
                  {showFullCaption ? "See less" : "See More"}
                </Text>
              )}
            </Text>
          </Flex>

          <Text fontSize="sm" px={5} py={2} fontWeight={400} color="#FFF7EF99">
            View all comments
          </Text>
        </>
      )}

      <Flex
        justify="space-between"
        align="center"
        gap={2}
        w="100%"
        pb={5}
        px={isProfilePage ? 0 : 5}
      >
        <InputGroup>
          <Input
            variant="flushed"
            fontSize={14}
            color={"#FFF"}
            placeholder="Bark something..."
            _placeholder={{ color: "#FFFFFF99" }}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCommentSubmit();
            }}
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
    </Box>
  );
};

export default PostFooter;
