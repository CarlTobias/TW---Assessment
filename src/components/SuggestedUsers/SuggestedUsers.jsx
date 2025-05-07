import React from "react";

import { Box, Flex, Text, VStack } from "@chakra-ui/react";

import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";

const SuggestedUsers = () => {
  return (
    <>
      <VStack px={6} py={5} gap={4}>
        <SuggestedHeader />

        <Flex justify={"space-between"} align={"center"} w={"100%"}>
          <Text fontSize={12} fontWeight={700} color={"#00000099"}>
            Suggested for You
          </Text>

          <Text
            fontSize={12}
            fontWeight={700}
            color={"#000"}
            cursor={"pointer"}
            _hover={{ color: "#00000099" }}
          >
            See All
          </Text>
        </Flex>

        <SuggestedUser
          avatar="/images/dogimg5.jpg"
          followers={5261}
          user={"Svenniee_"}
        />
        <SuggestedUser
          avatar="/images/dogimg6.jpeg"
          followers={2519}
          user={"Luckyy7"}
        />
        <SuggestedUser
          avatar="/images/dogimg4.jpeg"
          followers={5}
          user={"LukeFlukeSpam"}
        />

        <Box alignSelf={"start"} mt={5} fontSize={12} color={"#6EA4EC"}>
          © 2025 Built By CoralReef
        </Box>
      </VStack>
    </>
  );
};

export default SuggestedUsers;
