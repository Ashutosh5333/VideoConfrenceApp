import React, { useCallback, useEffect } from 'react'
import { useSocket } from './../Provider/Socket';
import { useState } from 'react';
import { usePeer } from '../Provider/Peer';

const Video = () => {
 const {socket} = useSocket()
 const {peer ,CreateOffer} = usePeer()
 const [remoteSocketId, setRemoteSocketId] = useState(null);
 const [myStream, setMyStream] = useState();
 const [remoteStream, setRemoteStream] = useState();


 
  //  -------------  New user  -----------

  const NewUserJoined =  useCallback(async (data)=>{
    const {emailId} = data;
    console.log(`New User Joined Email ${emailId} joined room`);
       const offer = await CreateOffer()
       socket.emit("call-user", {emailId,offer})
  } ,[CreateOffer ,socket])


    const handleIncommingCall =() =>{
      
    }

    useEffect(() =>{
      socket.on("user-joined" , NewUserJoined)
      socket.on("incomming-call", handleIncommingCall )
    },[socket])


  return (
    <>
     <h1> Room page   </h1>  
    
    </>
  )
}

export default Video