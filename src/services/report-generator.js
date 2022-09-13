import jsPDF from "jspdf";
import "jspdf-autotable";
import "./THSarabunNew-normal"
import "./THSarabunNew-bold"

const generatePDF = (emotionReport) => {
    const doc = new jsPDF();
    const user_id = emotionReport.report_info.user_id
    const user_type = emotionReport.report_info.user_type
    const is_submit = emotionReport.report_info.is_submit
    const current_date = emotionReport.report_info.current_date

    doc.setFont('THSarabunNew', 'normal');

    doc.setFontSize(8);
    doc.text("รหัสกลุ่มผู้ทดสอบ : " + user_id, 10, 10);

    doc.setFontSize(18)
    doc.text('รายงานการวิเคราะห์แนวโน้มภาวะซึมเศร้า', 14, 22,);

    doc.setFontSize(12)
    doc.text('ประเภทกลุ่มผู้ทดสอบ : ' + user_type, 14, 30)
    doc.text('วันที่ทดสอบ : ' + current_date, 14, 40)

    doc.setFontSize(12)
    doc.text(is_submit, 14, 45)


    const tableColumn = [["คำถาม", "เวลาที่ใช้ในข้อนี้ (วินาที)", "ผลคะแนนรายข้อ", "พฤติกรรมระหว่างตอบ", "อารมณ์", "คำแนะนำ / ข้อเสนอแนะ"]];
    const tableRows = [];

    emotionReport.report_data.forEach(result => {
        const emotionReportData = [
            result.id,
            result.reaction_time,
            result.score,
            result.behaver,
            result.emotion,
        ];
        tableRows.push(emotionReportData);
    });

    console.log(tableRows)
    // startY is basically margin-top
    doc.autoTable({
        styles: {
            font: 'THSarabunNew',
            halign: 'center',
            valign: 'middle',
            minCellHeight: 12,
            fontSize: 12,
            lineWidth: 0.1,
        },
        headStyles: {
            fontStyle: 'bold',
            fontSize: 14,
        },
        columnStyles: {
            3: { halign: 'left', cellPadding: 5 },
            4: { halign: 'left', cellPadding: 5, minCellWidth: 20 },
        },
        head: tableColumn,
        body: tableRows,
        startY: 50,
    })

    const date = Date().split(" ");
    // date string to generate filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // define the name of our PDF file.
    doc.save(`report_${user_id}_${dateStr}.pdf`);
};

export default generatePDF;