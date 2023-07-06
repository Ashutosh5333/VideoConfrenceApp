import React, { useCallback, useEffect } from "react";
import { Button, Text } from "@chakra-ui/react";
import { useSocket } from "./../Provider/Socket";
import { useState } from "react";
import { usePeer } from "../Provider/Peer";
import ReactPlayer from "react-player";

const Video = () => {
  const { socket } = useSocket();
  const {
    peer,
    CreateOffer,
    setRemoteAns,
    CreateAnswer,
    SendStream,
    remoteStream,
  } = usePeer();
  const [myStream, setMyStream] = useState();
  const [remoteSocketId, setRemoteSocketId] = useState(null);

  //  -------------  New user  -----------

  const NewUserJoined = useCallback(
    async (data) => {
      const { emailId } = data;
      console.log(`New User Joined Email ${emailId} joined room`);
      const offer = await CreateOffer();
      socket.emit("call-user", { emailId, offer });
      setRemoteSocketId(emailId)
    },
    [CreateOffer, socket]
  );

  // ----------  answer and incoming ---------------- //

  const handleIncommingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      console.log("incomming call from ", from, offer);
      const ans = await CreateAnswer(offer);
      socket.emit("call-accepted", { emailId: from, ans });
      setRemoteSocketId(from);
    },
    [CreateAnswer, socket]
  );

  const handleCallaccpeted = useCallback(
    async (data) => {
      const { ans } = data;
      console.log("call-got-accpeted", ans);
      await setRemoteAns(ans);
    },

    [setRemoteAns, socket]
  );

  // ---------- Video part ----------------- //

  const getUserMedaiStream = useCallback(async () => {
    const vStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(vStream);
    // SendStream(vStream)
  }, []);


  const handleNegotaited = useCallback(async () => {
   
    const localOffer = await peer.createOffer();
    socket.emit("call-user", { emailId: remoteSocketId, offer: localOffer });
  }, []);


  useEffect(() => {
    socket.on("user-joined", NewUserJoined);
    socket.on("incomming-call", handleIncommingCall);
    socket.on("call-accepted", handleCallaccpeted);

    return () => {
      socket.off("user:joined", NewUserJoined);
      socket.off("incomming-call", handleIncommingCall);
      socket.off("call-accepted", handleCallaccpeted);
    };
  }, [
    NewUserJoined,
    handleIncommingCall,
    handleCallaccpeted,
    handleNegotaited,
    socket,
  ]);

  useEffect(() => {
    peer.addEventListener("negotiatedneeded", handleNegotaited);
    return () => {
      peer.removeEventListener("negotiatedneeded", handleNegotaited);
    }
  }, [handleNegotaited]);

  //  --------------

  useEffect(() => {
    getUserMedaiStream();
  }, [getUserMedaiStream]);

  return (
    <>
      <h1> Room page </h1>
      <Text> You are connected with {remoteSocketId} </Text>
      <Button onClick={(e) => SendStream(myStream)}> Send Call </Button>
      <ReactPlayer url={myStream} playing muted />
      <ReactPlayer url={remoteStream} playing />
    </>
  );
};

export default Video;
