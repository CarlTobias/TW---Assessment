import React, { useState } from "react";

import TopBar from "../../components/TopBar/TopBar";

import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import UploadForm from "../../components/UploadForm/UploadForm";

import { FaPlus } from "react-icons/fa";

const PageLayout = () => {
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex direction={"column"} minH={"100vh"} bg={"#FFF"}>
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

        <Flex position={"fixed"} bottom={5} right={5}>
          <Button
            py={6}
            backgroundColor={"#534F4C"}
            fontWeight={"800"}
            borderRadius={50}
            _hover={{ backgroundColor: "#E49F43" }}
            onClick={onOpen}
          >
            <FaPlus size={15} color={"#FFF"} />
          </Button>
        </Flex>
      </Flex>

      <UploadForm
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default PageLayout;
