import Fear from '../../assets/icons/fear-icon.svg'
import Happy from '../../assets/icons/happy-icon.svg'
import Neutral from '../../assets/icons/neutral-icon.svg'
import Sad from '../../assets/icons/sad-icon.svg'

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(ItemQuestion, ReactionTime, Score, Behavior, Emotion) {
    return { ItemQuestion, ReactionTime, Score, Behavior, Emotion };
}

const rows = [
    // createData('ข้อ 1', reactionTime[0], checkEmotionUndefined(0), checkBehaviorUndefined(0)),
    // createData('ข้อ 2', reactionTime[1], checkEmotionUndefined(1), checkBehaviorUndefined(1)),
    // createData('ข้อ 3', reactionTime[2], checkEmotionUndefined(2), checkBehaviorUndefined(2)),
    // createData('ข้อ 4', reactionTime[3], checkEmotionUndefined(3), checkBehaviorUndefined(3)),
    // createData('ข้อ 5', reactionTime[4], checkEmotionUndefined(4), checkBehaviorUndefined(4)),
    // createData('ข้อ 6', reactionTime[5], checkEmotionUndefined(5), checkBehaviorUndefined(5)),
    // createData('ข้อ 7', reactionTime[6], checkEmotionUndefined(6), checkBehaviorUndefined(6)),
    // createData('ข้อ 8', reactionTime[7], checkEmotionUndefined(7), checkBehaviorUndefined(7)),
    // createData('ข้อ 9', reactionTime[8], checkEmotionUndefined(8), checkBehaviorUndefined(8))
];

const showEmotionIcon = (emotePerQuestion) => {
    const fear = emotePerQuestion["fear"]
    const happy = emotePerQuestion["happy"]
    const sad = emotePerQuestion["sad"]
    const neutral = emotePerQuestion["neutral"]
    return (
        <div className="emote-group-table">
            {fear > 0 ? <div><img alt='Fear' src={Fear} /> <p>{fear}%</p></div> : <div />}
            {happy > 0 ? <div><img alt='Happy' src={Happy} /> <p>{happy}%</p></div> : <div />}
            {sad > 0 ? <div><img alt='Sad' src={Sad} /> <p>{sad}%</p></div> : <div />}
            {neutral > 0 ? <div><img alt='Neutral' src={Neutral} /> <p>{neutral}%</p></div> : <div />}
        </div >
    );
}

export function EmoteReportTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption>A basic table example with a caption</caption>
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
                    {rows.map((row) => (
                        <TableRow key={row.ItemQuestion}>
                            <TableCell component="th" scope="row">{row.ItemQuestion}</TableCell>
                            <TableCell align="center">{row.ReactionTime}</TableCell>
                            <TableCell align="center">{row.Score}</TableCell>
                            <TableCell align="center">{row.Behavior}</TableCell>
                            <TableCell align="center">{row.Emotion}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
