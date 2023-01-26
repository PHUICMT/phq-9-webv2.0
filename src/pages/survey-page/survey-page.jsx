import {styles} from './survey-page-styles';

import {RowRadioButtonsGroup} from '../../components/survey-item/survey-item';
import {Header} from '../../components/header/header';
import {FooterTextPaper} from '../../components/text-info/text-info';
import {ConfirmModal, ReportModal} from '../../components/modal/modal';
import {LoadingModal} from '../../components/loader/loader';

import {
    videoRecorder,
    socketDisconnect,
    stopVideo,
    setArticle,
    setEmoteResult,
    setUserType,
    getReportAndSaveInfo,
    setSubmitCount,
    getDecision
} from '../../services/main-procress';
import {VideoPlayer} from '../../services/video-player';

import {useState, useEffect} from 'react';
import {Container, Button, Stack} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {v4 as uuidv4} from 'uuid';

export function SurveyPage() {
    const userID = useState(uuidv4());
    const [isSubmit, setIsSubmit] = useState(false);
    const [modalClosed, setModalClosed] = useState(false);
    const [reportReady, setReportReady] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);
    const [reportData, setReportData] = useState(undefined);
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [finalSummary, setFinalSummary] = useState(undefined);
    const [decision, setDecision] = useState(undefined);

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
            1: {
                checkedValue: -1,
                hoverTime: 0,
                behaver: {
                    change: false,
                    skip: false,
                    return: false,
                    over: false
                }
            },
            2: {
                checkedValue: -1,
                hoverTime: 0,
                behaver: {
                    change: false,
                    skip: false,
                    return: false,
                    over: false
                }
            },
            3: {
                checkedValue: -1,
                hoverTime: 0,
                behaver: {
                    change: false,
                    skip: false,
                    return: false,
                    over: false
                }
            },
            4: {
                checkedValue: -1,
                hoverTime: 0,
                behaver: {
                    change: false,
                    skip: false,
                    return: false,
                    over: false
                }
            },
            5: {
                checkedValue: -1,
                hoverTime: 0,
                behaver: {
                    change: false,
                    skip: false,
                    return: false,
                    over: false
                }
            },
            6: {
                checkedValue: -1,
                hoverTime: 0,
                behaver: {
                    change: false,
                    skip: false,
                    return: false,
                    over: false
                }
            },
            7: {
                checkedValue: -1,
                hoverTime: 0,
                behaver: {
                    change: false,
                    skip: false,
                    return: false,
                    over: false
                }
            },
            8: {
                checkedValue: -1,
                hoverTime: 0,
                behaver: {
                    change: false,
                    skip: false,
                    return: false,
                    over: false
                }
            },
            9: {
                checkedValue: -1,
                hoverTime: 0,
                behaver: {
                    change: false,
                    skip: false,
                    return: false,
                    over: false
                }
            }
        }
    }

    const checkAllAnswered = () => {
        for (const value of Object.values(summaryValues.values)) {
            if (value.checkedValue === -1) {
                return false;
            }
        }
        setFinalSummary(summaryValues);
        setEnableSubmit(true);
    }

    const handleOnCloseModal = (isClosed) => {
        setModalClosed(isClosed);
    }

    const handleOnRadioChange = (index, value) => {
        let oldValue = summaryValues.values[index].checkedValue;
        summaryValues.values[index].checkedValue = Number(value);
        if (oldValue !== -1) {
            summaryValues.values[index].behaver.change = true;
        }
        if (summaryValues.values[index].behaver.skip === true) {
            summaryValues.values[index].behaver.return = true;
        }

        for (const [key, value] of Object.entries(summaryValues.values)) {
            if (key < index && value.checkedValue === -1) {
                summaryValues.values[key].behaver.skip = true;
            } else if (key === index) {
                return;
            }
        }
        checkAllAnswered();
    }

    const handleConfirmButton = async () => {
        if (enableSubmit) {
            setShowLoader(true);
            setIsSubmit(true);
            stopVideo();
            setEmoteResult(finalSummary.values)
            socketDisconnect({user_id: userID[0]});
        } else {
            setSubmitCount()
        }
    }

    const handleOnMouseLeave = (value) => {
        const index = value.index;
        const totalTime = parseFloat(value.totalTime);
        summaryValues.values[index].hoverTime += totalTime;

        const currentTimeValue = summaryValues.values[index].hoverTime;
        if (currentTimeValue > 60) {
            summaryValues.values[index].behaver.over = true;
        }
    }

    useEffect(() => {
        if (modalClosed) {
            videoRecorder({user_id: userID});
        }
    }, [userID, modalClosed]);

    useEffect(() => {
        localStorage.setItem('status', "waiting");
        window.addEventListener("storage", async () => {
            const status = localStorage.getItem('status');
            if (status === 'Success') {
                await getReportAndSaveInfo().then(async (res) => {
                    setReportData(res);
                    await getDecision().then((res) => {
                        setDecision(res);
                    }).catch((_) => {
                        setDecision("Error")
                    });
                });
                setReportReady(true);
                setShowLoader(false);
                setReportOpen(true);
            }
        });
        return() => {
            window.removeEventListener("storage", null);
        }
    }, []);

    return (<Container>
        <VideoPlayer className="video-player"/>
        <Header/> {
        menuTitle.map((title, index) => {
            return (<RowRadioButtonsGroup key={index}
                onMouseEnter={setArticle}
                onMouseLeave={handleOnMouseLeave}
                index={
                    index + 1
                }
                onRadioChange={handleOnRadioChange}
                title={title}
                disabled={isSubmit}/>)
        })
    }
        <Stack spacing={2}
            alignItems="center"> {
            (isSubmit === false) ? <div onClick={
                    () => handleConfirmButton()
                }
                style={
                    {width: '-webkit-fill-available'}
            }>
                <Button onClick={
                        () => handleConfirmButton()
                    }
                    disabled={
                        !enableSubmit
                    }
                    style={
                        styles.button
                    }
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon/>}>
                    ส่งคำตอบ
                </Button>
            </div> : <Button onClick={
                    () => setReportOpen(true)
                }
                style={
                    styles.button
                }
                variant="contained"
                size="large"
                endIcon={<SendIcon/>}>
                แสดงผลการประเมิน
            </Button>
        }
            <FooterTextPaper/>
        </Stack>
        <LoadingModal open={showLoader}/>
        <ReportModal open={
                (reportReady && reportOpen)
            }
            reportData={reportData}
            decision={decision}
            onCloseModal={
                (e) => setReportOpen(!e)
            }/>
        <ConfirmModal open={
                !modalClosed
            }
            onCloseModal={handleOnCloseModal}
            onUserTypeChange={setUserType}/>
    </Container>);
}
