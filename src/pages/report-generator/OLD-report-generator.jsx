// import Angry from '../../assets/icons/angry-icon.svg'
// import Happy from '../../assets/icons/happy-icon.svg'
// import Neutral from '../../assets/icons/neutral-icon.svg'
// import Sad from '../../assets/icons/sad-icon.svg'

// import { useState, useEffect } from 'react';
// import { Container } from 'react-bulma-components';
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';




// export function Report(props) {

//     const [checkBox, setCheckBox] = useState(1);
//     const [clickTime, setClickTime] = useState([]);
//     const [reactionTime, setReactionTime] = useState([]);
//     const [emotion, setEmotion] = useState();
//     const [uuid, setUuid] = useState();
//     const [behavior, setBehavior] = useState();
//     const [questionnaire_uuid, setQuestionnaire_uuid] = useState();





//     useEffect(() => {
//         setCheckBox(props.location.state.checkBox);
//         setClickTime(props.location.state.clickTime);
//         setReactionTime(props.location.state.reactionTime);
//         setEmotion(props.location.state.emotion);
//         setUuid(props.location.state.uuid);
//         setBehavior(props.location.state.behavior);
//         setQuestionnaire_uuid(props.location.state.questionnaire_uuid);
//     }, [
//         checkBox,
//         clickTime,
//         reactionTime,
//         emotion,
//         uuid,
//         behavior,
//         questionnaire_uuid,
//         props.location.state.checkBox,
//         props.location.state.clickTime,
//         props.location.state.reactionTime,
//         props.location.state.emotion,
//         props.location.state.uuid,
//         props.location.state.behavior,
//         props.location.state.questionnaire_uuid,
//     ]);

//     function padLeadingZeros(num, size) {
//         var s = num + "";
//         while (s.length < size) s = "0" + s;
//         return s;
//     }

//     function showEmotionIcon(emotePerQuestion) {
//         return (
//             <div className="emote-group-table">
//                 {emotePerQuestion[0] ? <img alt='Angry' src={Angry} /> : <div />}
//                 {emotePerQuestion[1] ? <img alt='Happy' src={Happy} /> : <div />}
//                 {emotePerQuestion[2] ? <img alt='Neutral' src={Neutral} /> : <div />}
//                 {emotePerQuestion[3] ? <img alt='Sad' src={Sad} /> : <div />}
//             </div >
//         );
//     }

//     function showClickTime(click) {
//         if (click === null) {
//             return 'NOT CLICKED';
//         }
//         return click + ' น.';
//     }

//     function checkEmotionUndefined(n) {
//         if (typeof (emotion) !== 'undefined') {
//             return showEmotionIcon(emotion[n]);
//         }
//         return <div />;
//     }
//     function checkBehaviorUndefined(n) {
//         if (typeof (behavior) !== 'undefined') {
//             return (
//                 <div className="behavior">
//                     {(behavior[n].includes('Changed')) ? <div className="behavior change"><h>Change</h></div> : <div />}
//                     {(behavior[n].includes('Skip')) ? <div className="behavior skip"><h>Skip</h></div> : <div />}
//                 </div>
//             );
//         }
//         return '';
//     }

//     function createData(ItemQuestion, ClickTime, ReactionTime, Emotion, Behavior) {
//         return { ItemQuestion, ClickTime, ReactionTime, Emotion, Behavior };
//     }

//     const rows = [
//         createData('ข้อ 1', showClickTime(clickTime[0]), (reactionTime[0] / 1000), checkEmotionUndefined(0), checkBehaviorUndefined(0)),
//         createData('ข้อ 2', showClickTime(clickTime[1]), (reactionTime[1] / 1000), checkEmotionUndefined(1), checkBehaviorUndefined(1)),
//         createData('ข้อ 3', showClickTime(clickTime[2]), (reactionTime[2] / 1000), checkEmotionUndefined(2), checkBehaviorUndefined(2)),
//         createData('ข้อ 4', showClickTime(clickTime[3]), (reactionTime[3] / 1000), checkEmotionUndefined(3), checkBehaviorUndefined(3)),
//         createData('ข้อ 5', showClickTime(clickTime[4]), (reactionTime[4] / 1000), checkEmotionUndefined(4), checkBehaviorUndefined(4)),
//         createData('ข้อ 6', showClickTime(clickTime[5]), (reactionTime[5] / 1000), checkEmotionUndefined(5), checkBehaviorUndefined(5)),
//         createData('ข้อ 7', showClickTime(clickTime[6]), (reactionTime[6] / 1000), checkEmotionUndefined(6), checkBehaviorUndefined(6)),
//         createData('ข้อ 8', showClickTime(clickTime[7]), (reactionTime[7] / 1000), checkEmotionUndefined(7), checkBehaviorUndefined(7)),
//         createData('ข้อ 9', showClickTime(clickTime[8]), (reactionTime[8] / 1000), checkEmotionUndefined(8), checkBehaviorUndefined(8)),
//     ];

//     const useStyles = makeStyles({
//         table: {
//             minWidth: 700,
//             maxWidth: 1100,
//         },
//     });

//     const classes = useStyles();
//     return (
//         <Container className="report-container">
//             <div className="space-top"></div>
//             <div className="paper-container" id="report-paper">
//                 <div className="form-header-box">
//                     <div className="form-text-header">
//                         <p className="personal-id">รหัส {padLeadingZeros(uuid, 6)}</p>
//                         <center><strong><p>รายงานวิเคราะห์แนวโน้มภาวะซึมเศร้า</p></strong></center>
//                         <div className="personal-info">
//                             <p></p>
//                             <p></p>
//                             <p></p>
//                         </div>
//                     </div>
//                     <div className="form-emotion">
//                         <div className="icon-symbol"><img alt='emote' src={Angry} /><h style={{ color: '#B5453C' }}>Angry</h></div>
//                         <div className="icon-symbol"><img alt='emote' src={Happy} /><h style={{ color: '#00D4D4' }}>Happy</h></div>
//                         <div className="icon-symbol"><img alt='emote' src={Neutral} /><h style={{ color: '#699DEE' }}>Neutral</h></div>
//                         <div className="icon-symbol"><img alt='emote' src={Sad} /><h style={{ color: '#2E3552' }}>Sad</h></div>
//                     </div>
//                 </div>
//                 <TableContainer className="table-container">
//                     <Table className={classes.table} aria-label="customized table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>ITEM QUESTION</TableCell>
//                                 <TableCell align="center">CLICK TIME</TableCell>
//                                 <TableCell align="center">REACTION TIME (Sec.)</TableCell>
//                                 <TableCell align="center">EMOTION</TableCell>
//                                 <TableCell align="center">BEHAVIOR</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {rows.map((row) => (
//                                 <TableRow key={row.ItemQuestion}>
//                                     <TableCell component="th" scope="row">{row.ItemQuestion}</TableCell>
//                                     <TableCell align="center">{row.ClickTime}</TableCell>
//                                     <TableCell align="center">{row.ReactionTime}</TableCell>
//                                     <TableCell align="center">{row.Emotion}</TableCell>
//                                     <TableCell align="center">{row.Behavior}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </div>
//         </Container>
//     );
// };

// export default Report;

