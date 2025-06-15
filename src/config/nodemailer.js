import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

const sendMailToRegister = async (userMail, token) => {
  let info = await transporter.sendMail({
    from: "admin@epn.edu.ec",
    to: userMail,
    subject: "❤️🔥 AmiKuna - Confirmar Cuenta 🔥❤️",
    html: `
      <h1>Bienvenido a AmiKuna</h1>
      <p>Por favor, confirma tu cuenta haciendo clic en el siguiente enlace:</p>
      <a href="${process.env.URL_FRONTEND}/confirmar/${token}">Confirmar cuenta</a>
      <hr>
      <footer>El equipo de AmiKuna te da la más cordial bienvenida.</footer>
    `,
  });
  console.log("Mensaje de confirmación enviado: ", info.messageId);
};

const sendMailToRecoveryPassword = async (userMail, token) => {
  let info = await transporter.sendMail({
    from: "admin@epn.edu.ec",
    to: userMail,
    subject: "Correo para reestablecer tu contraseña",
    html: `
      <h1>❤️🔥 AmiKuna 🔥 ❤️</h1>
      <p>Haz clic en el enlace para reestablecer tu contraseña:</p>
      <a href="${process.env.URL_FRONTEND}/recuperarPassword/${token}">Reestablecer contraseña</a>
      <hr>
      <footer>El equipo de AmiKuna te da la más cordial bienvenida.</footer>
    `,
  });
  console.log("Mensaje de recuperación enviado: ", info.messageId);
};

export {
  sendMailToRegister,
  sendMailToRecoveryPassword
};
