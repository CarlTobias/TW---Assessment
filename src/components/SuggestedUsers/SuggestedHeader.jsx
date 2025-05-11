import React from "react";

import { Avatar, Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import authStore from "../../stores/authStore";

const SuggestedHeader = () => {
  const user = authStore((store) => store.user);
  const logout = authStore((store) => store.logout);

  const handleLogout = () => {
    logout();
  };

  if (!user) return null;

  return (
    <>
      <Flex justify={"space-between"} align={"center"} w={"100%"}>
        <Link
          as={RouterLink}
          to={`/profile/${user.username}`}
          display="flex"
          alignItems="center"
          _hover={{ textDecoration: "none" }}
        >
          <Flex align={"center"} gap={2}>
            <Avatar name={user.username} size={"sm"} src={user.profilePic} />
            <Text
              fontSize={14}
              fontWeight={600}
              color={"#000"}
              cursor={"pointer"}
            >
              {user.username}
            </Text>
          </Flex>
        </Link>
        <Link
          as={RouterLink}
          to={"/wooflesAuth"}
          fontSize={14}
          fontWeight={"500"}
          color={"#757DAC"}
          style={{ textDecoration: "none" }}
          cursor={"pointer"}
          onClick={handleLogout}
        >
          Log Out
        </Link>
      </Flex>
    </>
  );
};

export default SuggestedHeader;
