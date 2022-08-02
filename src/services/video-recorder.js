const io = require('socket.io-client');
const endPoint = "localhost:9000";

export const VideoRecorder = () => {
    const socket = io.connect(endPoint);
    socket.on('connect', function () {
        console.log("Connected...!", socket.connected)
    });

    socket.on('response_back', function (data) {
        console.log("response_back", data)
    });

    window.onload = function () {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        const video = document.querySelector("#videoElement");


        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    video.srcObject = stream;
                    video.play();
                })
                .catch(function (e) {
                    console.log(e)
                });
        }

        const FPS = 6;
        setInterval(() => {
            var width = 400;
            var height = 300;
            context.drawImage(video, 0, 0, width, height);
            // console.log(context)
            // var data = canvas.toDataURL('image/jpeg', 0.5);
            var data = canvas.toDataURL("image/jpeg").split(';base64,')[1];
            context.clearRect(0, 0, width, height);
            // console.log(data);
            socket.emit('image', data);
        }, 1000 / FPS);
    }
}