"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const html_pdf_node_1 = __importDefault(require("html-pdf-node"));
const createCertificate = (name, email, photo, vaccinationStatus) => {
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
        html_pdf_node_1.default.generatePdf(file, options).then((pdfBuffer) => {
            resolve(pdfBuffer);
        });
    });
};
exports.default = createCertificate;
