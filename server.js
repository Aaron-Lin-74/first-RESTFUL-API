require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())

const taskRouter = require('./routes/tasks')
app.use('/tasks', taskRouter)

const start = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL)

    app.listen(process.env.PORT || 3000, () => {
      console.log('Server Started.')
    })
  } catch (err) {
    console.log(err)
  }
}
start()
