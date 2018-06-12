import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';
import mongoose from 'mongoose'
import User from './User'

const app = express();
app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
mongoose.connect('mongodb://autofeeder:udMatai3!@ds247290.mlab.com:47290/autofeeder')

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.get('/login', (req,res) => {
  const username = req.query['username'];
  const password = req.query['password'];

  console.log(username,password)

  User.findOne({name:username,password:password}, (err, docs) => {
    if ((err)||(docs===null))
      return res.send(401, { error: err });
    console.log(docs);
    return res.send(username);
  })
})

app.post('/signup', (res, req) => {
  const newUser = new User(req.body)
  newUser.save((error) => {
    if(error)
      return res.status(500).send('error while saving to DB')

    return res.end('done')
  })
})


// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});

export default app;
