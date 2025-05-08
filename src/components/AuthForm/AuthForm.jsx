import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useToast, // Try to use this useToast when displaying all error messages instead of the ugly popups
  VStack,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const authtype = queryParams.get("authtype");

  useEffect(() => {
    setIsLogin(authtype !== "signup");
  }, [authtype]);

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toast = useToast();
  const handleAuth = async () => {
    if (
      !inputs.email ||
      !inputs.password ||
      (!isLogin && (!inputs.username || !inputs.confirmPassword))
    ) {
      alert("Please fill out all the fields");
      return;
    }

    if (!isLogin && inputs.password !== inputs.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      if (isLogin) {
        const response = await axios.post("http://localhost:3000/api/login", {
          email: inputs.email,
          password: inputs.password,
        });

        console.log(response.data);
        navigate("/wooflesHome");
      } else {
        if (inputs.password !== inputs.confirmPassword) {
          alert("Passwords do not match.");
          return;
        }
        const response = await axios.post(
          "http://localhost:3000/api/register",
          {
            username: inputs.username,
            email: inputs.email,
            password: inputs.password,
          }
        );

        console.log(response.data);

        toast({
          title: "Account Created.",
          description:
            response.data.message ||
            "Your account has been created successfully.",
          status: "success",
          duration: 5000, // 5 seconds
          isClosable: true,
        });

        setInputs({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        navigate("/wooflesAuth?authtype=login");
      }
    } catch (error) {
      console.error(
        "Authentication failed:",
        error.response?.data || error.message
      );
      alert("Authentication failed. Try again.");
    }
  };

  return (
    <>
      <Box padding={3} w={{ base: "max-content", md: "25vw" }}>
        <VStack spacing={4}>
          <Text className="titleText" mb={0} fontSize={"60px"}>
            Woofles
          </Text>

          {!isLogin ? (
            <Input
              bg={"#534F4C"}
              border={"none"}
              borderRadius={2}
              placeholder="Enter Username"
              _placeholder={{ color: "#BEBEBE" }}
              fontSize={14}
              type="text"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          ) : null}

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
                color={"#E6883E"}
                cursor={"pointer"}
                onClick={() => {
                  setIsLogin(!isLogin);
                  setInputs({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  });
                  navigate(
                    `/wooflesAuth?authtype=${isLogin ? "signup" : "login"}`
                  );
                }}
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
