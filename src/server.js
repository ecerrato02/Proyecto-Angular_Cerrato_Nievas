const express = require ('express')
const app = express()

app.use(express.json())

port = 3080

app.listen(port, () => {
  console.log(`puerto de server::${port}`)
})
