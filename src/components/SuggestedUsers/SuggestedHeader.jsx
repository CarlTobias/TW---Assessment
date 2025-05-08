import React from "react";

import { Avatar, Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SuggestedHeader = () => {
  return (
    <>
      <Flex justify={"space-between"} align={"center"} w={"100%"}>
        <Flex align={"center"} gap={2}>
          <Avatar name="LeiBaley" size={"sm"} src="/images/dogimg3.jpeg" />
          <Text fontSize={14} fontWeight={600} color={"#000"}>
            LeiBaley
          </Text>
        </Flex>
        <Link
          as={RouterLink}
          to={"/wooflesAuth?authtype=login"}
          fontSize={14}
          fontWeight={"500"}
          color={"#757DAC"}
          style={{ textDecoration: "none" }}
          cursor={"pointer"}
        >
          Log Out
        </Link>
      </Flex>
    </>
  );
};

export default SuggestedHeader;
