const functions = require("firebase-functions");
const admin = require("firebase-admin");

const db = admin.firestore();

// This function will be used in
// endpoint for dev testing and schedule for production
const updateScores = async (req, res) => {
  try {
    const usersCollection = db.collection("Users");
    const usersSnapshot = await usersCollection.get();

    if (usersSnapshot.empty) {
      console.log("No users found.");
      if (res) res.status(200).send("No users found.");
      return;
    }

    const batch = db.batch();

    usersSnapshot.forEach((doc) => {
      const user = doc.data();
      if (Object.prototype.hasOwnProperty.call(user, "score")) {
        const userRef = usersCollection.doc(doc.id);
        batch.update(userRef, {score: 0});
      } else {
        console.log(`User with email ${user.email} does not contain score.`);
      }
    });

    await batch.commit();
    if (res) res.status(200).send("Scores updated successfully.");
  } catch (error) {
    console.error("Error updating scores:", error);
    if (res) res.status(500).send("Error updating scores.");
  }
};

exports.updateScoresToZero = functions.https.onRequest(updateScores);

exports.scheduledUpdateScoresToZero = functions.pubsub
    .schedule("1 0 1 * *")
    .timeZone("America/Los_Angeles") // Adjust to your preferred timezone
    .onRun((context) => {
      return updateScores();
    });
