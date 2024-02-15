const express = require ('express')
const app = express()
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
const serviceAccount = require('C:\\Users\\eduar\\IdeaProjects\\Proyecto-Angular_Cerrato_Nievas\\proyectolea-138e0-firebase-adminsdk-u5k4o-bcd6f093b9.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

app.use(express.json())
app.use(cors())
port = 3080

app.listen(port, () => {
  console.log(`puerto de server::${port}`)
})
const tienda = db.collection('BlackDiamond').doc('User')
app.get('/prueba', async(req, res) =>{
  const docUser = await tienda.get();
  const usuarios = docUser.data();
  res.json (usuarios);
  console.log(usuarios);
})
