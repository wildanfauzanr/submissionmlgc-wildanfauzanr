const predictClassification = require('../services/inferenceService');
const storeData = require('../services/storeData').storeData;
const crypto = require('crypto');
const { InputError } = require('@hapi/boom');

async function postPredictHandler(request, h) {
  console.log('Payload received:', request.payload);
  const { image } = request.payload;

  if (!image || !Buffer.isBuffer(image)) {
    throw new InputError('Invalid image format');
  }

  const { model } = request.server.app;
  const { confidenceScore, label, suggestion } = await predictClassification(model, image);

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    result: label,
    suggestion,
    createdAt
  };

  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data: {
      id,
      result: label,
      suggestion,
      createdAt
    }
  });
  response.code(201);
  return response;
}

module.exports = postPredictHandler;