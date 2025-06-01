import { useState, useEffect } from "react";

import { Box, Flex, Text, VStack } from "@chakra-ui/react";

import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import authStore from "../../stores/authStore";

const SuggestedUsers = () => {
  const [suggested, setSuggested] = useState([]);
  const currentUser = authStore((store) => store.user);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const res = await fetch(
          `https://woofles.onrender.com/api/user/suggested/${currentUser._id}`
        );
        const data = await res.json();
        setSuggested(data);
      } catch (error) {
        console.error("Failed to fetch suggested users:", error);
      }
    };

    if (currentUser?._id) {
      fetchSuggestedUsers();
    }
  }, [currentUser]);

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

        {suggested
          .filter((user) => user._id !== currentUser._id)
          .map((user) => (
            <SuggestedUser
              key={user._id}
              avatar={user.profilePic}
              followers={user.followers.length}
              user={user.username}
              userID={user._id}
              me={currentUser}
            />
          ))}

        <Box alignSelf={"start"} mt={5} fontSize={12} color={"#6EA4EC"}>
          © 2025 Built By CoralReef
        </Box>
      </VStack>
    </>
  );
};

export default SuggestedUsers;
