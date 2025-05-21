import { useEffect } from "react";
import axios from "axios";
import userProfileStore from "../stores/userProfileStore";

const useFetchUserProfile = (userId) => {
  const setProfile = userProfileStore((state) => state.setProfile);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/user/${userId}`
        );
        setProfile(data); // data includes postsCount from your API
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }

    if (userId) fetchProfile();

    return () => userProfileStore.getState().clearProfile();
  }, [userId, setProfile]);
};

export default useFetchUserProfile;
