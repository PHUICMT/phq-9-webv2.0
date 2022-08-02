import logo from './logo.svg';
import './App.css';
import { VideoRecorder } from './services/video-recorder';
import { VideoPlayer } from './services/video-player';

function App() {
  return (
    <div className="App">
      <VideoPlayer />
      <VideoRecorder />
    </div>
  );
}

export default App;
