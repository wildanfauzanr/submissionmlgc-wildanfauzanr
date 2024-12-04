const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
 
async function predictClassification(model, image) {
  try {
    if (!Buffer.isBuffer(image)) {
      throw new Error('Image must be a buffer');
    }

    console.log('Processing image:', image);
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    tensor.print();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = score[0] * 100;
    
    let label;
    if (confidenceScore > 50) {
      label = 'Cancer';
    } else {
      label = 'Non-cancer';
    }

    let suggestion;
    if (label === 'Cancer') {
      suggestion = "Segera periksa ke dokter!";
    } else {
      suggestion = "Penyakit kanker tidak terdeteksi.";
    }

    return { confidenceScore, label, suggestion };
  } catch(error) {
    console.error('Error details:', error);
    throw new InputError(`Terjadi kesalahan dalam melakukan prediksi`);
  }
}
 
module.exports = predictClassification;