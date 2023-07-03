import "./App.css";
import MainRoute from "./MainRoute";

import { SocketProvider } from "./Provider/Socket";


function App() {
  return (
    <div className="App">
      <SocketProvider>
        <MainRoute/>
      </SocketProvider>
    </div>
  );
}

export default App;
