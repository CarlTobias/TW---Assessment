import axios from "axios";
import userProfileStore from "../stores/userProfileStore";

const useFetchUserProfile = () => {
  const setProfile = userProfileStore((state) => state.setProfile);
  const clearProfile = userProfileStore((state) => state.clearProfile);

  const fetchProfile = async (userId) => {
    if (!userId) {
      clearProfile();
      return;
    }

    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/user/${userId}`
      );
      setProfile(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return fetchProfile;
};

export default useFetchUserProfile;
