import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
} from "@chakra-ui/react";

import { useState } from "react";

export const LoginPage = () => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

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
            autoComplete="off"
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
      </FormControl>
    </Flex>
  );
};
