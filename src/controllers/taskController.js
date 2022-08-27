const Task = require('../Models/tasksModel')

exports.getTask = async (req, res) => {
  try {
    const results = await Task.find()
    res.status(200).json({
      message: 'Success',
      results
    })
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      error
    })
  }
}
