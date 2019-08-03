const functions = require('firebase-functions');
const express = require('express');
const firebase = require('firebase');

const app = express();

// Config Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDb-MHYH3z8wtKf-oMqevKUAZRFQ2cg6xg",
    authDomain: "polybus-gps.firebaseapp.com",
    databaseURL: "https://polybus-gps.firebaseio.com",
    projectId: "polybus-gps",
    storageBucket: "",
    messagingSenderId: "942603006584",
    appId: "1:942603006584:web:0dbbdafa56c59063"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

app.get('/home', (request, response) => {
    response.send('Hello from express');
})

app.post('/tracker/create', async (req, response) => {
    await firebase.database().ref('trackers').push({
      device_id: req.body.device_id,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    }).catch((error) => {
      console.log('Error:', error);
      return response.json({
        message: 'error',
      });
    })
    
    response.json({
        message: 'success',
    });
})


exports.app = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
