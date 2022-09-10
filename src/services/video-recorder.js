const io = require('socket.io-client');

const endPoint = "localhost:9000";
var socket = undefined;
var userIsDisconnected = false;
var article = -1;
var emotion_result_table = {
    1: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: {} },
    2: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: {} },
    3: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: {} },
    4: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: {} },
    5: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: {} },
    6: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: {} },
    7: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: {} },
    8: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: {} },
    9: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: {} },
}

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

        socket.on('emotion', async function (emotion) {
            const status = await resolveEmotion(emotion);
            console.log(status);
            console.log("Emotion Result Table: ", emotion_result_table);
        });
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
            user_id: data.user_id[0],
            article: article
        }
        if (userIsDisconnected !== true && article !== -1) {
            socket.emit('image', dataToSend);
        }
    }, 1000 / FPS);
}

export function socketDisconnect(data) {
    userIsDisconnected = true;
    socket.emit('end_section', data);
}

export function setArticle(number) {
    article = number;
}

export function stopVideo() {
    var video = document.querySelector("#videoElement");
    var stream = video.srcObject;
    stream.getTracks().forEach(function (track) {
        track.stop();
    });
    video.srcObject = null;
}

function resolveEmotion(emotion) {
    return new Promise(resolve => {
        for (const [key, value] of Object.entries(emotion)) {
            emotion_result_table[Number(key)].emotion = value;
        }
        resolve("Success");
    });
}