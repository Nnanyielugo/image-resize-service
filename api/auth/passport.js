import passport from 'passport';
import { Strategy } from 'passport-local';

// login
passport.use(new Strategy({
  usernameField: 'username',
  passwordField: 'password'
}, (username, password, done) => {
  const user = {
    username: username,
    password: password
  }
  return done(null, user)
}))