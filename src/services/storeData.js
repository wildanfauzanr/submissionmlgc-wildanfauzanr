const { Firestore } = require('@google-cloud/firestore');
 
async function storeData(id, data) {
  try {
    const db = new Firestore({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
    });
 
    const predictCollection = db.collection('predictions');
    await predictCollection.doc(id).set(data);
  } catch (error) {
    console.error('Firestore error:', error);
  }
}
 
async function getHistories() {
  try {
    const db = new Firestore({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
    });
 
    const predictCollection = db.collection('predictions');
    const snapshot = await predictCollection.get();
    const histories = [];
 
    if (snapshot.empty) {
      console.log('No matching documents.');
      return histories;
    }
 
    snapshot.forEach(doc => {
      histories.push({
        id: doc.id,
        history: {
          result: doc.data().result,
          createdAt: doc.data().createdAt,
          suggestion: doc.data().suggestion,
          id: doc.id
        }
      });
    });
 
    return histories;
  } catch (error) {
    console.error('Error fetching histories:', error);
    throw new Error('Failed to fetch histories');
  }
}
 
module.exports = { storeData, getHistories };