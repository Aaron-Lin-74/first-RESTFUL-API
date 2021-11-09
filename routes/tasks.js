const express = require('express')
const router = express.Router()
const Task = require('../models/tasks')

// getting all
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  } catch (err) {
    // there is an error in the server
    res.status(500).json({ message: err.message })
  }
})

// getting one
router.get('/:id', getTask, (req, res) => {
  res.json(res.task)
})

// creating one
router.post('/', async (req, res) => {
  const task = new Task({
    name: req.body.name,
    completed: req.body.completed,
  })
  try {
    const newTask = await task.save()

    // successfully created, better than just send 200
    res.status(201).json(newTask)
  } catch (err) {
    // the data user provided is not valid
    res.status(400).json({ message: err.message })
  }
})

// updating one
router.patch('/:id', getTask, async (req, res) => {
  if (req.body.name != null) {
    res.task.name = req.body.name
  }
  if (req.body.completed != null) {
    res.task.completed = req.body.completed
  }
  try {
    const updatedTask = await res.task.save()
    res.json(updatedTask)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// deleting one
router.delete('/:id', getTask, async (req, res) => {
  try {
    await res.task.remove()
    res.json({ message: 'Deleted task' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// create a middleware to handle the find task by id
async function getTask(req, res, next) {
  try {
    task = await Task.findById(req.params.id)
    if (task == null) {
      // could not find it
      return res.status(404).json({ message: 'Could not find the task' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.task = task
  next()
}
module.exports = router
