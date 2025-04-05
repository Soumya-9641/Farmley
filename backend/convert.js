// import-json-to-mongo.js
const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = "mongodb+srv://soumya-9641:soumya@cluster0.y7qxfvq.mongodb.net";
const dbName = "Farmley";
const collectionName = "products";
const filePath = "./farmley.products.json";

function cleanDocument(doc) {
  if (Array.isArray(doc)) {
    return doc.map(cleanDocument);
  } else if (doc && typeof doc === 'object') {
    const newDoc = {};
    for (const key in doc) {
      if (key === '$oid') {
        return doc[key]; // return the string value inside $oid
      } else if (doc[key] && typeof doc[key] === 'object') {
        newDoc[key] = cleanDocument(doc[key]);
      } else {
        newDoc[key] = doc[key];
      }
    }
    return newDoc;
  }
  return doc;
}

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const rawJson = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const cleanedData = cleanDocument(rawJson);

    const result = await collection.insertMany(cleanedData);
    console.log(`${result.insertedCount} documents inserted.`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();