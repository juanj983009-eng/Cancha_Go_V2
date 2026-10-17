import type { IncomingMessage, ServerResponse } from 'node:http';

import { methodNotAllowed, products, sendJson } from '../_products';

type VercelRequest = IncomingMessage & { query?: { id?: string | string[] } };

export default function handler(request: VercelRequest, response: ServerResponse): void {
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
}
