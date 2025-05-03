import React from "react";
import './DropdownMenu.css'

import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { HiMenu } from "react-icons/hi";
import { PiDog } from "react-icons/pi";
import { SiDatadog } from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";

const DropdownMenu = () => {
  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<HiMenu size={"35px"} />}
          variant="ghost"
          color="#FFF7EF"
          _hover={{ color: "#E6883E", bg: "transparent" }}
          _active={{ color: "#E6883E", bg: "transparent" }}
        />

        <MenuList bg="#3C3835" color="#FFF7EF" mr={"3px"}>
          <MenuItem
            className={"menuText"}
            bg={"none"}
            gap={4}
            variant="ghost"
            color="#FFF7EF"
            _hover={{ color: "#F2D47E", bg: "transparent" }}
            _active={{ color: "#F2D47E", bg: "transparent" }}
            onClick={() => console.log("Profile")}
          >
            <PiDog color={"#FFF7EF"} size={"35px"} />
            Profile
          </MenuItem>

          <MenuItem
            className={"menuText"}
            bg={"none"}
            gap={4}
            variant="ghost"
            color="#FFF7EF"
            _hover={{ color: "#F88DC3", bg: "transparent" }}
            _active={{ color: "#F88DC3", bg: "transparent" }}
            onClick={() => console.log("Friends")}
          >
            <SiDatadog color={"#FFF7EF"} size={"35px"} />
            Friends
          </MenuItem>

          <MenuItem
            className={"menuText"}
            bg={"none"}
            gap={4}
            variant="ghost"
            color="#FFF7EF"
            _hover={{ color: "#6EA4EC", bg: "transparent" }}
            _active={{ color: "#6EA4EC", bg: "transparent" }}
            onClick={() => console.log("Settings")}
          >
            <IoSettingsOutline color={"#FFF7EF"} size={"35px"} />
            Settings
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default DropdownMenu;
