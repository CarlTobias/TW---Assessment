import React from "react";

import { Avatar, Flex, Text } from "@chakra-ui/react";

const Comment = ({ createdAt, username, profpic, text }) => {
  return (
    <>
      <Flex align={"center"} gap={4} mb={4}>
        <Avatar src={profpic} name={username} size={"sm"} />

        <Flex direction={"column"}>
          <Flex align={"flex-start"} gap={2}>
            <Text fontWeight={600} fontSize={14} color={"#FFF"}>
              {username}
            </Text>

            <Text fontWeight={400} fontSize={14} color={"#FFF"}>
              {text}
            </Text>
          </Flex>
          <Text fontWeight={400} fontSize={12} color={"#FFFFFF99"}>
            {createdAt}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default Comment;
