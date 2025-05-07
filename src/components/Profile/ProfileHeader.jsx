import React from "react";

import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";

const ProfileHeader = () => {
  return (
    <>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: 4, sm: 10 }}
        py={10}
      >
        <AvatarGroup
          justifySelf={"center"}
          alignSelf={"flex-start"}
          mx={"auto"}
          size={"2xl"}
        >
          <Avatar
            src={"/images/dogimg3.jpeg"}
            alt={"userprof.img"}
            name={"LeiBaley"}
            border={"2px solid black"}
          />
        </AvatarGroup>

        <VStack gap={2} justify={"space-evenly"} align={"start"} mx={"auto"}>
          <Flex
            direction={{ base: "column", sm: "row" }}
            w={"100%"}
            gap={4}
            justify={{ base: "center", sm: "space-between" }}
            align={"center"}
          >
            <Text
              fontSize={{ base: 24, md: 28 }}
              fontWeight={600}
              color={"#3C3835"}
            >
              LeiBaley
            </Text>
            <Flex justify={"center"} align={"center"} gap={4}>
              <Button
                h={"100%"}
                px={3}
                py={1}
                borderRadius={5}
                backgroundColor={"#3C383580"}
                fontSize={{ base: 16, sm: 18, md: 20 }}
                fontWeight={400}
                _hover={{
                  backgroundColor: "#6EA4EC",
                  color: "#000",
                }} /* change this it's abysmal */
              >
                Edit Profile
              </Button>
            </Flex>
          </Flex>

          <Flex
            w={"100%"}
            justify={{ base: "center", sm: "left" }}
            align={"center"}
            gap={{ base: 2, sm: 4 }}
          >
            <Text fontWeight={500}>
              <Text as={"span"} fontWeight={700}>
                4
              </Text>{" "}
              Posts
            </Text>

            <Text fontWeight={500}>
              <Text as={"span"} fontWeight={700}>
                3521
              </Text>{" "}
              Followers
            </Text>

            <Text fontWeight={500}>
              <Text as={"span"} fontWeight={700}>
                69
              </Text>{" "}
              Following
            </Text>
          </Flex>

          <Text fontSize={16} textAlign={{ base: "center", sm: "justify" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            convallis.
          </Text>
        </VStack>
      </Flex>
    </>
  );
};

export default ProfileHeader;
