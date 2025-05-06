import React from "react";

import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react";

const PostHeader = ({ avatar, username }) => {
  return (
    <>
      <Flex justify={"space-between"} align={"center"} w={"100%"} p={4}>
        <Flex align={"center"} gap={2}>
          <Avatar src={avatar} alt={"profpic"} size={"sm"} />
          <VStack fontSize={12}>
            <Flex flexDirection={"column"} justify={"left"}>
              <Text className={"username"} fontSize={12}>
                {username}
              </Text>
              <Flex className={"locationTimePosted"} gap={2} fontSize={10}>
                <Text>Just Now</Text>
                <Text>|</Text>
                <Text>Location</Text>
              </Flex>
            </Flex>
          </VStack>
        </Flex>
        <Box cursor={"pointer"}>
          <Text
            className={"unFollow"}
            fontSize={12}
            _hover={{ color: "#E6883E" }}
          >
            Unfollow
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default PostHeader;
