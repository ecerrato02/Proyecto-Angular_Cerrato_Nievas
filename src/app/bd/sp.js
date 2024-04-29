const express = require('express');
const app = express();
const cors = require('cors');
const port = 3020;
const bodyParser = require('body-parser');
const fs = require('node:fs');

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log(`Puerto del servidor: ${port}`);
});
app.use(cors());
const {crearConfigBaseDades} = require('./db.config');
const baseDades = crearConfigBaseDades();
const {initModels} = require( "../../../models/init-models");
const bdd = initModels(baseDades);

app.get('/historial_pedidos', async (req, res) => {
  let prueba = await bdd.pedidos.findAll();
  console.log(prueba)
})

app.post('/afegirProducte', async(req, res) => {
   await bdd.productos.create({productNameUrl: req.body.productNameUrl, fotoProducto: req.body.fotoProducto, nombreProducto: req.body.nombreProducto, descripcionProducto: req.body.descripcionProducto, descripcionLargaProducto: req.body.descripcionLargaProducto, categoriaProducto: req.body.categoriaProducto, precioProducto: req.body.precioProducto, descuentoProducto: req.body.descuentoProducto, porcentajeDescuentoProducto: req.body.porcentajeDescuentoProducto, soMinimoProducto: req.body.soMinimoProducto, procesadorMinimoProducto: req.body.procesadorMinimoProducto, memoriaMinimoProducto: req.body.memoriaMinimoProducto, graficosMinimoProducto: req.body.graficosMinimoProducto, hardwareRecomendadoProducto: req.body.hardwareRecomendadoProducto, steamProducto: req.body.steamProducto, ubisoftProducto: req.body.ubisoftProducto, switchProducto: req.body.switchProducto, xboxProducto: req.body.xboxProducto, ps4Producto: req.body.ps4Producto, ps5Producto: req.body.ps5Producto, soRecomendadoProducto: req.body.soRecomendadoProducto, procesadorRecomendadoProducto: req.body.procesadorRecomendadoProducto, memoriaRecomendadoProducto: req.body.memoriaRecomendadoProducto, graficosRecomendadoProducto: req.body.graficosRecomendadoProducto, videoProducto: req.body.videoProducto, stock: req.body.stock});
   console.log("Producto añadido")
})

app.get('/afegirComanda' ,async (req, res) => {

})

app.get('/llistatProductes', async(req, res) => {
  let resultados = await bdd.productos.findAll();
  res.json(resultados)
})


const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('image'), (req, res) => {
  fs.rename(req.file.path, '.\\src\\assets\\Imagenes' + req.file.filename, function(err) {
    if (err) throw err;
    console.log('Imagen guardada en la carpeta deseada');
  });

  res.send('Imagen recibida y guardada');
});
