const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const { hashSync, compareSync } = require('bcryptjs');

class Database {
  constructor() {
    this.database = low(adapter);
    this.database.defaults({ users: [] }).write();
  }

  getAllUsernames() {
    return this.database
      .get('users')
      .map(user => user.username)
      .values();
  }

  createUser(user) {
    const users = this.database.get('users');
    const foundUser = users.find({ username: user.username }).value();
    if (foundUser) {
      throw `User with username ${user.username} already exists`;
    }
    user.password = hashSync(user.password, 8);
    this.database
      .get('users')
      .push(user)
      .write();
  }

  authenticate(user) {
    const comparate = this.database
      .get('users')
      .find({ username: user.username })
      .value();
    if (comparate) {
      return compareSync(user.password, comparate.password);
    }
    return false;
  }
}

module.exports = new Database();
