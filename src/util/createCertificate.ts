// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import html_to_pdf from "html-pdf-node";
import fs from "fs";

const createCertificate = (
    name: string,
    email: string,
    photo: string,
    vaccinationStatus: string
): Promise<any> => {
    const options = {
        format: "A4",
        margin: {
            top: 200,
            bottom: 50,
            left: 50,
            right: 50,
        },
    };
    const file = {
        content: `<center>
            <div style="font-family: 'Poppins', sans-serif;">
                 <h1 style="color: #4A50C0; font-size: 60px;">COVID Vaccinator</h1>\n
                <img src="${photo}" alt="">
                <p><b>Name: </b>${name}</p>
                <p><b>Email: </b>${email}<br></p>
                <h1>${vaccinationStatus.toUpperCase()}</h1>
            </div>
                </center>
            `,
    };
    return new Promise((resolve, reject) => {
        html_to_pdf.generatePdf(file, options).then((pdfBuffer: any) => {
            resolve(pdfBuffer);
        });
    });
};
export default createCertificate;
