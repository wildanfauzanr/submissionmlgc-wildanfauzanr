const { getHistories } = require('../services/storeData');

async function getHistoriesHandler(request, h) {
  try {
    const histories = await getHistories();
    return h.response({
      status: 'success',
      data: histories
    }).code(200);
  } catch (error) {
    return h.response({
      status: 'fail',
      message: error.message
    }).code(500);
  }
}

module.exports = getHistoriesHandler; 