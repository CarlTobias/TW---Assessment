import { useEffect, useState } from "react";
import { Avatar, Box, Button, Flex, Link, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

import authStore from "../../stores/authStore";


const SuggestedUser = ({ avatar, followers, user, userID, me }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (me && me.following) {
      setIsFollowed(me.following.includes(userID));
    }
  }, [me, userID]);

  const fetchUser = authStore((s) => s.fetchUser);

  const handleFollowToggle = async () => {
    if (loading) return;

    if (isFollowed && me.following.includes(userID)) {
      console.log("Already following user — skipping request.");
      return;
    }

    setLoading(true);
    try {
      const endpoint = isFollowed
        ? `http://localhost:3000/api/user/unfollow/${userID}`
        : `http://localhost:3000/api/user/follow/${userID}`;

      const payload = { currentUserId: me._id };

      const res = await axios.put(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Toggle follow result:", res.data);

      await fetchUser(me._id);
      const updatedUser = authStore.getState().user;

      setIsFollowed(updatedUser.following.includes(userID));
    } catch (err) {
      console.error("Follow toggle error:", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Flex justify={"space-between"} align={"center"} w={"100%"}>
      <Flex align={"center"} gap={2}>
        <Link
          as={RouterLink}
          to={`/woofles/${userID}`}
          _hover={{ textDecoration: "none" }}
        >
          <Avatar src={avatar} name={user} size={"md"} />
        </Link>
        <VStack align={"start"} spacing={1}>
          <Link
            as={RouterLink}
            to={`/woofles/${userID}`}
            _hover={{ textDecoration: "none" }}
          >
            <Box
              fontSize={12}
              fontWeight={600}
              color={"#000"}
              cursor={"pointer"}
            >
              {user}
            </Box>
          </Link>
          <Box fontSize={11} color={"#00000099"}>
            {followers} followers
          </Box>
        </VStack>
      </Flex>

      <Button
        h={"max-content"}
        p={0}
        bg={"none"}
        fontWeight={"500"}
        fontSize={13}
        color={"#000"}
        cursor={"pointer"}
        _hover={{ color: "#E6883E" }}
        onClick={handleFollowToggle}
        isDisabled={loading}
      >
        {loading ? "..." : isFollowed ? "Unfollow" : "Follow"}
      </Button>
    </Flex>
  );
};

export default SuggestedUser;
