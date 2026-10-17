const { methodNotAllowed, products, sendJson } = require('../_products.cjs');

module.exports = function handler(request, response) {
  if (request.method !== 'GET') {
    methodNotAllowed(response);
    return;
  }

  const rawId = request.query?.id;
  const id = typeof rawId === 'string' && /^\d+$/.test(rawId) ? Number(rawId) : Number.NaN;
  const product = products.find((item) => item.id === id);

  if (!product) {
    sendJson(response, 404, { error: 'Cancha no encontrada.' });
    return;
  }

  sendJson(response, 200, product);
};
