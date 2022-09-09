const io = require('socket.io-client');

const endPoint = "localhost:9000";
var socket = undefined;
var userIsDisconnected = false;

export const videoRecorder = (data) => {
    socket = io.connect(endPoint);
    if (socket !== undefined) {
        socket.on('connect', function () {
            var userData = {
                user_email: data.user_email,
                user_id: data.user_id[0]
            };
            socket.emit('user_connected', userData);
            console.log("Connected...!", socket.connected)
        });

        socket.on('start_disconect', function () {
            socket.disconnect();
        })
    }

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    const video = document.querySelector("#videoElement");

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
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
        var dataToSend = {
            imageBase64: imageBase64,
            timeStamp: Math.floor(new Date().getTime() / 1000),
            user_email: data.user_email,
            user_id: data.user_id[0]
        }
        if (userIsDisconnected !== true) {
            socket.emit('image', dataToSend);
        }
    }, 1000 / FPS);
}

export function socketDisconnect(data) {
    userIsDisconnected = true;
    socket.emit('end_section', data);
}

export function stopVideo() {
    var video = document.querySelector("#videoElement");
    var stream = video.srcObject;
    stream.getTracks().forEach(function (track) {
        track.stop();
    });
    video.srcObject = null;
}