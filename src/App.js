import logo from './logo.svg';
import './App.css';
import { VideoRecorder, socketDisconnect } from './services/video-recorder';
import { VideoPlayer } from './services/video-player';

function App() {
  return (
    <div className="App">
      <VideoPlayer />
      <VideoRecorder />
      <button onClick={() => { socketDisconnect() }}>Disconnect</button>
    </div>
  );
}

export default App;
