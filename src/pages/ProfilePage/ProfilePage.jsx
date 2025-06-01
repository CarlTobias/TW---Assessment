import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Flex } from "@chakra-ui/react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import authStore from "../../stores/authStore";
import userProfileStore from "../../stores/userProfileStore";
import useFetchUserProfile from "../../hooks/useFetchUserProfile";

const ProfilePage = () => {
  const { uid: paramId } = useParams();
  const me = authStore((s) => s.user);
  const profile = userProfileStore((s) => s.profile);
  const clearProfile = userProfileStore((s) => s.clearProfile);
  const setProfile = userProfileStore((s) => s.setProfile);

  const [loading, setLoading] = useState(true);

  const fetchUserProfile = useFetchUserProfile();

  useEffect(() => {
    const loadProfile = async () => {
      if (!paramId) {
        clearProfile();
        setLoading(false);
        return;
      }

      if (paramId === me?._id) {
        setLoading(true);
        await fetchUserProfile(paramId);
        setLoading(false);
      } else {
        setLoading(true);
        await fetchUserProfile(paramId);
        setLoading(false);
      }
    };

    loadProfile();
  }, [paramId, me]);
  

  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      setLoading(false);
    }
  }, [profile]);

  const userToShow = profile || me;

  return (
    <Container maxW={"container.md"}>
      <Flex flexDirection={"column"} maxW={"100%"} py={10}>
        <ProfileHeader
          user={userToShow}
          loading={loading}
          refreshProfile={() => fetchUserProfile(paramId)}
        />
      </Flex>
      <Flex
        direction={"column"}
        maxW={"100%"}
        px={{ base: 2, sm: 4 }}
        mx={"auto"}
        borderTop={"1px solid #000"}
      >
        <ProfileTabs user={userToShow} loading={loading} />
        <ProfilePosts
          key={userToShow._id}
          user={userToShow}
          loading={loading}
        />
      </Flex>
    </Container>
  );
};



export default ProfilePage;
