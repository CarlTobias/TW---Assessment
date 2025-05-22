import { useState, useEffect } from "react";

import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

import authStore from "../../stores/authStore";

const ProfileHeader = ({ user, refreshProfile }) => {
  const me = authStore((s) => s.user);
  const isOwnProfile = me?._id === user?._id;

  const [isFollowing, setIsFollowing] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (!isOwnProfile && user?.followers && me?._id) {
      setIsFollowing(user.followers.includes(me._id));
    }
  }, [user, me, isOwnProfile]);
  

  const handleFollow = async () => {
    setButtonLoading(true);
    try {
      await axios.put(`http://localhost:3000/api/user/follow/${user._id}`, {
        currentUserId: me._id,
      });
      await refreshProfile(); // will cause isFollowing to update in useEffect
    } catch (err) {
      console.error(err);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleUnfollow = async () => {
    setButtonLoading(true);
    try {
      await axios.put(`http://localhost:3000/api/user/unfollow/${user._id}`, {
        currentUserId: me._id,
      });
      await refreshProfile(); // will cause isFollowing to update in useEffect
    } catch (err) {
      console.error(err);
    } finally {
      setButtonLoading(false);
    }
  };
  

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
            src={user.profilePic}
            alt={"userprof.img"}
            name={user.username}
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
              {user.username}
            </Text>
            <Flex justify={"center"} align={"center"} gap={4}>
              {isOwnProfile ? (
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
                  }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  h={"100%"}
                  px={3}
                  py={1}
                  borderRadius={5}
                  backgroundColor={isFollowing ? "#eee" : "#3C383580"}
                  fontSize={{ base: 16, sm: 18, md: 20 }}
                  fontWeight={400}
                  _hover={{
                    backgroundColor: isFollowing ? "#f44336" : "#6EA4EC",
                    color: "#000",
                  }}
                  onClick={isFollowing ? handleUnfollow : handleFollow}
                  isLoading={buttonLoading}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
              )}
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
                {user.postsCount || 0}
              </Text>{" "}
              Posts
            </Text>

            <Text fontWeight={500}>
              <Text as={"span"} fontWeight={700}>
                {user.followers?.length || 0}
              </Text>{" "}
              Followers
            </Text>

            <Text fontWeight={500}>
              <Text as={"span"} fontWeight={700}>
                {user.following?.length || 0}
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
