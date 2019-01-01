'use strict'

const Task = use('Task')
const dbNotificationController = require('../Controllers/Http/DBNotificationController')

class UserSignUpNotification extends Task {
  static get schedule () {
    return '0 7 */1 * * *'
  }

  async handle () {
    this.info('this is working');
    dbNotificationController.prototype.dbNotification();
  }
}

module.exports = UserSignUpNotification
