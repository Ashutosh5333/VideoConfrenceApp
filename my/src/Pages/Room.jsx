import React, { useEffect, useState } from "react";
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
import { useSocket } from "../Provider/Socket";

const Room = () => {
  const socket = useSocket();
  const [email, setEmail] = useState(" ");
  const [roomId, setRoomId] = useState(" ");


     const roomhandle = ({roomId}) =>{
       console.log("joinned", roomId)
     } 

      useEffect(() =>{
       socket.on("joined-room" , roomhandle)
      },[socket])

  const handleJOinnedRoom = () => {
    //  console.log("hello joined")
    socket.emit("join-room", { emailId:email, roomId });
  };


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
              <FormControl>
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
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  bg="#e0e0de"
                  borderRadius={"20"}
                />
              </FormControl>
              <FormControl>
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
                
                  borderRadius={"20"}
                  placeholder="Enter Room Code"
                  type="text"
                  id="room"
                  bg="#e0e0de"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                />
              </FormControl>
              <Button
                width="100%"
                size="lg"
                onClick={handleJOinnedRoom}
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
