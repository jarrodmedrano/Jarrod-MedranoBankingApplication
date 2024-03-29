const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");

const url = "mongodb://localhost:27017";
let db = null;

// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  console.log("Connected successfully to db server");
  mongoose.connect(url, { useNewUrlParser: true });

  // connect to myproject database
  db = client.db("myproject");
});

// async function main() {
//   try {
//     console.log("the client", client);
//     db = client.db("myproject");

//     console.log("Connected successfully to db server");
//   } catch (err) {
//     console.log("there was an error", err);
//   }
// }

// main();

// create user account using the collection.insertOne function
function create(newUser) {
  // TODO: populate this function based off the video
  return new Promise((resolve, reject) => {
    const user = db
      .collection("users")
      .insertOne(newUser)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));
  });
}

// find user account
function find(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({ email: email })
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
}

// find user account
function findOne(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .findOne({ email: email })
      .then((doc) => resolve(doc))
      .catch((err) => reject(err));
  });
}

// update - deposit/withdraw amount
function update(email, amount) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .findOneAndUpdate(
        { email: email },
        { $inc: { balance: amount } },
        { returnOriginal: false },
        function (err, documents) {
          err ? reject(err) : resolve(documents);
        }
      );
  });
}

// return all users by using the collection.find method
async function all() {
  // TODO: populate this function based off the video
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find()
      .toArray()
      .then((results) => {
        console.log(results);
        resolve(results);
      })
      .catch((error) => console.error(error));
  });
}

module.exports = { create, findOne, find, update, all };
