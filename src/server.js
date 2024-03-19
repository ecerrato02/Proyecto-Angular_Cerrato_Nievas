const express = require('express');
const app = express();
const cors = require('cors');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const fs = require('node:fs');

admin.initializeApp({
  credential: admin.credential.cert(require("..\\proyectolea-138e0-firebase-adminsdk-u5k4o-bcd6f093b9.json"))
});

const db = getFirestore();
const port = 3080;

app.listen(port, () => {
  console.log(`Puerto del servidor: ${port}`);
});


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ehernandez1@espriusalt.cat', // Correo de la empresa (NO CAMBIAR)
    pass: 'ywdw hjbf mvfw kmsq' // contraseña (NO CAMBIAR)
  }
});


app.use(express.json());
app.use(cors());

const tienda = db.collection('BlackDiamond');

function generateResetToken() {
  return crypto.randomBytes(32).toString('hex');
}

app.post('/api/register', async (req, res) => {
  const nombre = req.body.nombre;
  const email = req.body.email;
  const contra = req.body.contra;

  try {
    const hashedPassword = await bcrypt.hash(contra, 10);

    const tiendas = tienda.doc(nombre);
    let userFinder = await tienda.where("nombre", "==", nombre).get();
    let emailFinder = await tienda.where("email", "==", email).get();
    if (userFinder.empty) {
      if (emailFinder.empty) {
        await tiendas.set({
          nombre: nombre,
          email: email,
          contraseña: hashedPassword,
          verificacion: false,
        });
        let mailOptions = {
          from: 'ehernandez1@espriusalt.cat',
          to: email,
          subject: '¡Verifica tu correo electrónico!',
          html: `<p>¡Gracias por registrarte en nuestra tienda! Haz clic en el siguiente enlace para verificar tu correo electrónico:</p>
                 <a href="http://localhost:3080/verificar/${nombre}">Verificar correo electrónico</a>`
        };
        logToFile(nombre,"se ha registrado correctamente");
        await transporter.sendMail(mailOptions, (error, response) => {
          error ? console.log(error) : console.log(response);
        });
        res.json("true");
      } else {
        logToFile( nombre,"es un usuario ya registrado");
        res.json("false");
      }
    } else {
      logToFile( nombre,"es un usuario ya registrado");
      res.json("false");
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ success: false, message: 'Error al registrar usuario' });
  }
});

app.get('/api/user/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const userSnapshot = await tienda.where('nombre', '==', username).get();

    if (!userSnapshot.empty) {
      const userData = userSnapshot.docs[0].data();
      res.json(userData);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    res.status(500).json({ message: 'Error al obtener datos del usuario' });
  }
});

app.put('/api/user2/:username', async (req, res) => {
  const username = req.params.username;
  const newEmail = req.body.email;

  await tienda.doc(username).update({ email: newEmail, verificacion: false });

  let mailOptions = {
    from: 'ehernandez1@espriusalt.cat',
    to: newEmail,
    subject: '¡Verifica tu nuevo correo electrónico!',
    html: `<p>¡Gracias por actualizar tu correo electrónico en nuestra tienda! Haz clic en el siguiente enlace para verificar tu nuevo correo electrónico:</p>
           <a href="http://localhost:3080/verificar/${username}">Verificar correo electrónico</a>`
  };
  await transporter.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
  });

  res.json({ success: true });
  logToFile(username, "se ha cambiado el correo electrónico a " + newEmail);

});

app.post('/api/verify', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const userSnapshot = await tienda.where('email', '==', email).get();
  if (userSnapshot.empty) {
    return res.json({ success: false, message: 'Correo electrónico incorrecto' });
  }
  const userData = userSnapshot.docs[0].data();
  if (userData.contraseña !== password) {
    return res.json({ success: false, message: 'Contraseña incorrecta' });
  }
  res.json({ success: true });

});

app.get('/verificar/:nombre', async (req, res) => {
  const nombre = req.params.nombre;
  await tienda.doc(nombre).update({ verificacion: true });
  logToFile(nombre, "ha verificado el correo electrónico");
  res.send("¡Correo electrónico verificado con éxito!");
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const userSnapshot = await tienda.doc(username).get();
  const userData = userSnapshot.data();

  if (userData) {
    const isPasswordValid = await bcrypt.compare(password, userData.contraseña);
    if (isPasswordValid) {
      if (userData.verificacion === true) {
        res.json({ username: userData.nombre });
      } else {
        res.status(400).json({ message: 'La cuenta no está verificada. Por favor, verifica tu correo electrónico' });
        logToFile(username, "ha intentado iniciar sesión en la cuenta no verificada");
      }
    } else {
      res.status(400).json({ message: 'Credenciales inválidas' });
      logToFile(username, "ha intentado iniciar sesión con credenciales inválidas");
    }
  } else {
    res.status(400).json({ message: 'Usuario no encontrado' });
    logToFile(username, "ha intentado iniciar sesión pero este usuario no existe");
  }
});

app.post('/api/reset-password', async (req, res) => {
  const { email, newPassword, confirmPassword, username } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Las contraseñas no coinciden' });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');

  const resetLink = `http://localhost:4200/restablecer-contrasena?token=${resetToken}`;
  const mailOptions = {
    from: 'ehernandez1@espriusalt.cat',
    to: email,
    subject: 'Restablecer contraseña - Black Diamond',
    html: `<p>Hola,</p>
           <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
           <a href="${resetLink}">Restablecer contraseña</a>`
  };

  await transporter.sendMail(mailOptions);

  logToFile(username, "ha solicitado un cambio de contraseña");

  res.json({ success: true });
});

app.post('/api/change-password', async (req, res) => {
  const { username, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Las contraseñas no coinciden' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await tienda.doc(username).update({ contraseña: hashedPassword });

  res.json({ success: true });

  logToFile(username, "cambió su contraseña");

});

function logToFile(username, information) {
  const path = "C:\\logs\\logs.log";

  const timestamp = new Date();
  const dia = timestamp.getDate().toString().padStart(2, '0');
  let mes = timestamp.getMonth() + 1;
  mes = mes.toString().padStart(2, '0');
  const año = timestamp.getFullYear().toString();
  const horas = timestamp.getHours().toString().padStart(2, '0');
  const minutos = timestamp.getMinutes().toString().padStart(2, '0');
  const segundos = timestamp.getSeconds().toString().padStart(2, '0');

  const fechaFormateada = `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
  let logEntry = "[" + fechaFormateada + "] ";

  if (username) {
    logEntry += username + " ";
  }

  logEntry += information.toUpperCase() + ".\n";

  fs.writeFileSync(path, logEntry, { flag: 'a+' });
}

app.post('/api/logs', async (req, res) => {
  const { username, information } = req.body;
  logToFile(username, information);
});
