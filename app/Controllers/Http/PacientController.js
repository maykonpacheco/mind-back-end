'use strict'

const Pacient = use('App/Models/Pacient')

class PacientController {
  
  async index ({ request, response, view }) {
    const pacients = await Pacient.query().with('user').fetch()

    return pacients

  }

  
  
  async store ({ request, response, auth }) {
    const data = request.only(['username', 'fone', 'email'])

    const pacient = await Pacient.create({...data, user_id: auth.user.id})

    return pacient
  }

  async show ({ params }) {
    const pacient = await Pacient.findOrFail(params.id)

    return pacient
  }

 
 
  async update ({ params, request }) {
    const pacient = await Pacient.findOrFail(params.id)
    const data = request.only(['username', 'fone', 'email'])

    pacient.merge(data)

    await pacient.save()

    return pacient

  }

 
  async destroy ({ params}) {
    const pacient = await Pacient.findOrFail(params.id)

    await pacient.delete()
  }
}

module.exports = PacientController
