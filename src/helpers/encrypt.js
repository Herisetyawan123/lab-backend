const bcrypt = require('bcrypt')

// create encrypt password
const encrypt = {
  cryptPassword: (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
  },
  comparePassword: (password, hashPassword) => {
    const compare = bcrypt.compareSync(password, hashPassword)
    return compare
  }
}

module.exports = encrypt
