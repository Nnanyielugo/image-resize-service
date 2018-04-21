import jwt from 'express-jwt'
import { config } from '../../config/config';

// decode jwt
function getTokenFromHeader(req){
  if(req.headers.authorization && req.headers.authorization.split(' '[0] === 'Bearer')){
    return req.headers.authorization.split(' ')[1]
    }
  return null;
}

export const auth = {
  required: jwt({
    secret: config.SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeader
  })
}