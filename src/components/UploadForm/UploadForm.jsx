import { useState } from "react";

import {
  Button,
  Box,
  Divider,
  Flex,
  Image,
  Input,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  FormControl,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import authStore from "../../stores/authStore";

import axios from "axios";

const UploadForm = ({ isOpen, onClose }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { user } = authStore();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!image) return alert("Please select an image");

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("caption", caption);
      formData.append("userId", user._id);

      const res = await axios.post(
        "https://woofles.onrender.com/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Uploaded post:", res.data);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload post.");
    }
  };

  const resetForm = () => {
    setCaption("");
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <>
      <Modal
        isCentered
        size={{ base: "3xl", md: "5xl" }}
        isOpen={isOpen}
        onClose={() => {
          resetForm();
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color={"white"} />
          <ModalBody p={0} backgroundColor={"#3C3835"} borderRadius={5}>
            <Flex
              w={{ base: "90%", sm: "70%", md: "100%" }}
              gap={4}
              mx={"auto"}
            >
              {/* Image Preview Section */}
              <Box flex={1.5} borderLeftRadius={4} overflow={"hidden"}>
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="preview"
                    w={"100%"}
                    maxH={"95vh"}
                    objectFit={"cover"}
                  />
                ) : (
                  <Flex
                    w={"100%"}
                    h={"100%"}
                    justify={"center"}
                    align={"center"}
                    bg={"gray.700"}
                    color={"white"}
                  >
                    No Image Selected
                  </Flex>
                )}
              </Box>

              {/* Form Section */}
              <Flex
                flex={1}
                flexDirection={"column"}
                pt={10}
                pb={4}
                px={5}
                display={{ base: "none", md: "flex" }}
              >
                <Divider my={4} backgroundColor={"#FFFFFFCC"} />

                <VStack align={"stretch"} spacing={4}>
                  <FormControl>
                    <FormLabel color="white">Caption</FormLabel>
                    <Input
                      type="text"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Enter caption"
                      bg="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel color="white">Upload Image</FormLabel>
                    <Box
                      as="label"
                      htmlFor="file-upload"
                      display="inline-block"
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="md"
                      px={4}
                      py={2}
                      cursor="pointer"
                      _hover={{ bg: "gray.100" }}
                      bg="white"
                      w="fit-content"
                    >
                      Choose File
                    </Box>
                    <Input
                      id="file-upload"
                      type="file"
                      onChange={handleImage}
                      display="none"
                    />
                    {image && (
                      <Box mt={7} color="white">
                        Selected File: {image.name}
                      </Box>
                    )}
                  </FormControl>
                </VStack>

                <Divider my={4} backgroundColor={"#000000CC"} />

                <Button
                  mt={"auto"}
                  backgroundColor="#897666"
                  color={"#FFF"}
                  fontWeight="bold"
                  _hover={{ backgroundColor: "#E49F43" }}
                  onClick={handleSubmit}
                >
                  Post
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadForm;
