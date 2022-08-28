import { RowRadioButtonsGroup } from '../../components/survey-item/survey-item';

import { Container } from '@mui/material';

export function SurveyPage() {
    return (
        <Container>
            <RowRadioButtonsGroup title="เบื่อ ทำอะไร ๆ ก็ไม่เพลิดเพลิน" />
            <RowRadioButtonsGroup title="ไม่สบายใจ ซึมเศร้า หรือท้อแท้" />
            <RowRadioButtonsGroup title="หลับยาก หรือหลับ ๆ ตื่น ๆ หรือหลับมากไป" />
            <RowRadioButtonsGroup title="เหนื่อยง่าย หรือไม่ค่อยมีแรง" />
            <RowRadioButtonsGroup title="เบื่ออาหาร หรือกินมากเกินไป" />
            <RowRadioButtonsGroup title="รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว หรือเป็นคนทำให้ตัวเอง หรือครอบครัวผิดหวัง" />
            <RowRadioButtonsGroup title="สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงานที่ต้องใช้ความตั้งใจ" />
            <RowRadioButtonsGroup title="พูดหรือทำอะไรช้าจนคนอื่นมองเห็น หรือกระสับกระส่ายจนท่านอยู่ไม่นิ่งเหมือนเคย" />
            <RowRadioButtonsGroup title="คิดทำร้ายตนเอง หรือคิดว่าถ้าตาย ๆ ไปเสียคงจะดี" />
        </Container>
    );
}