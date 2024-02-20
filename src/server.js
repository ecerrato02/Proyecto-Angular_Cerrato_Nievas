const express = require('express');
const app = express();
const cors = require('cors');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

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
    pass: 'gvnu kpnl wwdd enoo' // contraseña (NO CAMBIAR)
  }
});

app.use(express.json());
app.use(cors());

const tienda = db.collection('BlackDiamond');

app.get('/prueba', async (req, res) => {
  const nombre = req.body.nombre;
  const docUser = await tienda.get();
  let userFinder = await tienda.where(docUser, "==", nombre).get();
  if (userFinder.empty) {
    res.json(true);
  } else {
    res.json(false);
  }
});

app.post('/prueba2', async (req, res) => {
  const nombre = req.body.nombre;
  const email = req.body.email;
  const contra = req.body.contra;
  const tiendas = tienda.doc(nombre);
  let userFinder = await tienda.where("nombre", "==", nombre).get();
  let emailFinder = await tienda.where("email", "==", email).get();
  if (userFinder.empty) {
    if (emailFinder.empty) {
      await tiendas.set({
        nombre: nombre,
        email: email,
        contraseña: contra,
        verificacion: false,
      });
      let mailOptions = {
        from: 'blackdiamond.brandcontact@gmail.com',
        to: email,
        subject: '¡Verifica tu correo electrónico!',
        html: `<p>¡Gracias por registrarte en nuestra tienda! Haz clic en el siguiente enlace para verificar tu correo electrónico:</p>
               <a href="http://172.16.10.1:3080/verificar/${nombre}">Verificar correo electrónico</a>`
      };
      await transporter.sendMail(mailOptions, (error, response) => {
        error ? console.log(error) : console.log(response);
      });
    }
    res.json("true");
  } else {
    console.log("Un usuario se ha intentado conectar con un nombre ya existente");
    res.json("false");
  }
});

app.get('/verificar/:nombre', async (req, res) => {
  const nombre = req.params.nombre;
  await tienda.doc(nombre).update({ verificacion: true });
  res.send("¡Correo electrónico verificado con éxito!");
});

