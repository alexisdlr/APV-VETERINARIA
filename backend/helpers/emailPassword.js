import nodemailer from 'nodemailer'

const emailPassword = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  const {name, email, token} = datos
  await transport.sendMail({
    from: 'APV - Administrador de Pacientes',
    to: email,
    subject: 'Cambiar contraseña en APV',
    text: 'Cambiar contraseña en APV',
    html: `
      <h2>Hola, ${name}. Has solicitado reestablecer tu password en APV</h2>
      <p>Click al siguiente enlace para generar un nuevo password: 
      <a href='${process.env.FRONTEND_URL}/olvide-password/${token}'>Reestablecer password</a> </p>

      <p> Si tu no creaste esta cuenta puedes ignorar este correo</p>
    `
  })
}
export default emailPassword