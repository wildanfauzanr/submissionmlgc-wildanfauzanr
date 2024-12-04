const { Firestore } = require('@google-cloud/firestore');
 
async function storeData(id, data) {
  try {
    const db = new Firestore({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
    });
 
    const predictCollection = db.collection('prediction');
    await predictCollection.doc(id).set(data);
  } catch (error) {
    console.error('Firestore error:', error);
  }
}
 
module.exports = storeData;