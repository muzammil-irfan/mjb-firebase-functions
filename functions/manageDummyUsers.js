const functions = require("firebase-functions");
const admin = require("firebase-admin");

const db = admin.firestore();

// Dummy data to add to the Users collection if it's empty
const dummyUsers = [
  {
    email: "user1@example.com",
    score: Math.floor(Math.random() * 100) + 1,
    userId: "user1",
  },
  {
    email: "user2@example.com",
    score: Math.floor(Math.random() * 100) + 1,
    userId: "user2",
  },
  {
    email: "user3@example.com",
    score: Math.floor(Math.random() * 100) + 1,
    userId: "user3",
  },
  {
    email: "user4@example.com",
    score: Math.floor(Math.random() * 100) + 1,
    userId: "user4",
  },
  {
    email: "user5@example.com",
    score: Math.floor(Math.random() * 100) + 1,
    userId: "user5",
  },
];

exports.manageDummyUsers = functions.https.onRequest(async (req, res) => {
  try {
    const usersCollection = db.collection("Users");
    const usersSnapshot = await usersCollection.get();

    if (usersSnapshot.empty) {
      // If the collection is empty, add dummy users
      const batch = db.batch();
      dummyUsers.forEach((user) => {
        const userRef = usersCollection.doc(user.userId);
        batch.set(userRef, user);
      });
      await batch.commit();
      res.status(200).send("Dummy users added successfully.");
    } else {
      // If the collection is not empty, update the score field for each user
      const batch = db.batch();
      usersSnapshot.forEach((doc) => {
        const userRef = usersCollection.doc(doc.id);
        const randomScore = Math.floor(Math.random() * 10) + 1;
        batch.update(userRef, {score: randomScore});
      });
      await batch.commit();
      res.status(200).send("Scores updated successfully.");
    }
  } catch (error) {
    console.error("Error managing users:", error);
    res.status(500).send("Error managing users.");
  }
});
