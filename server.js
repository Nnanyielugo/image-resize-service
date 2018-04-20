import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import methods from 'methods';
import methodOverride from 'method-override';

import api from './api/routes/index';
import './api/auth/passport';

const isProduction = process.env.NODE_ENV === 'production';


const app = express();

if(process.env.NODE_ENV !== 'test'){app.use(logger('dev'));}
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());
app.use('/api', api);

// app.get('*', (req, res) => {
//   res.send("Hello fuckers!")
// })

// error handlers
app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 404;
  next(error);
});

// development error handler
if(!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error : {
      message: err.message
    }
  });
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Server started...\nListening on port ${server.address().port}`)
})

export default app;