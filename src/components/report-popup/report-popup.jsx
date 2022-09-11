import './report-popup.css';

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
import { styled } from "@mui/material/styles";

function createData(ItemQuestion, ReactionTime, Score, Behavior, Emotion) {
    return { ItemQuestion, ReactionTime, Score, Behavior, Emotion };
}

const showBehavior = () => {
    const fear = 10.5
    const happy = 0.0
    const sad = 50.0
    const neutral = 80.0
    return (
        <div className="behavior-group-table">
            <p>Skip</p>
        </div >
    );
}

const showEmotionIcon = () => {
    // const fear = emotePerQuestion["fear"]
    // const happy = emotePerQuestion["happy"]
    // const sad = emotePerQuestion["sad"]
    // const neutral = emotePerQuestion["neutral"]
    const fear = 10.5
    const happy = 0.0
    const sad = 50.0
    const neutral = 80.0
    return (
        <div className="emote-group-table">
            {fear > 0 ? <div className='emote-icon'><img alt='Fear' src={Fear} /> <p>{fear}%</p></div> : <div className='emote-icon' />}
            {happy > 0 ? <div className='emote-icon'><img alt='Happy' src={Happy} /> <p>{happy}%</p></div> : <div className='emote-icon' />}
            {sad > 0 ? <div className='emote-icon'><img alt='Sad' src={Sad} /> <p>{sad}%</p></div> : <div />}
            {neutral > 0 ? <div className='emote-icon'><img alt='Neutral' src={Neutral} /> <p>{neutral}%</p></div> : <div className='emote-icon' />}
        </div >
    );
}

const rows = [
    createData('ข้อ 1', 10, 2, showBehavior(), showEmotionIcon()),
    createData('ข้อ 2', 10, 2, showBehavior(), showEmotionIcon()),
    createData('ข้อ 3', 10, 2, showBehavior(), showEmotionIcon()),
    createData('ข้อ 4', 10, 2, showBehavior(), showEmotionIcon()),
    createData('ข้อ 5', 10, 2, showBehavior(), showEmotionIcon()),
    createData('ข้อ 6', 10, 2, showBehavior(), showEmotionIcon()),
    createData('ข้อ 7', 10, 2, showBehavior(), showEmotionIcon()),
    createData('ข้อ 8', 10, 2, showBehavior(), showEmotionIcon()),
    createData('ข้อ 9', 10, 2, showBehavior(), showEmotionIcon())
];

export function EmoteReportTable() {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="caption table">
                    {/* <caption>A basic table example with a caption</caption> */}
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
        </Paper>

    );
}
