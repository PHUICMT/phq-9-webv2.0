import { styles } from './survey-page-styles';

import { RowRadioButtonsGroup } from '../../components/survey-item/survey-item';
import { Header } from '../../components/header/header';
import { FooterTextPaper } from '../../components/text-info/text-info';
import { ConfirmModal } from '../../components/modal/modal';

import { videoRecorder, socketDisconnect, stopVideo } from '../../services/video-recorder';
import { VideoPlayer } from '../../services/video-player';

import { useState, useEffect } from 'react';
import { Container, Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuidv4 } from 'uuid';

export function SurveyPage() {
    const userID = useState(uuidv4());
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [modalClosed, setModalClosed] = useState(false);

    let summaryValues = {
        values: {
            1: { checkedValue: -1, hoverTime: -1, isChanged: false, hoverTimeStamp: [] },
            2: { checkedValue: -1, hoverTime: -1, isChanged: false, hoverTimeStamp: [] },
            3: { checkedValue: -1, hoverTime: -1, isChanged: false, hoverTimeStamp: [] },
            4: { checkedValue: -1, hoverTime: -1, isChanged: false, hoverTimeStamp: [] },
            5: { checkedValue: -1, hoverTime: -1, isChanged: false, hoverTimeStamp: [] },
            6: { checkedValue: -1, hoverTime: -1, isChanged: false, hoverTimeStamp: [] },
            7: { checkedValue: -1, hoverTime: -1, isChanged: false, hoverTimeStamp: [] },
            8: { checkedValue: -1, hoverTime: -1, isChanged: false, hoverTimeStamp: [] },
            9: { checkedValue: -1, hoverTime: -1, isChanged: false, hoverTimeStamp: [] },
        }
    }


    const handleEmailChange = (value, isValid) => {
        setEmail(value);
        setIsValidEmail(isValid);
    }

    const handleConfirmButton = () => {
        stopVideo();
        socketDisconnect({
            user_email: email,
            user_id: userID
        });
    }

    const handleOnCloseModal = (isClosed) => {
        setModalClosed(isClosed);
    }

    const handleOnRadioChange = (index, value) => {
        let oldValue = summaryValues.values[index].checkedValue;
        summaryValues.values[index].checkedValue = value;
        if (oldValue !== -1) {
            summaryValues.values[index].isChanged = true;
        }
    }


    useEffect(() => {
        if (isValidEmail && modalClosed) {
            videoRecorder({
                user_email: email,
                user_id: userID
            });
        }
    }, [
        email,
        userID,
        isValidEmail,
        modalClosed
    ]);

    return (
        <Container>
            <VideoPlayer className="video-player" />
            <Header />
            <RowRadioButtonsGroup index={1} onRadioChange={handleOnRadioChange} title="1. เบื่อ ทำอะไร ๆ ก็ไม่เพลิดเพลิน" />
            <RowRadioButtonsGroup index={2} onRadioChange={handleOnRadioChange} title="2. ไม่สบายใจ ซึมเศร้า หรือท้อแท้" />
            <RowRadioButtonsGroup index={3} onRadioChange={handleOnRadioChange} title="3. หลับยาก หรือหลับ ๆ ตื่น ๆ หรือหลับมากไป" />
            <RowRadioButtonsGroup index={4} onRadioChange={handleOnRadioChange} title="4. เหนื่อยง่าย หรือไม่ค่อยมีแรง" />
            <RowRadioButtonsGroup index={5} onRadioChange={handleOnRadioChange} title="5. เบื่ออาหาร หรือกินมากเกินไป" />
            <RowRadioButtonsGroup index={6} onRadioChange={handleOnRadioChange} title="6. รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว หรือเป็นคนทำให้ตัวเอง หรือครอบครัวผิดหวัง" />
            <RowRadioButtonsGroup index={7} onRadioChange={handleOnRadioChange} title="7. สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงานที่ต้องใช้ความตั้งใจ" />
            <RowRadioButtonsGroup index={8} onRadioChange={handleOnRadioChange} title="8. พูดหรือทำอะไรช้าจนคนอื่นมองเห็น หรือกระสับกระส่ายจนท่านอยู่ไม่นิ่งเหมือนเคย" />
            <RowRadioButtonsGroup index={9} onRadioChange={handleOnRadioChange} title="9. คิดทำร้ายตนเอง หรือคิดว่าถ้าตาย ๆ ไปเสียคงจะดี" />
            <Stack spacing={2} alignItems="center">
                <Button
                    onClick={() => handleConfirmButton()}
                    style={styles.button}
                    disabled={!isValidEmail}
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
