import React, { useCallback, useEffect } from "react";
import { useSocket } from "./../Provider/Socket";
import { useState } from "react";
import { usePeer } from "../Provider/Peer";

const Video = () => {
  const { socket } = useSocket();
  const { peer, CreateOffer, setRemoteAns, CreateAnswer } = usePeer();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  //  -------------  New user  -----------

  const NewUserJoined = useCallback(
    async (data) => {
      const { emailId } = data;
      console.log(`New User Joined Email ${emailId} joined room`);
      const offer = await CreateOffer();
      socket.emit("call-user", { emailId, offer });
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
    },
    [CreateAnswer, socket]
  );

  const handleCallaccpeted = useCallback(
    async (data) => {
      const { ans } = data;
      console.log("call-got-accpeted", ans);
      await setRemoteAns(ans);
    },
    [setRemoteAns,socket]
  );

  useEffect(() => {
    socket.on("user-joined", NewUserJoined);
    socket.on("incomming-call", handleIncommingCall);
    socket.on("call-accepted", handleCallaccpeted);
    return () => {
      socket.off("user:joined", NewUserJoined);
      socket.off("incomming-call", handleIncommingCall);
      socket.off("call-accepted", handleCallaccpeted);
    };
  }, [socket]);

  return (
    <>
      <h1> Room page </h1>
    </>
  );
};

export default Video;
