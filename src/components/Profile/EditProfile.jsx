    import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    } from "@chakra-ui/react";
    import { useEffect, useState } from "react";
    import axios from "axios";

    const EditProfile = ({ isOpen, onClose, user, onProfileUpdated }) => {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);


    // Populate fields when modal opens or user changes
    useEffect(() => {
        if (user && isOpen) {
        setUsername(user.username || "");
        setBio(user.bio || "");
        setProfilePic(user.profilePic || "");
        }
    }, [user, isOpen]);

    const handleSubmit = async () => {
        setLoading(true);

        try {
        let uploadedImageUrl = profilePic; // fallback to existing URL

        // Upload file if selected
        if (selectedFile) {
            const formData = new FormData();
            formData.append("image", selectedFile);

            const uploadRes = await axios.post(
            "https://woofles.onrender.com/api/upload/profile-pic",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
            );

            uploadedImageUrl = uploadRes.data.imageUrl;
        }
        

        // Build update payload with changed fields
        const updates = {};
        if (username && username !== user.username) updates.username = username;
        if (bio !== user.bio) updates.bio = bio;
        if (uploadedImageUrl && uploadedImageUrl !== user.profilePic)
            updates.profilePic = uploadedImageUrl;

        if (Object.keys(updates).length === 0) {
            setLoading(false);
            onClose();
            return;
        }

        await axios.put(
            `https://woofles.onrender.com/api/user/update/${user._id}`,
            updates
        );

        onProfileUpdated();
        onClose();
        } catch (error) {
        console.error("Update failed", error);
        } finally {
        setLoading(false);
        }
    };
    

    return (
      <Modal
        isCentered
        size={{ base: "md", md: "lg" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          p={0}
          backgroundColor={"#3C3835"}
          borderRadius={5}
          color={"#FFF"}
        >
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Username</FormLabel>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Bio</FormLabel>
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
            </FormControl>
            <FormControl mb={6}>
              <FormLabel>Profile Picture</FormLabel>

              <Input
                type="file"
                accept="image/*"
                display="none"
                id="profile-pic-upload"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />

              <label htmlFor="profile-pic-upload">
                <Button
                  as="span"
                  mt={"auto"}
                  backgroundColor="#897666"
                  color={"#FFF"}
                  fontWeight="bold"
                  _hover={{ backgroundColor: "#E49F43" }}
                >
                  Upload Image
                </Button>
              </label>

              {selectedFile && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      boxShadow: "0 0 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              backgroundColor="#897666"
              color={"#FFF"}
              fontWeight="bold"
              _hover={{ backgroundColor: "#E49F43" }}
              onClick={handleSubmit}
              isLoading={loading}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
    };

    export default EditProfile;
