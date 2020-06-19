const db = require('../database/dbConfig');

const getAll = () => {
    return db('users')
}

const addUser = (user) => {
    return db('users')
    .insert(user)
}
const findBy = (filter) => {
    return db('users')
    .where(filter)
}

module.exports = {
    getAll,
    addUser,
    findBy
}