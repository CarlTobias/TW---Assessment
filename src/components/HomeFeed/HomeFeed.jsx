import React from "react";

import { Container, Flex } from "@chakra-ui/react";
import FeedPost from "./FeedPost";

const HomeFeed = () => {
  return (
    <>
      <Container maxW={"container.sm"} py={0} px={2}>
        <Flex flexDirection={"column"} gap={10}>
          <FeedPost
            img={"/images/dogimg1.jpeg"}
            username={"BevAndShadow"}
            avatar={"/images/dogimg1.jpeg"}
          />
          <FeedPost
            img={"/images/dogimg2.jpeg"}
            username={"L&L"}
            avatar={"/images/dogimg2.jpeg"}
          />
          <FeedPost
            img={"/images/dogimg3.jpeg"}
            username={"LeiBaley"}
            avatar={"/images/dogimg3.jpeg"}
          />
          <FeedPost
            img={"/images/dogimg4.jpeg"}
            username={"LukiePookie"}
            avatar={"/images/dogimg4.jpeg"}
          />
        </Flex>
      </Container>
    </>
  );
};

export default HomeFeed;
