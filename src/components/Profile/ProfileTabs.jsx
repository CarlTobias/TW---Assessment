import React from "react";

import { Box, Flex, Text } from "@chakra-ui/react";

import { SiDatadog } from "react-icons/si";
import { IoPaw } from "react-icons/io5";

const ProfileTabs = () => {
  return (
    <>
      <Flex
        w={"100%"}
        justify={"center"}
        gap={{ base: 4, sm: 10 }}
        mb={4}
        textTransform={"uppercase"}
        fontWeight={700}
      >
        <Flex
          borderTop={"1px solid #000"}
          align={"center"}
          gap={2}
          pt={1}
          px={2}
          cursor={"pointer"}
        >
          <Box>
            <SiDatadog size={"32px"} />
          </Box>
          <Text
            display={{ base: "none", md: "block" }}
            _hover={{ color: "#E6883E" }}
            _active={{ color: "#E6883E" }}
          >
            Posts
          </Text>
        </Flex>

        <Flex align={"center"} gap={2} pt={1} px={2} cursor={"pointer"}>
          <Box>
            <IoPaw size={"32px"} />
          </Box>
          <Text
            display={{ base: "none", md: "block" }}
            _hover={{ color: "#6EA4EC" }}
            _active={{ color: "#6EA4EC" }}
          >
            Liked
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default ProfileTabs;
