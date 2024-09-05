import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";

import { signUp } from "../utils/signUp";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { username, password, name, image } = data;

    const success = await signUp(username, password, name, image);

    if (success) {
      navigate("/"); // Redirect to home
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed to create an account.",
        description: "something went wrong.",
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
          autoComplete="off"
          {...register("username", { required: true })}
        />
        <FormLabel mt={2} mb={2} htmlFor="password" color="#F5F5F5">
          Password
        </FormLabel>
        <Input
          id="password"
          type="text"
          _placeholder={{ color: "#F5F5F5" }}
          placeholder="Enter password"
          border="1px solid #F5F5F5"
          color="#F5F5F5"
          autoComplete="off"
          {...register("password", { required: true })}
        />
        <FormLabel mt={2} mb={2} htmlFor="name" color="#F5F5F5">
          Name
        </FormLabel>
        <Input
          id="name"
          type="text"
          _placeholder={{ color: "#F5F5F5" }}
          placeholder="Enter name"
          border="1px solid #F5F5F5"
          color="#F5F5F5"
          autoComplete="off"
          {...register("name", { required: true })}
        />
        <FormLabel mt={2} mb={2} htmlFor="image" color="#F5F5F5">
          Image
        </FormLabel>
        <Input
          id="image"
          type="text"
          _placeholder={{ color: "#F5F5F5" }}
          placeholder="Enter image URL"
          border="1px solid #F5F5F5"
          color="#F5F5F5"
          autoComplete="off"
          {...register("image", { required: true })}
        />
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
            Sign up
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
};
