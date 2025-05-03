import React from "react";

import DropdownMenu from "../DropdownMenu/DropdownMenu";

import { Box, Flex, Image, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const TopBar = () => {
  return (
    <>
      <Flex
        bg={"#3C3835"}
        h={"100%"}
        justify={"space-between"}
        align={"center"}
        pl={"7px"}
      >
        <Tooltip label={"Home"} hasArrow placement={"right"} bg={"none"} >
          <Box w={"35px"} mb={"2px"}>
            <Link
              to={"/wooflesHome"}
              as={RouterLink}
              display={{ base: "none", md: "block" }}
            >
              <Image src="../../../public/images/wooflesLogo.png" />
            </Link>
          </Box>
        </Tooltip>

        <Tooltip label={"Menu"} hasArrow placement={"left"} bg={"none"} >
          <Box>
            <DropdownMenu />
          </Box>
        </Tooltip>
      </Flex>
    </>
  );
};

export default TopBar;
