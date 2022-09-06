const io = require('socket.io-client');

const endPoint = "localhost:9000";
var socket = undefined;

export const VideoRecorder = () => {
    socket = io.connect(endPoint);
    if (socket !== undefined) {
        socket.on('connect', function () {
            var userData = {
                user_email: "email@gmail.com",
                user_id: "1"
            };
            socket.emit('user_connected', userData);
            console.log("Connected...!", socket.connected)
        });

        socket.on('response_back', function (data) {
            console.log("response_back ", data)
        });
    }

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    const video = document.querySelector("#videoElement");

    console.log(navigator.mediaDevices.getUserMedia)
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
                console.log("stream ", stream)
            })
            .catch(function (e) {
                console.log(e)
            });
    }

    const FPS = 25;
    setInterval(() => {
        var width = 400;
        var height = 300;
        context.drawImage(video, 0, 0, width, height);
        var imageBase64 = canvas.toDataURL("image/jpeg").split(';base64,')[1];
        context.clearRect(0, 0, width, height);
        var data = {
            imageBase64: imageBase64,
            timeStamp: Math.floor(new Date().getTime() / 1000),
            user_email: "email@gmail.com",
            user_id: "1"
        }
        console.log("data ", data)
        socket.emit('image', data);
    }, 1000 / FPS);
}

export function socketDisconnect() {
    socket.disconnect();
}