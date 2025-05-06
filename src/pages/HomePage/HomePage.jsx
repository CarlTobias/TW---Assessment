import React from "react";
import "./HomePage.css";

import { Box, Container, Flex } from "@chakra-ui/react";
import HomeFeed from "../../components/HomeFeed/HomeFeed";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers"

const HomePage = () => {
  return (
    <>
      <Container maxW={"100vw"}>
        <Flex justify={"center"} gap={20}>
          <Box flex={1} display={{ base: "none", lg: "block" }} />

          <Box className={"homeFeedHeader"} flex={3} py={10}>
            <HomeFeed />
          </Box>

          <Box
            className={"homeFeedHeader"}
            flex={1}
            mr={10}
            display={{ base: "none", lg: "block" }}
            maxW={"300px"}
            py={5}
          >
            <SuggestedUsers />
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default HomePage;
