'use strict'

const Task = use('Task')
const dbNotificationController = require('../Controllers/Http/DBNotificationController')

class UserSignUpNotification extends Task {
  static get schedule () {
    return '0 * */1 * * *'
  }

  async handle () {
    dbNotificationController.prototype.dbNotification;
  }
}

module.exports = UserSignUpNotification
