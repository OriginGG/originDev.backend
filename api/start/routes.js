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
Route.post('c_upload/', 'CloudinaryController.upload');
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
Route.get('emails/invite_ind', 'MailController.invite_ind')
Route.post('emails/request_custom_domain', 'MailController.request_custom_domain')

Route.get('access', 'DomainController.accessSite')

Route.get('twitch/getTwitchStreams', 'TwitchController.getTwitchStreams')
Route.get('twitch/getTwitchUserInfo', 'TwitchController.getTwitchUserInfo')
Route.get('twitch/getTwitchChannelFollowers', 'TwitchController.getTwitchChannelFollowers')
Route.get('twitch/getTwitchChannelTeams', 'TwitchController.getTwitchChannelTeams')
Route.get('youtube/getchannels', 'YouTubeController.getChannels')
Route.get('youtube/getchannelsByID', 'YouTubeController.getChannelsById')
Route.get('emails/reset_password_org', 'MailController.reset_password_org')
Route.get('emails/reset_password_ind', 'MailController.reset_password_ind')
Route.get('twitter/getTwitterUserInfo','TwitterController.getTwitterUserInfo')
Route.post('stripe/create_subscription', 'StripeController.create_subscription')
Route.post('stripe/cancel_subscription', 'StripeController.cancel_subscription')
Route.get('stripe/retrieve_plans', 'StripeController.retrieve_plans')
Route.post('user/getIndividualInformation', 'UserController.getIndividualInformation')
Route.post('user/getIndividualInformationHandle', 'UserController.getIndividualInformationHandle')

Route.get('auth/twitter','TwitterAuthorizationController.getTwitterAuthToken')
Route.get('auth/twitter/redirect', 'TwitterAuthorizationController.twitterRedirect')
Route.post('auth/twitter/data','TwitterAuthorizationController.getTwitterUserInfo')
// Route.post('stripe/create_product_and_plans', 'StripeController.create_product_and_plans')
Route.get('twitch/get-team-member','TwitchController.getTwitchTeamStream')
Route.get('dbcron','DBNotificationController.startNotifyCron')
Route.get('stopdbcron','DBNotificationController.stopNotifyCron')
Route.get('startcleanup','DatabaseCleanUp.startCleanUp')
Route.get('stopcleanup', 'DatabaseCleanUp.stopCleanUp')

Route.post('stripe/new/create_subscription', 'NewStripeController.create_subscription')
Route.post('stripe/new/cancel_subscription', 'NewStripeController.cancel_subscription')
Route.get('stripe/new/retrieve_plans', 'NewStripeController.retrieve_plans')
Route.get('stripe/new/create_customer', 'NewStripeController.create_customer')
Route.post('stripe/new2/create_subscription', 'NewStripeController2.create_subscription')
Route.post('stripe/new2/cancel_subscription', 'NewStripeController2.cancel_subscription')
Route.post('stripe/new2/trial_expired', 'NewStripeController2.trial_expired')
Route.get('stripe/new2/retrieve_plans', 'NewStripeController2.retrieve_plans')
Route.get('stripe/new2/retrieve_coupon', 'NewStripeController2.retrieve_coupon')
Route.post('stripe/new2/create_customer', 'NewStripeController2.create_customer')
Route.get('stripe/new2/retrieve_customer', 'NewStripeController2.retrieve_customer')
Route.post('stripe/new2/update_customer', 'NewStripeController2.update_customer')
Route.post('stripe/new2/update_subscription', 'NewStripeController2.update_subscription')
Route.post('stripe/new2/delete_subscription', 'NewStripeController2.delete_subscription')
