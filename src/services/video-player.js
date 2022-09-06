const React = require('react')

export const VideoPlayer = (props) => {

    React.useEffect(() => {
        window.onload = function () {
            const video = document.querySelector("#videoModal");
            if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(function (stream) {
                        video.srcObject = stream;
                        video.play();
                    });
            }
        }
    }, [])

    return (
        <div className={props.className}>
            <video width="400" height="300" id={props.isModal ? "videoModal" : "videoElement"} autoPlay></video>
            {props.isModal ? null :
                <canvas
                    id="canvas"
                    width="400"
                    height="300">
                </canvas>
            }
        </div>
    );
}