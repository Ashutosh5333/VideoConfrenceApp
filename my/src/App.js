import "./App.css";
import Room from "./Pages/Room";
import { SocketProvider } from "./Provider/Socket";

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <Room />
      </SocketProvider>
    </div>
  );
}

export default App;
