import React, { useState } from "react";

import { Box, Flex, Text } from "@chakra-ui/react";

import { IoPawOutline } from "react-icons/io5";
import { IoPaw } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";

const PostFooter = ({ username }) => {
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(0);

  const [showFullCaption, setShowFullCaption] = useState(false);
  const caption =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque convallis, ante ac tristique semper, nisl leo tristique arcu, at malesuada ipsum nisl nec velit.";

  const handleLike = () => {
    if (like) {
      setLike(false);
      setLikes(likes - 1);
    } else {
      setLike(true);
      setLikes(likes + 1);
    }
  };

  const showncaption = caption.length > 150 ? caption.slice(0, 150) + "..." : caption;

  return (
    <>
      <Flex
        justify={"left"}
        align={"center"}
        gap={4}
        w={"100%"}
        p={4}
        pb={2}
        m={0}
      >
        <Box cursor={"pointer"} fontSize={25} onClick={handleLike}>
          {!like ? (
            <IoPawOutline color={"#95CFF7"} />
          ) : (
            <IoPaw
              color={"#95CFF7"}
              style={{
                filter: "drop-shadow(0 0 5px #4A4971)",
              }}
            />
          )}
        </Box>

        <Box cursor={"pointer"} fontSize={25}>
          <FaRegComment color={"#F2D47E"} />
        </Box>
      </Flex>

      <Text className={"likes"} px={5} py={0}>
        {likes === 1 ? `${likes} like` : `${likes} likes`}
      </Text>

      <Flex className={"comment"} px={5} pt={2} pb={0}>
        <Text>
          {username}{" "}
          <Text as={"span"} fontWeight={300}>
            {showFullCaption ? caption : showncaption}
          </Text>
          <Text
            as={"span"}
            fontWeight={400}
            color={"#FFF7EF99"}
            cursor={"pointer"}
            onClick={() => setShowFullCaption(!showFullCaption)}
          >
            {" "}
            {showFullCaption ? "See less" : "See More"}
          </Text>
        </Text>
      </Flex>

      <Text className={"viewComments"} fontSize={"sm"} px={5} pt={0} pb={4}>
        View all comments
      </Text>
    </>
  );
};

export default PostFooter;
