import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Flex } from "@chakra-ui/react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import authStore from "../../stores/authStore";
import userProfileStore from "../../stores/userProfileStore";

const ProfilePage = () => {
  const { uid: paramId } = useParams();
  const me = authStore((s) => s.user); // logged-in user
  const { profile, setProfile, clearProfile } = userProfileStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!paramId) {
      clearProfile();
      setLoading(false);
      return;
    }

    // Check if the profile being viewed is the logged-in user's profile
    if (paramId?.toString() === me?._id?.toString()) {
      // Show own profile directly (you don’t need to fetch it again)
      setProfile(me);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`http://localhost:3000/api/user/${paramId}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch: ${res.status} - ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched user profile:", data);
        setProfile(data);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      })
      .finally(() => setLoading(false));

    return () => clearProfile();
  }, [paramId, me?._id, setProfile, clearProfile]);

  const userToShow = profile || me;

  return (
    <Container maxW={"container.md"}>
      <Flex flexDirection={"column"} maxW={"100%"} py={10}>
        <ProfileHeader user={userToShow} loading={loading} />
      </Flex>
      <Flex
        direction={"column"}
        maxW={"100%"}
        px={{ base: 2, sm: 4 }}
        mx={"auto"}
        borderTop={"1px solid #000"}
      >
        <ProfileTabs user={userToShow} loading={loading} />
        <ProfilePosts user={userToShow} loading={loading} />
      </Flex>
    </Container>
  );
};


export default ProfilePage;
