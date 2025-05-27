import React from "react";

import { AspectRatio, Box, Image, VStack } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

const FeedPost = ({ img, username, avatar, caption }) => {
  return (
    <VStack
      backgroundColor="#3C3835"
      borderRadius={10}
      align="stretch"
      spacing={0}
    >
      <PostHeader avatar={avatar} username={username} />
      <Box>
        <AspectRatio ratio={1} width="100%">
          <Image src={img} alt={username} objectFit="cover" display="block" />
        </AspectRatio>
      </Box>
      <PostFooter username={username} caption={caption} />
    </VStack>
  );
};


export default FeedPost;
