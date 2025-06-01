import { useState, useEffect } from "react";

import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

import EditProfile from "./EditProfile";
import authStore from "../../stores/authStore";

const ProfileHeader = ({ user, refreshProfile }) => {
  const me = authStore((s) => s.user);
  const isOwnProfile = me?._id === user?._id;

  const [isFollowing, setIsFollowing] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!isOwnProfile && user?.followers && me?._id) {
      const following = user.followers.some(
        (follower) => follower._id?.toString() === me._id
      );
      setIsFollowing(following);
    }
  }, [user.followers, me._id, isOwnProfile]);

  const handleFollow = async () => {
    setButtonLoading(true);
    try {
      await axios.put(`https://woofles.onrender.com:3000/api/user/follow/${user._id}`, {
        currentUserId: me._id,
      });

      user.followers.push({ _id: me._id });
      setIsFollowing(true);
    } catch (err) {
      console.error("Follow failed:", err?.response?.data || err.message);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleUnfollow = async () => {
    setButtonLoading(true);
    try {
      await axios.put(`https://woofles.onrender.com:3000/api/user/unfollow/${user._id}`, {
        currentUserId: me._id,
      });

      user.followers = user.followers.filter(
        (follower) => follower._id?.toString() !== me._id
      );
      setIsFollowing(false);
    } catch (err) {
      console.error("Unfollow failed:", err?.response?.data || err.message);
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

        <VStack
          gap={2}
          justify={"space-between"}
          align={"start"}
          mx={"auto"}
          w="100%"
        >
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
                  border={"solid 2px black"}
                  borderRadius={5}
                  fontSize={{ base: 16, sm: 18, md: 20 }}
                  fontWeight={400}
                  _hover={{
                    backgroundColor: "#6EA4EC",
                    color: "#000",
                  }}
                  onClick={onOpen}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  h={"100%"}
                  px={3}
                  py={1}
                  borderRadius={5}
                  backgroundColor={isFollowing ? "#3C3835" : "#3C3835"}
                  fontSize={{ base: 16, sm: 18, md: 20 }}
                  fontWeight={400}
                  color={"#FFF"}
                  _hover={{
                    backgroundColor: isFollowing ? "#f44336" : "#E49F43",
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

          <Text
            minW={"100%"}
            fontSize={16}
            textAlign={{ base: "center", sm: "justify" }}
          >
            {user.bio || "No bio."}
          </Text>
        </VStack>
      </Flex>

      <EditProfile
        isOpen={isOpen}
        onClose={onClose}
        user={user}
        onProfileUpdated={refreshProfile}
      />
    </>
  );
};

export default ProfileHeader;
