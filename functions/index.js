const functions = require('firebase-functions');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
var serviceAccount = require("./permissions.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://parking-d17d7.firebaseio.com"
});

const express = require('express');
//const cors = require('cors');
const cors = require('cors')({origin: true});
const app = express();
const db = admin.firestore();

//app.use( cors({ origin: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const userRoutes = require('./api/routes/user');



app.use((req, res, next) => {
  req.db = db;
  //console.log('Hi..');
  next();
});

app.use('/users',userRoutes);
//app.use('/transporter',transporterRoutes);




// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//       message: err.message,
//       error: {}
//   });
//   next();
// });



// app.get('/hello',function(req,res,next){
//   console.log('hi....');
//     return res.status(200).send('Hello-world!');
// next();
//  });
exports.app = functions.https.onRequest(app);