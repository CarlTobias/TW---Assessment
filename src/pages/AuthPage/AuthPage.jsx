import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => {
  return (
    <>
      <Flex
        minH={"100vh"}
        justify={"center"}
        align={"center"}
        backgroundImage={"url('/images/background.png')"}
        backgroundRepeat={"repeat"}
        backgroundSize={"50vh"}
      >
        <Container
          maxW={"max-content"}
          p={"1rem"}
          borderRadius={"0.5rem"}
          color={"#FFF7EF"}
          backgroundColor={"#3C3835"}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            justify={"center"}
            align={"center"}
            gap={3}
          >
            {/* Left Side */}
            <Box display={{ base: "none", md: "block" }}>
              <Image src="/images/dogHouse.png" alt="doghouse.png" />
            </Box>

            {/* Right Side */}
            <VStack spacing={4} align={"stretch"}>
              <AuthForm />
            </VStack>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

export default AuthPage;
