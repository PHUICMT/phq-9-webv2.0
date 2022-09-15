import './modal.css'

import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Download } from '@mui/icons-material';
import { format } from "date-fns";

import { EmoteReportTable } from '../report-popup/report-popup';
import { UserTypeRadioButtonsGroup } from '../user-type-radio/user-type-radio';

import { VideoPlayer } from '../../services/video-player';
import generatePDF from '../../services/report-generator';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .MuiDialog-paper': {
        maxWidth: '100%',
    }
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node
};

export function ConfirmModal(props) {
    const [open, setOpen] = useState(false);
    const [validUserType, setValidUserType] = useState(false);

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const handleClose = () => {
        setOpen(false);
        props.onCloseModal(true);
    };

    const handleOnUserTypeChange = (e) => {
        const value = e.target.value;
        setValidUserType(true);
        props.onUserTypeChange(value);
    }

    return (
        <div>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                >
                    ตรวจสอบวิดีโอ และระบุกลุ่มผู้ทดลอง
                </BootstrapDialogTitle>
                <DialogContent dividers className='modal-content'>
                    <VideoPlayer className="video-modal" isModal={true} />
                    <UserTypeRadioButtonsGroup onUserTypeChange={handleOnUserTypeChange} />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        size="large"
                        variant="contained"
                        disabled={!validUserType}
                    >
                        เริ่มทดสอบ
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

export function ReportModal(props) {
    const [open, setOpen] = useState(false);
    const [reportData, setReportData] = useState({});

    const currentDate = format(new Date(), "yyyy-MM-dd")
    const [id, setId] = useState(undefined);
    const [userType, setUserType] = useState(undefined);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [exportReportData, setExportReportData] = useState(undefined);
    const [exportReportInfo, setExportReportInfo] = useState(undefined);

    useEffect(() => {
        setOpen(props.open);
        setReportData(props.reportData);
        if (props.open === true) {
            setIsSubmitted(props.reportData.display_info.is_submit);
            setId(props.reportData.display_info.id);
            setUserType(
                getUserType(
                    props.reportData.display_info.user_type
                )
            );
        }
    }, [props.open, props.reportData]);

    useEffect(() => {
        if (props.open === true) {
            const exportData = [
                {
                    id: 'ข้อ 1',
                    reaction_time: props.reportData.emotion_result_table[1].reaction_time.toFixed(2) + ' วินาที',
                    score: props.reportData.emotion_result_table[1].score,
                    behaver: getBehaviorReport(props.reportData.emotion_result_table[1].behaver),
                    emotion: getEmotionReport(props.reportData.emotion_result_table[1].emotion),
                },
                {
                    id: 'ข้อ 2',
                    reaction_time: props.reportData.emotion_result_table[2].reaction_time.toFixed(2) + ' วินาที',
                    score: props.reportData.emotion_result_table[2].score,
                    behaver: getBehaviorReport(props.reportData.emotion_result_table[2].behaver),
                    emotion: getEmotionReport(props.reportData.emotion_result_table[2].emotion),
                },
                {
                    id: 'ข้อ 3',
                    reaction_time: props.reportData.emotion_result_table[3].reaction_time.toFixed(2) + ' วินาที',
                    score: props.reportData.emotion_result_table[3].score,
                    behaver: getBehaviorReport(props.reportData.emotion_result_table[3].behaver),
                    emotion: getEmotionReport(props.reportData.emotion_result_table[3].emotion),
                },
                {
                    id: 'ข้อ 4',
                    reaction_time: props.reportData.emotion_result_table[4].reaction_time.toFixed(2) + ' วินาที',
                    score: props.reportData.emotion_result_table[4].score,
                    behaver: getBehaviorReport(props.reportData.emotion_result_table[4].behaver),
                    emotion: getEmotionReport(props.reportData.emotion_result_table[4].emotion),
                },
                {
                    id: 'ข้อ 5',
                    reaction_time: props.reportData.emotion_result_table[5].reaction_time.toFixed(2) + ' วินาที',
                    score: props.reportData.emotion_result_table[5].score,
                    behaver: getBehaviorReport(props.reportData.emotion_result_table[5].behaver),
                    emotion: getEmotionReport(props.reportData.emotion_result_table[5].emotion),
                },
                {
                    id: 'ข้อ 6',
                    reaction_time: props.reportData.emotion_result_table[6].reaction_time.toFixed(2) + ' วินาที',
                    score: props.reportData.emotion_result_table[6].score,
                    behaver: getBehaviorReport(props.reportData.emotion_result_table[6].behaver),
                    emotion: getEmotionReport(props.reportData.emotion_result_table[6].emotion),
                },
                {
                    id: 'ข้อ 7',
                    reaction_time: props.reportData.emotion_result_table[7].reaction_time.toFixed(2) + ' วินาที',
                    score: props.reportData.emotion_result_table[7].score,
                    behaver: getBehaviorReport(props.reportData.emotion_result_table[7].behaver),
                    emotion: getEmotionReport(props.reportData.emotion_result_table[7].emotion),
                },
                {
                    id: 'ข้อ 8',
                    reaction_time: props.reportData.emotion_result_table[8].reaction_time.toFixed(2) + ' วินาที',
                    score: props.reportData.emotion_result_table[8].score,
                    behaver: getBehaviorReport(props.reportData.emotion_result_table[8].behaver),
                    emotion: getEmotionReport(props.reportData.emotion_result_table[8].emotion),
                },
                {
                    id: 'ข้อ 9',
                    reaction_time: props.reportData.emotion_result_table[9].reaction_time.toFixed(2) + ' วินาที',
                    score: props.reportData.emotion_result_table[9].score,
                    behaver: getBehaviorReport(props.reportData.emotion_result_table[9].behaver),
                    emotion: getEmotionReport(props.reportData.emotion_result_table[9].emotion),
                }
            ]
            const exportInfo = {
                user_id: props.reportData.display_info.id,
                user_type: getUserType(props.reportData.display_info.user_type),
                is_submit: isSubmitted ? 'ส่งแบบทดสอบก่อนตอบครบทุกข้อ' : '',
                current_date: currentDate,
                result: props.reportData.display_info.result,
                submit_count: props.reportData.display_info.submit_count,
            }

            setExportReportData(exportData);
            setExportReportInfo(exportInfo);
        }
    }, [reportData, id, userType, currentDate]);

    const getEmotionReport = (emotion) => {
        var emotionReport = '';
        if (emotion.fear > 0) {
            emotionReport += 'กลัว : ' + emotion.fear.toFixed(2) + '% \n';
        }
        if (emotion.happy > 0) {
            emotionReport += 'มีความสุข : ' + emotion.happy.toFixed(2) + '% \n';
        }
        if (emotion.sad > 0) {
            emotionReport += 'เศร้า : ' + emotion.sad.toFixed(2) + '% \n';
        }
        if (emotion.neutral > 0) {
            emotionReport += 'ไม่มีอารมณ์ : ' + emotion.neutral.toFixed(2) + '%';
        }
        return emotionReport;
    }


    const getBehaviorReport = (behaver) => {
        var behavior = '';
        if (behaver.change) {
            behavior += 'เปลี่ยนคำตอบ, \n';
        }
        if (behaver.skip) {
            behavior += 'ข้ามข้อ, \n';
        }
        if (behaver.return) {
            behavior += 'กลับมาทำข้อที่ถูกข้าม, \n';
        }
        if (behaver.over) {
            behavior += 'ใช้ระยะเวลาเกินกำหนด (60 วินาที), ';
        }
        return behavior;
    }

    const getUserType = (userType) => {
        for (const [type, is_type] of Object.entries(userType)) {
            if (is_type) {
                switch (type) {
                    case 'normal':
                        return 'ผู้ทดสอบปกติ';
                    case 'depressed':
                        return 'ผู้ทดสอบซึมเศร้า';
                    case 'being_treated':
                        return 'ผู้ทดสอบกำลังรักษา';
                    default:
                        return '';
                }
            }
        }
    }

    const handleClose = () => {
        setOpen(false);
        props.onCloseModal(true);
    };

    const handleExport = () => {
        const reportData = {
            report_info: exportReportInfo,
            report_data: exportReportData
        }
        generatePDF(reportData);
    }

    return (
        <div>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    ผลการทดสอบ
                </BootstrapDialogTitle>
                <DialogContent dividers className='modal-content'>
                    <EmoteReportTable
                        reportData={reportData}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => handleExport()}
                        size="large"
                        variant="contained"
                        endIcon={<Download />}
                    >
                        ดาวน์โหลดรายงาน
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
