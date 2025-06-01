import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import { FaRegComment } from "react-icons/fa";

const PostFooter = ({
  username,
  caption = "",
  isProfilePage,
  onCommentClick,
}) => {
  const [showFullCaption, setShowFullCaption] = useState(false);

  const shownCaption =
    caption.length > 125 ? caption.slice(0, 125) + "..." : caption;

  return (
    <Box mt="auto">
      {!isProfilePage && (
        <>
          <Flex flexDirection={"row"} justify={"space-between"} align={"center"} minW={"100%"} gap={2} p={5}>
            <Flex flex={2} fontWeight={600} color="#FFF">
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

            {!isProfilePage && (
              <Flex justify={"left"} align={"center"}>
                <Box cursor="pointer" fontSize={25} onClick={onCommentClick}>
                  <FaRegComment color="#F2D47E" />
                </Box>
              </Flex>
            )}
          </Flex>
        </>
      )}
    </Box>
  );
};

export default PostFooter;
