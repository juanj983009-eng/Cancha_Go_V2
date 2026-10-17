import { describe, expect, it } from 'vitest';

import productHandler from '../../api/productos/[id].js';
import productsHandler from '../../api/productos/index.js';
import database from '../../db.json';

function responseRecorder() {
  let body = '';
  const headers = new Map<string, string>();
  const response = {
    statusCode: 200,
    setHeader(name: string, value: string) { headers.set(name, value); },
    end(value = '') { body = value; }
  };

  return { response, headers, body: () => body };
}

describe('Vercel products API', () => {
  it('returns the six products for GET /api/productos', () => {
    const recorder = responseRecorder();

    productsHandler({ method: 'GET' } as never, recorder.response as never);

    expect(recorder.response.statusCode).toBe(200);
    expect(JSON.parse(recorder.body())).toHaveLength(6);
    expect(JSON.parse(recorder.body())).toEqual(database.productos);
    expect(recorder.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
  });

  it('returns one product for a valid GET /api/productos/:id', () => {
    const recorder = responseRecorder();

    productHandler({ method: 'GET', query: { id: '2' } } as never, recorder.response as never);

    expect(recorder.response.statusCode).toBe(200);
    expect(JSON.parse(recorder.body())).toMatchObject({ id: 2, categoria: 'Fútbol 7' });
  });

  it('returns 404 for an unknown or malformed product id', () => {
    const recorder = responseRecorder();

    productHandler({ method: 'GET', query: { id: '../1' } } as never, recorder.response as never);

    expect(recorder.response.statusCode).toBe(404);
  });

  it('rejects mutation methods', () => {
    const recorder = responseRecorder();

    productsHandler({ method: 'POST' } as never, recorder.response as never);

    expect(recorder.response.statusCode).toBe(405);
    expect(recorder.headers.get('Allow')).toBe('GET');
  });
});
