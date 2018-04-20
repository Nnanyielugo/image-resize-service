import passport from 'passport';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

export const generateJWT = (user) => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    username: user.username,
    exp: parseInt(exp.getTime() / 1000)
  }, config.SECRET);
}

export const login = (req, res, next) => {
  console.log(req.body);
  if(!req.body.username){
    return res.status(422).json({errors: {error: "Username can't be blank!"}})
  }
  if(!req.body.password){
    return res.status(422).json({errors: {error: "Password can't be blank!"}})
  }

  passport.authenticate('local', {session: false}, (err, user, info)=> {
    if(err) return next(err);
   
    user.token = generateJWT(user)
    return res.json({token: user.token, username: user.username})
    
  })(req, res, next)
}