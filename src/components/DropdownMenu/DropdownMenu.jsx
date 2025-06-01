import {
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import authStore from "../../stores/authStore";

import { HiMenu } from "react-icons/hi";
import { PiDog } from "react-icons/pi";
import { GiJumpingDog } from "react-icons/gi";

const DropdownMenu = () => {
  const user = authStore((store) => store.user);
  const logout = authStore((store) => store.logout);

  const handleLogout = () => {
    logout();
  };

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
            as={RouterLink}
            to={`/woofles/${user?._id}`}
            bg={"none"}
            gap={4}
            variant="ghost"
            fontWeight={500}
            color="#FFF7EF"
            _hover={{ color: "#F2D47E", bg: "transparent" }}
            onClick={() => console.log("Profile")}
          >
            <PiDog color={"#FFF7EF"} size={"35px"} />
            Profile
          </MenuItem>

          <MenuItem
            flexDirection={"row"}
            bg={"none"}
            gap={4}
            variant="ghost"
            onClick={() => console.log("Friends")}
          >
            <GiJumpingDog color={"#FFF7EF"} size={"35px"} />{" "}
            <Link
              as={RouterLink}
              to="/wooflesAuth"
              fontWeight="500"
              color="#FFF7EF"
              _hover={{ color: "#F88DC3", bg: "transparent" }}
              style={{ textDecoration: "none" }}
              cursor="pointer"
              onClick={handleLogout}
            >
              Log Out
            </Link>
          </MenuItem>

          {/* <MenuItem
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
          </MenuItem> */}
        </MenuList>
      </Menu>
    </>
  );
};

export default DropdownMenu;
