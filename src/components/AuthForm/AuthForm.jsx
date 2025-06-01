import React, { useState } from "react";

import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import authStore from "../../stores/authStore";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();
  const login = authStore((state) => state.login);

  const toast = useToast();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleAuth = async () => {
    const { username, email, password, confirmPassword } = inputs;

    if (!email || !password || (!isLogin && (!confirmPassword || !username))) {
      toast({
        title: "Missing fields",
        description: "Please fill out all the fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const url = isLogin ? "/api/login" : "/api/register";
      const res = await fetch("https://woofles.onrender.com:3000" + url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          ...(isLogin ? {} : { username }),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "Authentication failed",
          description: data.error || "Something went wrong.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (isLogin) {
        login(data.user);
        toast({
          title: "Login successful",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/wooflesHome");
      } else {
        toast({
          title: "Registration successful",
          description: "Please log in to continue.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Auth error:", err);
      toast({
        title: "Network error",
        description: "Please check the console for more details.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
