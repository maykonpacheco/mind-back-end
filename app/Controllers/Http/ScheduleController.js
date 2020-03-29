"use strict";

const { startOfHour, parseISO, isBefore } = require("date-fns")

const Schedule = use("App/Models/Schedule")


class ScheduleController {
  async index({ params, response, view }) {

    const schedule = await Schedule.query()
      .with("pacient_id", params.pacients_id).with('user')
      .fetch();

    return schedule;
  }

  async store({ params, request, response, auth }) {
    
    const { user_id, date } = request.body

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return response
        .status(400)
        .send({ error: { message: "Essa data já passou." } })
    }

    const data = request.only(["date", "time", "value"])
    

    const schedule = await Schedule.create({
      ...data,
      user_id: auth.user.id,
      pacient_id: params.pacients_id
    })

    return schedule
  }

  async show({ params }) {
    const schedule = await Schedule.findOrFail(params.id)

    return schedule
  }

  async update({ params, request, response }) {}

  async destroy({ params }) {
    const schedule = await Schedule.findOrFail(params.id)

    await schedule.delete()
  }
}

module.exports = ScheduleController
