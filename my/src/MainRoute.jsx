import React from 'react'
import {Routes ,Route} from "react-router-dom"
import Room from './Pages/Home'
import Video from './Pages/Video';

const MainRoute = () => {

    
  return (
    <>
    <Routes>
    <Route path="/"  element={<Room/>} />
    <Route path="/room/:roomId" element={<Video/>} />

    </Routes>
    </>
  )
}

export default MainRoute