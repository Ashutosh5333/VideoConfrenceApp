import "./App.css";
import MainRoute from "./MainRoute";
import { PeerProvider } from "./Provider/Peer";
import { SocketProvider } from "./Provider/Socket";



function App() {
  return (
    <div className="App">
      <SocketProvider>
      <PeerProvider>
        <MainRoute/>
      </PeerProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
