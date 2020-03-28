'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Schedule extends Model {
    user() {
        return this.belongsTo('App/Models/User')
    }

    pacient () {
        return this.belongsTo('App/Models/Pacient')
    }
}

module.exports = Schedule
