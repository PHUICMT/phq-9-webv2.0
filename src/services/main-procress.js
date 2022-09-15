const io = require('socket.io-client');
const axios = require("axios");

const endPoint = "backend.phq9-thesis.page";
var socket = undefined;
var userIsDisconnected = false;
var article = -1;
var emotion_result_table = {
    1: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: undefined },
    2: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: undefined },
    3: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: undefined },
    4: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: undefined },
    5: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: undefined },
    6: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: undefined },
    7: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: undefined },
    8: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: undefined },
    9: { reaction_time: 0.0, score: 0.0, behaver: {}, emotion: undefined },
}
var display_info = {
    id: "0000",
    is_submit: false,
    user_type: { "normal": false, "depressed": false, "being_treated": false },
    result: {},
    submit_count: 0,
}

export const videoRecorder = (data) => {
    display_info.id = data.user_id[0];
    socket = io.connect(endPoint, { secure: true });
    if (socket !== undefined) {
        socket.on('connect', function () {
            var userData = {
                user_id: data.user_id[0]
            };
            socket.emit('user_connected', userData);
            console.log("Connected...!", socket.connected)
        });

        socket.on('emotion', async function (emotion) {
            localStorage.setItem('task', "process");
            const status = await resolveEmotion(emotion);
            localStorage.setItem('status', status);
            localStorage.setItem('task', "finish");
            window.dispatchEvent(new Event("storage"));
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

export function setSubmitCount() {
    display_info.submit_count += 1;
}

export function stopVideo() {
    var video = document.querySelector("#videoElement");
    var stream = video.srcObject;
    try {
        stream.getTracks().forEach(function (track) {
            track.stop();
        });
    } catch (e) {
        console.log("[INFO] No video stream to stop");
    }
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

export async function setEmoteResult(emotion_result) {
    await resolveEmotionResult(emotion_result);
    const score = calculateScore();
    console.log("Score: ", score);
    if (score > 19) {
        display_info.result = { color: '#DB5451', result: 'ท่านมีอาการซึมเศร้าระดับรุนแรงมาก', info: 'ต้องพบแพทย์เพื่อประเมินอาการและให้การรักษาโดยเร็ว ไม่ควรปล่อยทิ้งไว้' };
    } else if (score > 14) {
        display_info.result = { color: '#E89E60', result: 'ท่านมีอาการซึมเศร้าระดับรุนแรงค่อนข้างมาก', info: 'ควรพบแพทย์เพื่อประเมินอาการและให้การรักษาระหว่างนี้ควรพักผ่อนให้เพียงพอ นอนหลับให้ได้ 6-8 ชั่วโมง ออกกำลังกายเบาๆ ทำกิจกรรมที่ทำให้ผ่อนคลาย ไม่เก็บตัว และควรขอคำปรึกษาช่วยเหลือจากผู้ใกล้ชิด' };
    } else if (score > 8) {
        display_info.result = { color: '#FCCD3A', result: 'ท่านมีอาการซึมเศร้าระดับปานกลาง', info: 'ควรพักผ่อนให้เพียงพอ นอนหลับให้ได้ 6-8 ชั่วโมง ออกกำลังกายสม่ำเสมอ ทำกิจกรรมที่ทำให้ผ่อนคลาย พบปะเพื่อนฝูง ควรขอคำปรึกษาช่วยเหลือจากผู้ที่ไว้วางใจ ไม่จมอยู่กับปัญหา มองหาหนทางคลี่คลาย หากอาการที่ท่านเป็นมีผลกระทบต่อการทำงานหรือการเข้าสังคม (อาการซึมเศร้าทำให้ท่านมีปัญหาในการทำงาน การดูแลสิ่งต่าง ๆ ในบ้าน หรือการเข้ากับผู้คน ในระดับมากถึงมากที่สุด) หรือหากท่านมีอาการระดับนี้มานาน 1-2 สัปดาห์แล้วยังไม่ดีขึ้น ควรพบแพทย์เพื่อรับการช่วยเหลือรักษา' };
    } else if (score > 4) {
        display_info.result = { color: '#6BAD8F', result: 'ท่านมีอาการซึมเศร้าระดับเล็กน้อย', info: 'ควรพักผ่อนให้เพียงพอ นอนหลับให้ได้ 6-8 ชั่วโมง ออกกำลังกายสม่ำเสมอ ทำกิจกรรมที่ทำให้ผ่อนคลาย พบปะเพื่อนฝูง ควรทำแบบประเมินอีกครั้งใน 1 สัปดาห์' };
    } else {
        display_info.result = { color: '#79CFDA', result: 'ท่านไม่มีอาการซึมเศร้าหรือมีก็เพียงเล็กน้อย', info: 'ไม่จำเป็นต้องรักษา' };
    }
}

function calculateScore() {
    var score = 0;
    for (const [_, value] of Object.entries(emotion_result_table)) {
        if (value.score >= 0) {
            score += Number(value.score);
        }
    }

    return score;
}

function resolveEmotionResult(emotion) {
    return new Promise(resolve => {
        for (const [key, value] of Object.entries(emotion)) {
            emotion_result_table[Number(key)].reaction_time = value.hoverTime;
            emotion_result_table[Number(key)].score = value.checkedValue;
            emotion_result_table[Number(key)].behaver = value.behaver;
        }
        resolve("Success");
    });
}

async function handleOnSendReport(data) {
    return await axios
        .post("/api/save-result", data, {
            headers: { "Content-Type": "application/json" },
        })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function setSubmitButton(summaryValues) {
    if (display_info.is_submit === false) {
        for (const [_, value] of Object.entries(summaryValues)) {
            if (value.checkedValue === -1) {
                display_info.is_submit = true;
                return true;
            }
        }
        display_info.is_submit = false;
        return false
    }
}

export function setUserType(userType) {
    for (const [key, _] of Object.entries(display_info.user_type)) {
        display_info.user_type[key] = false;
    }
    display_info.user_type[userType] = true;
}

export function getReportAndSaveInfo() {
    const dataToSend = {
        display_info: display_info,
        emotion_result_table: emotion_result_table
    };
    handleOnSendReport(dataToSend);
    return dataToSend;
}