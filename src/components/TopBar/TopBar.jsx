import React from "react";

import { Box, Flex, Image, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const TopBar = () => {
  return (
    <>
      <Flex bg={"#3C3835"} h={"100%"}>
        <Link
          to={"/wooflesHome"}
          as={RouterLink}
          display={{ base: "none", md: "block" }}
        >
          <Image />
        </Link>

        <Box></Box>
      </Flex>
    </>
  );
};

export default TopBar;
