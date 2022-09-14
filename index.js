const express = require('express')
const bodyParser = require('body-parser')

const userRoute = require('./routes/userRoutes')

const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: false }))

userRoute(app)

app.get('/', (req, res) => res.send('bd cantores negros'))

app.listen(port, () => console.log('API rodando na porta 5000'))