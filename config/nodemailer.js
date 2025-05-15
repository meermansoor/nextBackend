const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 587,
    auth: {
        user: "ibtasamofficial@gmail.com",
        pass: "vcvk eepn jtsz rrsz",
    }
});

const sendMail = async (to, subject, html) => {
    return transporter.sendMail({
        from: "ibtasamofficial@gmail.com",
        to,
        subject,
        html
    });
};

export { sendMail };