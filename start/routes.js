'use strict'


const Route = use('Route')

Route.post('users', 'UserController.store')

Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put("passwords", "ForgotPasswordController.update")


Route.group(() => {
   Route.resource("pacients", "PacientController").apiOnly()
   Route.resource("pacients.schedules", "ScheduleController").apiOnly()

}).middleware(['auth'])