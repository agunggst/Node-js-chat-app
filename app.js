require('dotenv').config()
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static("public"))

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

const routes = require('./routes')
app.use(routes)

app.listen(PORT, () => {
  console.log('listening on port: ', PORT)
})