const bcrypt = require('bcryptjs')

module.exports = {
  hashGenerator : function(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
  },

  compareHash : function(input, password) {
    return bcrypt.compareSync(input, password)
  }
}