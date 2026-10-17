const database = require('../db.json');

const products = database.productos;

function sendJson(response, statusCode, body) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300');
  response.end(JSON.stringify(body));
}

function methodNotAllowed(response) {
  response.setHeader('Allow', 'GET');
  sendJson(response, 405, { error: 'Método no permitido.' });
}

module.exports = { products, sendJson, methodNotAllowed };
