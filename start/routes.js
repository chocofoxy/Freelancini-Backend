'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('/create','UserController.signup')
  Route.post('/login','UserController.login')
  Route.get('/token','UserController.getToken')
}).prefix('account')

Route.group(() => {
  Route.get('/logout','UserController.logout')
  Route.get('/informations','UserController.informations')
  Route.get('/switch','UserController.switchRole')
  Route.put('/update','UserController.update')
  Route.delete('/delete','UserController.destroy')
  Route.post('/languges','UserController.addLanguge')
  Route.delete('/languges/:id','UserController.deleteLanguge')
  Route.put('/update/picture','UserController.updatePicture')
  Route.get('/contracts','UserController.contracts')
  Route.get('/contracts/accepted','UserController.acceptedContracts')
}).prefix('account').middleware('auth')

Route.group(() => {
  Route.post('/submit/:id','FreelanceController.SubmitForJob')
  Route.delete('/interview/:id','FreelanceController.deleteSubmition')
  Route.get('/contracts','FreelanceController.contracts')
  Route.get('/contract/:id','FreelanceController.contract')
  Route.get('/contract/decline/:id','FreelanceController.declineContract')
}).prefix('freelance').middleware(['auth','freelance'])

Route.group(() => {
  Route.post('/job','ClientController.addJob')
  Route.get('/jobs','ClientController.jobs')
  Route.delete('/job/:id','ClientController.deleteJob')
  Route.get('/interviews/:id','ClientController.interviews')
  Route.get('/interview/:id','ClientController.interview')
  Route.post('/contract/create','ClientController.makeContract')
}).prefix('client').middleware(['auth','client'])

Route.group(() => {
  Route.get('/countries','DetailController.countries')
  Route.get('/jobs','DetailController.jobs')
  Route.get('/job/:id','DetailController.job')
}).prefix('details')