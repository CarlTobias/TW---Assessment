import React from "react";

import TopBar from "../../components/TopBar/TopBar";

import { Box, Flex } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";

const PageLayout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Flex direction={"column"} minH={"100vh"} bg={"#FFF7EF"}>
        {/* TopBar on Top */}
        {pathname !== "/WooflesAuth" && (
          <Box h={"6vh"}>
            <TopBar />
          </Box>
        )}

        {/* Page Content */}
        <Box flex={1}>
          <Outlet />
        </Box>
      </Flex>
    </>
  );
};

export default PageLayout;
