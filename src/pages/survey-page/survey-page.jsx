import { styles } from './survey-page-styles';

import { RowRadioButtonsGroup } from '../../components/survey-item/survey-item';
import { Header } from '../../components/header/header';
import { FooterTextPaper } from '../../components/text-info/text-info';
import { ConfirmModal } from '../../components/modal/modal';

import { videoRecorder, socketDisconnect, stopVideo, setArticle, setEmoteResult, setSubmitButton } from '../../services/video-recorder';
import { VideoPlayer } from '../../services/video-player';

import { useState, useEffect } from 'react';
import { Container, Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuidv4 } from 'uuid';

export function SurveyPage() {
    const userID = useState(uuidv4());
    const [email, setEmail] = useState('');
    const [modalClosed, setModalClosed] = useState(false);
    const menuTitle = [
        "1. เบื่อ ทำอะไร ๆ ก็ไม่เพลิดเพลิน",
        "2. ไม่สบายใจ ซึมเศร้า หรือท้อแท้",
        "3. หลับยาก หรือหลับ ๆ ตื่น ๆ หรือหลับมากไป",
        "4. เหนื่อยง่าย หรือไม่ค่อยมีแรง",
        "5. เบื่ออาหาร หรือกินมากเกินไป",
        "6. รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว หรือเป็นคนทำให้ตัวเอง หรือครอบครัวผิดหวัง",
        "7. สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงานที่ต้องใช้ความตั้งใจ",
        "8. พูดหรือทำอะไรช้าจนคนอื่นมองเห็น หรือกระสับกระส่ายจนท่านอยู่ไม่นิ่งเหมือนเคย",
        "9. คิดทำร้ายตนเอง หรือคิดว่าถ้าตาย ๆ ไปเสียคงจะดี"
    ]

    var summaryValues = {
        values: {
            1: { checkedValue: -1, hoverTime: 0, behaver: { change: false, skip: false, return: false, over: false } },
            2: { checkedValue: -1, hoverTime: 0, behaver: { change: false, skip: false, return: false, over: false } },
            3: { checkedValue: -1, hoverTime: 0, behaver: { change: false, skip: false, return: false, over: false } },
            4: { checkedValue: -1, hoverTime: 0, behaver: { change: false, skip: false, return: false, over: false } },
            5: { checkedValue: -1, hoverTime: 0, behaver: { change: false, skip: false, return: false, over: false } },
            6: { checkedValue: -1, hoverTime: 0, behaver: { change: false, skip: false, return: false, over: false } },
            7: { checkedValue: -1, hoverTime: 0, behaver: { change: false, skip: false, return: false, over: false } },
            8: { checkedValue: -1, hoverTime: 0, behaver: { change: false, skip: false, return: false, over: false } },
            9: { checkedValue: -1, hoverTime: 0, behaver: { change: false, skip: false, return: false, over: false } },
        }
    }

    const handleEmailChange = (value, _) => {
        setEmail(value);
    }

    const handleConfirmButton = () => {
        stopVideo();
        setSubmitButton(summaryValues.values);
        setEmoteResult(summaryValues.values);
        socketDisconnect({
            user_email: email,
            user_id: userID[0]
        });
    }

    const handleOnCloseModal = (isClosed) => {
        setModalClosed(isClosed);
    }

    const handleOnRadioChange = (index, value) => {
        let oldValue = summaryValues.values[index].checkedValue;
        summaryValues.values[index].checkedValue = value;
        if (oldValue !== -1) {
            summaryValues.values[index].behaver.change = true;
        }

        for (const [key, value] of Object.entries(summaryValues.values)) {
            if (key < index && value.checkedValue === -1) {
                summaryValues.values[key].behaver.skip = true
            } else if (key === index) {
                return;
            }
        }
    }

    const handleOnMouseLeave = (value) => {
        const index = value.index;
        const totalTime = value.totalTime;
        summaryValues.values[index].hoverTime += totalTime;

        const currentTimeValue = summaryValues.values[index].hoverTime;
        if (currentTimeValue > 60) {
            summaryValues.values[index].behaver.over = true;
        }
    }

    useEffect(() => {
        if (modalClosed) {
            videoRecorder({
                user_email: email,
                user_id: userID
            });
        }
    }, [
        email,
        userID,
        modalClosed
    ]);

    return (
        <Container>
            <VideoPlayer className="video-player" />
            <Header />
            {menuTitle.map((title, index) => {
                return (
                    <RowRadioButtonsGroup
                        key={index}
                        onMouseEnter={setArticle}
                        onMouseLeave={handleOnMouseLeave}
                        index={index + 1}
                        onRadioChange={handleOnRadioChange}
                        title={title}
                    />

                )
            })
            }
            <Stack spacing={2} alignItems="center">
                <Button
                    onClick={() => handleConfirmButton()}
                    style={styles.button}
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon />}
                >
                    ส่งคำตอบ
                </Button>
                <FooterTextPaper />
            </Stack>
            <ConfirmModal
                open={true}
                handleEmailChange={handleEmailChange}
                onCloseModal={handleOnCloseModal}
            />
        </Container>
    );
}
