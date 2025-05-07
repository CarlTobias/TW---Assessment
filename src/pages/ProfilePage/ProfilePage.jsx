import React from "react";

import { Container, Flex } from "@chakra-ui/react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfilePosts from "../../components/Profile/ProfilePosts";

const ProfilePage = () => {
  return (
    <>
      <Container maxW={"container.md"}>
        <Flex
          flexDirection={"column"}
          maxW={"100%"}
          py={10}
        >
          <ProfileHeader />
        </Flex>
        <Flex
          direction={"column"}
          maxW={"100%"}
          px={{ base: 2, sm: 4 }}
          mx={"auto"}
          borderTop={"1px solid #000"}
        >
          <ProfileTabs />
          <ProfilePosts />
        </Flex>
      </Container>
    </>
  );
};

export default ProfilePage;
