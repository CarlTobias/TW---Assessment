import React, { useState } from "react";
import "./AuthForm.css";

import { Box, Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleAuth = () => {
    if (!inputs.email || !inputs.password) {
      alert("Please fill out all the fields");
      return;
    }

    navigate("/wooflesHome");
  };

  return (
    <>
      <Box padding={3} w={{ base: "max-content", md: "25vw" }}>
        <VStack spacing={4}>
          <Text className="titleText" mb={0} fontSize={"60px"}>
            Woofles
          </Text>

          <Input
            bg={"#534F4C"}
            border={"none"}
            borderRadius={2}
            placeholder="Enter Email"
            _placeholder={{ color: "#BEBEBE" }}
            fontSize={14}
            type="email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />

          <Input
            bg={"#534F4C"}
            border={"none"}
            borderRadius={2}
            placeholder="Enter Password"
            _placeholder={{ color: "#BEBEBE" }}
            fontSize={14}
            type="password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />

          {!isLogin ? (
            <Input
              bg={"#534F4C"}
              border={"none"}
              borderRadius={2}
              placeholder="Confirm Password"
              _placeholder={{ color: "#BEBEBE" }}
              fontSize={14}
              type="password"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          ) : null}

          <Button
            w={"full"}
            mt={4}
            bg={"#897666"}
            color={"#FFFFFF"}
            _hover={{ bg: "#E6883E" }}
            onClick={handleAuth}
          >
            {isLogin ? "Log In" : "Create Account"}
          </Button>

          <Box mt={-2}>
            <Flex justify={"center"} align={"center"}>
              <Box mx={2} fontSize={14}>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </Box>

              <Box
                onClick={() => setIsLogin(!isLogin)}
                color={"#E6883E"}
                cursor={"pointer"}
              >
                {isLogin ? "Sign Up" : "Log In"}
              </Box>
            </Flex>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default AuthForm;
