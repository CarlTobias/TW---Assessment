import { useEffect, useState } from "react";
import { Avatar, Box, Button, Flex, Link, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SuggestedUser = ({ avatar, followers, user, userID, me }) => {
  const navigate = useNavigate();

  const handleVisit = () => {
    navigate(`/woofles/${userID}`);
  };

  return (
    <Flex justify={"space-between"} align={"center"} w={"100%"}>
      <Flex align={"center"} gap={2}>
        <Avatar src={avatar} name={user} size={"md"} />
        <VStack align={"start"} spacing={1}>
          <Box fontSize={12} fontWeight={600} color={"#000"} cursor={"pointer"}>
            {user}
          </Box>
          <Box fontSize={11} color={"#00000099"}>
            {followers} followers
          </Box>
        </VStack>
      </Flex>

      <Button
        h={"100%"}
        px={0}
        py={1}
        borderRadius={3}
        fontSize={12}
        fontWeight={400}
        textAlign={"right"}
        color={"#000"}
        onClick={handleVisit}
        _hover={{
          color: "#000",
        }}
      >
        Visit
      </Button>
    </Flex>
  );
};

export default SuggestedUser;
