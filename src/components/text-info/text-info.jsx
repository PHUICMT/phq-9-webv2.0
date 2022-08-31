import { styles } from './text-info-styles';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export function FooterTextPaper() {
    return (
        <Card style={styles.card}>
            <CardContent>
                <Typography gutterBottom align="left" variant="h6" component="div">
                    หมายเหตุ
                </Typography>
                <Typography align="left" variant="body2" color="text.secondary">
                    แบบประเมินนี้พัฒนาจาก แบบสอบถามสุขภาพผู้ป่วย (Patient Health Questionnaire: PHQ-9) ศ. นพ.มาโนช หล่อตระกูล และคณะ คณะแพทยศาสตร์โรงพยาบาลรามาธิบดี การประเมินนี้เป็นการประเมินระดับภาวะซึมเศร้าในขั้นต้น ส่วนการวินิจฉัยนั้นจำเป็นต้องพบแพทย์เพื่อซักประวัติ ตรวจร่างกาย รวมถึงส่งตรวจเพิ่มเติมที่จำเป็น เพื่อยืนยันการวินิจฉัยที่แน่นอน รวมถึงเพื่อแยกโรคหรือภาวะอื่น ๆ เนื่องจากภาวะซึมเศร้าเป็นจากสาเหตุต่าง ๆ ได้มากมาย เช่น โรคทางจิตเวชอื่นที่มีอาการซึมเศร้าร่วมด้วย โรคทางร่างกายเช่นโรคไทรอยด์ โรคแพ้ภูมิตัวเอง หรือเป็นจากยาหรือสารต่าง ๆ
                    ผลการประเมินและคำแนะนำที่ได้รับจากโปรแกรมนี้จึงไม่สามารถใช้แทนการตัดสินใจของแพทย์ได้ การตรวจรักษาเพิ่มเติมหรือการให้ยารักษาขึ้นอยู่กับดุลยพินิจของแพทย์และการปรึกษากันระหว่างแพทย์และตัวท่าน
                </Typography>
            </CardContent>
        </Card>
    );
}