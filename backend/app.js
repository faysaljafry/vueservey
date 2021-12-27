// import('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import express from 'express';
import mongo from 'mongodb';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
//cors Requirement and fixation
import cors from 'cors';
import path from 'path';
// import { throws } from'assert');
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
//Importing Controller
import UsersController from './controllers/UserController.js';
//Connection string to MongoDB
const uri =
  'mongodb+srv://faysaljafry:faisal0341!@vuejs.yelyi.mongodb.net/CubeSurvey?retryWrites=true&w=majority';
// const MongoClient = mongo.MongoClient;
// var client;
// var mongoClient = new MongoClient(uri, {
//   useNewUrlParser: true,
// });
// mongoClient.connect((err, db) => {
//   if (err != null) {
//     //console.log(err);
//     return;
//   }
//   client = db;
// });

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log('Database connection established');
  })
  .catch((err) => {
    console.error(`ERROR: ${err}`);
  });

const client = mongoose.connection;
// create our express app
const app = express();
// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions)); // Use this after the variable declaration
//Adding following code to App.js will enable the system to serve on
//Static Ports. This will help heroku to serve pages easily

// app.use(express.static(path.join(__dirname, './dist')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, './dist', 'index.html'));
// });

//Constants;'

const users = new UsersController();
// routes
app.get('/', (req, res) => {
  res.send('Express Server for Survey Application');
});
//Route for Admin Login
app.post('/adminLogin', (req, res) => {
  const EMAIL = 'faysaljafry@gmail.com';
  const PASSWORD = '123456';
  //console.log('The Body is', req.body);
  const { email, password } = req.body;
  if (email === EMAIL && password === PASSWORD) {
    const user = {
      id: 1,
      name: 'Muhammad Faisal',
      email: 'faysaljafry@gmail.com',
      isAuthenticated: true,
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    res.json({
      token,
      user,
    });
  } else {
    res.status(403);
    res.json({
      message: 'Wrong Login Information',
    });
  }
});
app.post('/userLogin', users.login);
app.post('/userRegister', users.signup);

app.post('/updateSurvey', (req, res) => {
  //console.log('In data Update function');
  //console.log('the id is:' + req.body._id);
  const SurveyToModify = client.collection('Forms');
  let { _id, ...body } = req.body;
  SurveyToModify.updateOne({ _id }, { $set: body }, function (err, result) {
    if (err) {
      //console.log(err);
      res.send('400');
      return;
    }
    res.send(result);
  });
});

app.get('/getForms', (req, res) => {
  //console.log('In the get Forms Function');
  const collection = client.collection('Forms');
  collection.find().toArray(function (err, results) {
    if (err) {
      //console.log(err);
      res.send('403');
      return;
    }
    res.send(results);
  });
});
app.post('/saveform', (req, res) => {
  id = new mongo.ObjectId();
  //console.log(id);
  const collection = client.db('CubeSurvey').collection('Forms');
  collection.insertOne({ _id: id, ...req.body }, function (err, result) {
    if (err) {
      //console.log(err);
      res.send('400');
      return;
    }
    //console.log('result is', result);
    // res.json(result);
    res.send(result);
  });
});
const port = process.env.PORT || 3000;
//start server
app.listen(port, () => {
  //console.log(`listeniing at port: ${port}`);
});
