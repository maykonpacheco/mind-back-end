'use strict'

const Model = use('Model')

class Pacient extends Model {
    user() {
        return this.belongsTo('App/Models/User')
    }

    schedule() {
        return this.belongsTo('App/Models/Schedule')
    }
}

module.exports = Pacient
