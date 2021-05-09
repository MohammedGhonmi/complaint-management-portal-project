const ROLE = require('../role')

// check if the view is for the admin of th customer
function canViewComplaint(user, userId) {
  return (
    user.role === ROLE.ADMIN ||
    userId == user._id
  )
}

module.exports = canViewComplaint
