import AppUser from '../models/AppUser';
import LocalStrategy from 'passport-local';

const strategy = new LocalStrategy(
  {
    usernameField: 'emailid' // not necessary, DEFAULT
  },
  function(emailid, password, done) {
    AppUser.findOne({ emailid: emailid }, (err, user) => {
      console.log(user);
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      if (user.active === false) {
        return done(null, false, {
          message:
            'Please activate you account by clicking the confirmation link sent to your emailid ' +
            user.emailid
        });
      }

      if (!user.checkPassword(password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    });
  }
);

module.exports = strategy;
