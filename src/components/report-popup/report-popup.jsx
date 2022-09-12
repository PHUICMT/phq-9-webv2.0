import './report-popup.css';

import Fear from '../../assets/icons/fear-icon.svg'
import Happy from '../../assets/icons/happy-icon.svg'
import Neutral from '../../assets/icons/neutral-icon.svg'
import Sad from '../../assets/icons/sad-icon.svg'

import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function EmoteReportTable(props) {
    const [id, setId] = useState(undefined);
    const [userType, setUserType] = useState(undefined);
    const [reportDataRows, setReportDataRows] = useState(undefined);
    const [isSubmit, setIsSubmit] = useState(false);

    function createData(ItemQuestion, ReactionTime, Score, Behavior, Emotion) {
        return { ItemQuestion, ReactionTime, Score, Behavior, Emotion };
    }

    useEffect(() => {
        const reportResults = props.reportData.emotion_result_table;
        const reportInfo = props.reportData.display_info;
        if (reportResults[1].emotion !== undefined) {
            setReportDataRows([
                createData('ข้อ 1', reportResults[1].reaction_time.toFixed(2), reportResults[1].score, showBehavior(reportResults[1].behaver), showEmotionIcon(reportResults[1].emotion)),
                createData('ข้อ 2', reportResults[2].reaction_time.toFixed(2), reportResults[2].score, showBehavior(reportResults[2].behaver), showEmotionIcon(reportResults[2].emotion)),
                createData('ข้อ 3', reportResults[3].reaction_time.toFixed(2), reportResults[3].score, showBehavior(reportResults[3].behaver), showEmotionIcon(reportResults[3].emotion)),
                createData('ข้อ 4', reportResults[4].reaction_time.toFixed(2), reportResults[4].score, showBehavior(reportResults[4].behaver), showEmotionIcon(reportResults[4].emotion)),
                createData('ข้อ 5', reportResults[5].reaction_time.toFixed(2), reportResults[5].score, showBehavior(reportResults[5].behaver), showEmotionIcon(reportResults[5].emotion)),
                createData('ข้อ 6', reportResults[6].reaction_time.toFixed(2), reportResults[6].score, showBehavior(reportResults[6].behaver), showEmotionIcon(reportResults[6].emotion)),
                createData('ข้อ 7', reportResults[7].reaction_time.toFixed(2), reportResults[7].score, showBehavior(reportResults[7].behaver), showEmotionIcon(reportResults[7].emotion)),
                createData('ข้อ 8', reportResults[8].reaction_time.toFixed(2), reportResults[8].score, showBehavior(reportResults[8].behaver), showEmotionIcon(reportResults[8].emotion)),
                createData('ข้อ 9', reportResults[9].reaction_time.toFixed(2), reportResults[9].score, showBehavior(reportResults[9].behaver), showEmotionIcon(reportResults[9].emotion))
            ]);
            setId(reportInfo.id);
            setIsSubmit(reportInfo.is_submit)
            setUserType(reportInfo.user_type)
        }
    }, [
        props.reportData,
        props.reportData.emotion_result_table,
        props.reportData.emotion_result_table.emotion,
        props.reportData.display_info,
        props.reportData.display_info.is_submit
    ]);



    const showBehavior = (behavior) => {
        const is_change = behavior["change"]
        const is_skip = behavior["skip"]
        const is_return = behavior["return"]
        const is_over = behavior["over"]
        return (
            <div className="behavior-group-table">
                {is_change ? <div className="behavior-table">/Change/</div> : null}
                {is_skip ? <div className="behavior-table">Skip/</div> : null}
                {is_return ? <div className="behavior-table">Return/</div> : null}
                {is_over ? <div className="behavior-table">Over/</div> : null}
            </div >
        );
    }

    const showEmotionIcon = (emote) => {
        const fear = emote.fear
        const happy = emote.happy
        const sad = emote.sad
        const neutral = emote.neutral
        return (
            <div className="emote-group-table">
                {fear > 0 ? <div className='emote-icon'><img alt='Fear' src={Fear} /> <p>{fear.toFixed(2)}%</p></div> : <div className='emote-icon' />}
                {happy > 0 ? <div className='emote-icon'><img alt='Happy' src={Happy} /> <p>{happy.toFixed(2)}%</p></div> : <div className='emote-icon' />}
                {sad > 0 ? <div className='emote-icon'><img alt='Sad' src={Sad} /> <p>{sad.toFixed(2)}%</p></div> : <div />}
                {neutral > 0 ? <div className='emote-icon'><img alt='Neutral' src={Neutral} /> <p>{neutral.toFixed(2)}%</p></div> : <div className='emote-icon' />}
            </div >
        );
    }

    return (
        <TableContainer sx={{ maxHeight: 600 }} component={Paper}>
            <Table stickyHeader aria-label="caption table">
                {(isSubmit === true) ? <caption>Is Submit!!</caption> : null}
                <TableHead>
                    <TableRow>
                        <TableCell>คำถาม</TableCell>
                        <TableCell align="center">เวลาที่ใช้ในข้อนี้ (วินาที)</TableCell>
                        <TableCell align="center">ผลคะแนนรายข้อ</TableCell>
                        <TableCell align="center">พฤติกรรมระหว่างตอบ</TableCell>
                        <TableCell align="center">อารมณ์</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        reportDataRows !== undefined ?
                            reportDataRows.map((row) => (
                                <TableRow key={row.ItemQuestion}>
                                    <TableCell component="th" scope="row">{row.ItemQuestion}</TableCell>
                                    <TableCell align="center">{row.ReactionTime} วินาที</TableCell>
                                    <TableCell align="center">{row.Score}</TableCell>
                                    <TableCell align="center">{row.Behavior}</TableCell>
                                    <TableCell align="center">{row.Emotion}</TableCell>
                                </TableRow>
                            )) : null
                    }
                </TableBody>
            </Table>
        </TableContainer>

    );
}
