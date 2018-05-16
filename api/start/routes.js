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
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', 'DomainController.accessSite')
Route.post('upload/:folder', 'FileController.upload')
Route.get('login/facebook', 'LoginController.redirect')
Route.get('facebook/callback', 'LoginController.callback')
Route.get('domain/create_domain_token', 'DomainController.createdomaintoken')
Route.get('domain/domains', 'DomainController.getdomaintokens')
Route.get('domain/domains/:id', 'DomainController.getdomaintokensingle')
Route.post('domain/domains', 'DomainController.createdomaintokensingle')
Route.put('domain/domains/:id', 'DomainController.updatedomaintokensingle')
Route.delete('domain/domains/:id', 'DomainController.deletedomaintokensingle')
Route.get('domain/get_domain_txt_record', 'DomainController.getDomainTXTRecord')
Route.get('emails/signup', 'MailController.signup')
Route.get('access', 'DomainController.accessSite')
Route.get('twitch/getTwitchUserInfo', 'TwitchController.getTwitchUserInfo')
Route.get('twitch/getTwitchChannelFollowers', 'TwitchController.getTwitchChannelFollowers')
Route.get('twitch/getTwitchChannelTeams', 'TwitchController.getTwitchChannelTeams')


