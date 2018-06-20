import passport from 'passport';
import LocalStrategy from './localStrategy';
import AppUser from '../models/AppUserModel';

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  console.log('*** serializeUser called, user: ');

  console.log('---------');
  done(null, { _id: user._id });
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
  console.log('DeserializeUser called');
  AppUser.findOne({ _id: id }, '', (err, user) => {
    console.log('*** Deserialize user, user:');
    // console.log(user);
    console.log('--------------');
    done(null, user);
  });
});

//  Use Strategies
passport.use(LocalStrategy);

module.exports = passport;
