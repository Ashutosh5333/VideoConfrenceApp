import React, { useCallback, useEffect, useMemo, useState } from "react";
const PeerContext = React.createContext(null);


export const usePeer =() => React.useContext(PeerContext)

export const PeerProvider = (props) => {
const [remoteStream, setRemoteStream] = useState();

  const peer = useMemo(
    () =>
      new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      }),
    []
  );

  const CreateOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer)
    return offer
  };

  const CreateAnswer = async (offer) =>{
     await peer.setRemoteDescription(offer)
     const answer = await peer.createAnswer();
     await peer.setLocalDescription(answer)
     return answer
  }

 const setRemoteAns = async (ans) =>{
  await peer.setRemoteDescription(ans)

 }

  const SendStream = async (stream) =>{
     const tracks = stream.getTracks()
     for (const track of tracks){
      peer.addTrack(track , stream)
    }
}

 const handletrackevent = useCallback((ad) =>{
  const streams = ad.streams;
  setRemoteStream(streams[0])
 },[])

     useEffect(() =>{
      peer.addEventListener("track", handletrackevent )
      return () =>{
         peer.addEventListener("track", handletrackevent)
      }
      },[handletrackevent,peer])





  return( 
  <PeerContext.Provider value={{ peer ,CreateOffer ,setRemoteAns,
   CreateAnswer, SendStream, remoteStream}}>

    {props.children}
  </PeerContext.Provider>
  );
};
