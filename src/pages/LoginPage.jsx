import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";

import { login } from "../utils/login";

import { useState } from "react";
import { useForm } from "react-hook-form";

export const LoginPage = () => {
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  const onSubmit = async (data) => {
    const { username, password } = data;

    const success = await login(username, password);

    if (success) {
      window.history.back(); // redirect to home
      console.log("succes");
      toast({
        title: "Logged In!",
        description:
          "You've successfully logged in! You can now access and perform authorized operations.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justifyContent="center">
      <FormControl
        as="form"
        w={{ base: "100%", sm: "60%", md: "40%", xl: "25%", "2xl": "20%" }}
        maxW={"400px"}
      >
        <FormLabel mb={2} htmlFor="username" color="#F5F5F5">
          Username
        </FormLabel>
        <Input
          id="username"
          type="text"
          _placeholder={{ color: "#F5F5F5" }}
          placeholder="Enter username"
          border="1px solid #F5F5F5"
          color="#F5F5F5"
          autoComplete="on"
          {...register("username", { required: true })}
        />
        <FormLabel mt={2} mb={2} htmlFor="password" color="#F5F5F5">
          Password
        </FormLabel>
        <InputGroup>
          <Input
            id="password"
            type={show ? "text" : "password"}
            _placeholder={{ color: "#F5F5F5" }}
            placeholder="Enter password"
            border="1px solid #F5F5F5"
            color="#F5F5F5"
            autoComplete="on"
            {...register("password", { required: true })}
          />
          <InputRightElement width="4.5rem">
            <Button
              backgroundColor="#bb86fc"
              color="#fff"
              _hover={{ backgroundColor: "#fff", color: "#bb86fc" }}
              transition="300ms ease-in"
              h="1.75rem"
              size="sm"
              onClick={toggleShow}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Flex justifyContent="center">
          <Button
            type="submit"
            mt={2}
            backgroundColor="#bb86fc"
            color="#fff"
            _hover={{ backgroundColor: "#fff", color: "#bb86fc" }}
            transition="300ms ease-in"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
};
