import database from '../db.json';

export const products = database.productos;

export function sendJson(response: { statusCode: number; setHeader(name: string, value: string): void; end(body?: string): void }, statusCode: number, body: unknown): void {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300');
  response.end(JSON.stringify(body));
}

export function methodNotAllowed(response: { statusCode: number; setHeader(name: string, value: string): void; end(body?: string): void }): void {
  response.setHeader('Allow', 'GET');
  sendJson(response, 405, { error: 'Método no permitido.' });
}
