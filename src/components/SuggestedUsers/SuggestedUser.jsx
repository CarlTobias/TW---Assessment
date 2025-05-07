import React, { useState } from "react";

import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";

const SuggestedUser = ({ avatar, followers, user }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <>
      <Flex justify={"space-between"} align={"center"} w={"100%"}>
        <Flex align={"center"} gap={2}>
          <Avatar src={avatar} name={user} size={"md"} />
          <VStack align={"start"} spacing={1}>
            <Box fontSize={12} fontWeight={600} color={"#000"}>
              {user}
            </Box>

            <Box fontSize={11} color={"#00000099"}>
              {followers} followers
            </Box>
          </VStack>
        </Flex>

        <Button
          h={"max-content"}
          p={0}
          bg={"none"}
          fontWeight={"500"}
          fontSize={13}
          color={"#000"}
          cursor={"pointer"}
          _hover={{ color: "#E6883E" }}
          onClick={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </Flex>
    </>
  );
};

export default SuggestedUser;
