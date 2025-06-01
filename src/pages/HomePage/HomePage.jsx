import { Box, Container, Flex } from "@chakra-ui/react";
import HomeFeed from "../../components/HomeFeed/HomeFeed";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";

const HomePage = () => {
  return (
    <Container maxW="100vw" p={0}>
      <Flex justify="center" gap={20}>
        {/* Empty left space on large screens */}
        <Box flex={1} display={{ base: "none", lg: "block" }} />

        {/* Main Feed */}
        <Box flex={3} py={10}>
          <HomeFeed />
        </Box>

        {/* Suggested Users on right side (hidden on mobile) */}
        <Box
          flex={1}
          mr={10}
          display={{ base: "none", lg: "block" }}
          maxW="300px"
          py={5}
        >
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
