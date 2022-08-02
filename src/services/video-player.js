export const VideoPlayer = () => {
    return (
        <div className="video-player">
            <video id="videoElement" autoPlay></video>
            <canvas
                id="canvas"
                width="400"
                height="300">
            </canvas>
        </div>
    );
}