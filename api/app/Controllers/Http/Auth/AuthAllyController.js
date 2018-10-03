const User = use('App/Models/User')

class LoginController {
  async redirect ({ ally }) {
    
    await ally.driver('twitter').redirect()
  }

  async callback ({ ally, auth }) {
    try {
      const twitter = await ally.driver('twitter').getUser()

      // user details to be saved
      const userDetails = {
        email: twitter.getEmail(),
        token: twitter.getAccessToken(),
        login_source: 'twitter'
      }

      // search for existing user
      const whereClause = {
        email: twitter.getEmail()
      }

      const user = await User.findOrCreate(whereClause, userDetails)
      await auth.login(user)

      return 'Logged in'
    } catch (error) {
      return 'Unable to authenticate. Try again later'
    }
  }
}