const allowOrigin = require('./allowedOrigin')

const corsOptions = {
  origin: (origin, callback) => {
    if (allowOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Access cors tidak diberikan'))
    }
  },
  optionSuccess: 200
}
module.exports = corsOptions
