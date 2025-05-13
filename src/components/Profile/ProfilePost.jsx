import React from "react";

import {
  Avatar,
  Box,
  Divider,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import PostFooter from "../HomeFeed/PostFooter";

import { IoPaw } from "react-icons/io5";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ProfilePost = ({ img, caption }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <GridItem
        position={"relative"}
        borderRadius={4}
        aspectRatio={2 / 3}
        cursor={"pointer"}
        overflow={"hidden"}
        onClick={onOpen}
      >
        <Flex
          position={"absolute"}
          top={0}
          bottom={0}
          left={0}
          right={0}
          zIndex={1}
          justify={"center"}
          opacity={0}
          backgroundColor={"#00000080"}
          _hover={{ opacity: 1 }}
          transition={"all 0.3s"}
        >
          <Flex justify={"center"} align={"center"} gap={25} color={"#FFFFFF"}>
            <Flex justify={"center"} align={"center"} gap={1}>
              <IoPaw />
              <Text fontWeight={500}>100</Text>
            </Flex>
            <Flex justify={"center"} align={"center"} gap={1}>
              <FaComment />
              <Text fontWeight={500}>50</Text>
            </Flex>
          </Flex>
        </Flex>

        <Image src={img} alt="post" w={"100%"} h={"100%"} objectFit={"cover"} />
      </GridItem>

      <Modal
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={0} backgroundColor={"#3C3835"} borderRadius={5}>
            <Flex
              w={{ base: "90%", sm: "70%", md: "100%" }}
              gap={4}
              mx={"auto"}
            >
              <Box flex={1.5} borderLeftRadius={4} overflow={"hidden"}>
                <Image
                  src={img}
                  alt="post"
                  w={"100%"}
                  maxH={"95vh"}
                  objectFit={"cover"}
                />
              </Box>

              <Flex
                flex={1}
                flexDirection={"column"}
                pt={4}
                px={5}
                display={{ base: "none", md: "flex" }}
              >
                <Flex justify={"space-between"} align={"center"}>
                  <Flex align={"center"} gap={2} color={"#FFFFFFCC"}>
                    <Avatar
                      src={"/images/dogimg3.jpeg"}
                      size={"sm"}
                      name={"LeiBaley"}
                    />
                    <Text fontWeight={"600"} fontSize={16}>
                      LeiBaley
                    </Text>
                  </Flex>
                  <Box>
                    <MdDelete size={24} color={"#FFFFFFCC"} />
                  </Box>
                </Flex>

                <Text color="#FFFFFFCC" fontSize={14} mb={4}>
                  {caption}
                </Text>

                <Divider my={4} backgroundColor={"#FFFFFFCC"} />

                <VStack
                  align={"left"}
                  w={"100%"}
                  maxH={{ md: "300px", lg: "500px" }}
                  overflowY={"auto"}
                >
                  <Comment
                    createdAt={"1h ago"}
                    username={"LukiePookie"}
                    profpic={"/images/dogimg4.jpeg"}
                    text="lol that's so cute!"
                  />

                  <Comment
                    createdAt={"11hr ago"}
                    username={"Svenniee_"}
                    profpic={"/images/dogimg5.jpg"}
                    text="adorablee"
                  />

                  <Comment
                    createdAt={"1d ago"}
                    username={"Luckyy7"}
                    profpic={"/images/dogimg6.jpeg"}
                    text="let me in thereee ahhhh!!!!"
                  />
                </VStack>

                <Divider my={4} backgroundColor={"#000000CC"} />

                <PostFooter isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
