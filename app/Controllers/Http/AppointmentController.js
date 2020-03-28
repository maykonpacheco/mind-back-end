"use strict";

const { startOfHour, parseISO, isBefore } = require("date-fns")

const Appointment = use("App/Models/Appointment")


class AppointmentController {
  async index({ request, response, view }) {
    const appointments = await Appointment.query()
      .with("user").orderBy('date')
      .fetch();

    return appointments;
  }

  async store({ request, response, auth }) {
    const { user_id, date } = request.body

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return response
        .status(400)
        .send({ error: { message: "Essa data já passou." } })
    }

    /*
    const checkAvailabiluty = await Appointment.query()
      .with(user_id, date = hourStart )
      .fetch();

    const checkAvailabiluty = await Appointment.findOne({
      where: {
        user_id,
        date: hourStart,
      },
    })

    if (checkAvailabiluty) {
      return response
        .status(400)
        .send({ error: { message: "Essa data não está disponível." } })
    }

    */



    const data = request.only(["date", "time"])
    

    const appointment = await Appointment.create({
      ...data,
      user_id: auth.user.id
    })

    return appointment
  }

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = AppointmentController
