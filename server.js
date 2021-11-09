require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())

const start = async () => {
  try {
    mongoose
      .connect(process.env.DATABASE_URL)
      .then(() => console.log('Connected to the db'))
      .catch((err) => console.log(err))
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server Started.')
    })
  } catch (err) {
    console.log(err)
  }
}
start()
