/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
admin.initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.manageDummyUsers = require("./manageDummyUsers").manageDummyUsers;

exports.updateScoresToZero = require("./updateScoresToZero").updateScoresToZero;

exports.scheduledUpdateScoresToZero =
  require("./updateScoresToZero").scheduledUpdateScoresToZero;

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// Example: Scheduled Function
// exports.scheduledFunctionTest = functions.pubsub
//   .schedule("1 * 3 6 *")
//   .onRun((context) => {
//     console.log(`This will run every hour at the 1st minute
//                    on the 3rd of June!`);
//     return null;
//   });

// Example: Scheduled Function
// exports.scheduledFunctionTest = functions.pubsub
//     .schedule("every 1 minutes")
//     .onRun((context) => {
//       console.log("This will run every minute!");
//       return null;
//     });
