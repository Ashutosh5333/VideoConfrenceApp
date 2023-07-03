import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Room = () => {
  const handleChange = () => {};

  const handleSubmit = () => {};

  return (
    <>
      <Box mb="10" mt="10">
        <Card maxW="lg" m="auto">
          <CardBody h="60vh">
            <Text
              textAlign={"center"}
              fontWeight={"600"}
              mb="5"
              color="#00a884"
              fontSize={"1.5rem"}
            >
             Join Room
            </Text>

            <VStack maxW={"2xl"} spacing={5}>
              <FormControl >
                <FormLabel
                  mb="10px"
                  color={"gray"}
                  fontWeight={"400"}
                  letterSpacing={0.5}
                  fontSize={"1.1rem"}
                >
                  {" "}
                  Email{" "}
                </FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  bg="#e0e0de"
                  borderRadius={"20"}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl >
                <FormLabel
                  mb="10px"
                  fontWeight={"400"}
                  letterSpacing={0.5}
                  color={"gray"}
                  fontSize={"1.1rem"}
                >
                Room code
                </FormLabel>
                <Input
                  name="code"
                  bg="#e0e0de"
                  borderRadius={"20"}
                  placeholder="Enter Room Code"
                  type="code"
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                width="100%"
                size="lg"
                onClick={handleSubmit}
                bg="#00a884"
                color="#fff"
                borderRadius={"20"}
              >
                Enter Room
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default Room;
