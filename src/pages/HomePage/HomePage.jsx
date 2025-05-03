import React from "react";

import { Box, Container, Flex } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <>
      <Container maxW={"100vw"} position={"relative"}>
        <Flex justify={"center"}>
          <Box py={10} mr={6} border={"1px solid black"}>
            User Feed FYP
          </Box>

          <Box
            position={"absolute"}
            top={"0"}
            right={"10"}
            mr={20}
            display={{ base: "none", lg: "block" }}
            maxW={"300px"}
            border={"1px solid red"}
          >
            Suggested Users
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default HomePage;
