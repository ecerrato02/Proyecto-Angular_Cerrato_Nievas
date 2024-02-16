const express = require ('express')
const app = express()
const cors = require('cors');
const { getFirestore} = require('firebase-admin/firestore');
const admin =  require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(require("..\\proyectolea-138e0-firebase-adminsdk-u5k4o-bcd6f093b9.json"))
});

const db = getFirestore();

app.use(express.json())
app.use(cors())
port = 3080

app.listen(port, () => {
  console.log(`puerto de server::${port}`)
})
const tienda = db.collection('BlackDiamond')
app.get('/prueba', async(req, res) =>{
  const nombre =  req.body.nombre
  const docUser = await tienda.get();
  let userFinder = await tienda.where(docUser, "==", nombre).get()
  if(userFinder.empty){
    res.json(true)

  }else{
    res.json(false)}
})

  app.post('/prueba2', async (req, res) =>{
  const nombre =  req.body.nombre
  const email =  req.body.email
  const contra = req.body.contra
  const tiendas= tienda.doc(nombre)
    let userFinder = await tienda.where("nombre", "==", nombre).get()
    let emailFinder = await tienda.where("email", "==", email).get()
    if(userFinder.empty){
      if (emailFinder.empty) {
        await tiendas.set({
          nombre: nombre,
          email: email,
          contraseña: contra
        })
      }
      res.json("true")
    }else{
      console.log("Un usuario se ha intentado conectar con un nombre ya existente")
      res.json("false")
    }
})
