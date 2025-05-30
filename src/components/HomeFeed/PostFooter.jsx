import { useState } from "react";
import {
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";

import { IoPawOutline, IoPaw } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";

const PostFooter = ({
  username,
  caption = "",
  isProfilePage,
  onCommentClick,
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
          <Box cursor="pointer" fontSize={25} onClick={onCommentClick}>
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
          <Flex px={5} pt={2} pb={5} fontWeight={600} color="#FFF">
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
        </>
      )}
    </Box>
  );
};

export default PostFooter;
