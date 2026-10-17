const { methodNotAllowed, products, sendJson } = require('../_products.cjs');

module.exports = function handler(request, response) {
  if (request.method !== 'GET') {
    methodNotAllowed(response);
    return;
  }

  sendJson(response, 200, products);
};
