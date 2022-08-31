import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export function Header() {
    return (
        <Card>
            <CardMedia
                component='img'
                image='https://i.imgur.com/xPkEqda.png'
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    โปรดใส่คะแนนให้ตรงกับคำตอบของท่าน
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    (เกณฑ์ให้คะแนน : ไม่เลย = 0, มีบางวันหรือไม่บ่อย = 1, มีค่อนข้างบ่อย = 2, มีเกือบทุกวัน = 3)
                </Typography>
            </CardContent>
        </Card>
    );
}