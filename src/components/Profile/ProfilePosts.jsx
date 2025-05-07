import React, { useEffect, useState } from "react";

import { Box, Grid, GridItem, Skeleton, useDisclosure } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";

const ProfilePosts = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Grid
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        w={"100%"}
        gap={1}
      >
        {isLoading &&
          [0, 1, 2, 3, 4, 5].map((_, idx) => (
            <GridItem key={idx} align={"flex-start"}>
              <Skeleton>
                <Box h={350}>contents wrapped</Box>
              </Skeleton>
            </GridItem>
          ))}

        {!isLoading && (
          <>
            <ProfilePost img="/images/dogimg1.jpeg" />
            <ProfilePost img="/images/dogimg2.jpeg" />
            <ProfilePost img="/images/dogimg3.jpeg" />
            <ProfilePost img="/images/dogimg4.jpeg" />
          </>
        )}
      </Grid>
    </>
  );
};

export default ProfilePosts;
