import jsPDF from "jspdf";
import "jspdf-autotable";
import "./THSarabunNew-normal"
import "./THSarabunNew-bold"

const generatePDF = (emotionReport) => {
    const doc = new jsPDF();
    const user_id = emotionReport.report_info.user_id
    const user_type = emotionReport.report_info.user_type
    const is_submit = emotionReport.report_info.is_submit
    const result_text = emotionReport.report_info.result.result
    const result_info = emotionReport.report_info.result.info
    const result_color = emotionReport.report_info.result.color
    const date_full = Date()

    doc.setFont('THSarabunNew', 'normal');

    doc.setFontSize(8);
    doc.text("รหัสกลุ่มผู้ทดสอบ : " + user_id, 10, 10);

    doc.setFontSize(18)
    doc.text('รายงานการวิเคราะห์แนวโน้มภาวะซึมเศร้า', 14, 22,);

    doc.setFontSize(14)
    doc.text('ประเภทกลุ่มผู้ทดสอบ : ' + user_type, 14, 35)
    doc.text('วันที่ทดสอบ : ' + date_full, 14, 40)

    doc.setTextColor("#ff0000")
    doc.text(is_submit, 190, 10, { align: "right" })

    doc.setTextColor("#000")
    doc.text('ผลการวิเคราะห์ : ', 14, 50)
    doc.setTextColor(result_color)
    doc.text(result_text, 40, 50)

    doc.setTextColor("#000")
    var split_info_text = doc.splitTextToSize('คำอธิบาย : ' + result_info, 190);
    doc.text(split_info_text, 14, 55)

    var info_height = doc.getTextDimensions(split_info_text).h

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
        startY: 55 + info_height,
    })

    const date = date_full.split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.save(`report_${user_id}_${dateStr}.pdf`);
};

export default generatePDF;