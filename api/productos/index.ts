import type { IncomingMessage, ServerResponse } from 'node:http';

import { methodNotAllowed, products, sendJson } from '../_products';

export default function handler(request: IncomingMessage, response: ServerResponse): void {
  if (request.method !== 'GET') {
    methodNotAllowed(response);
    return;
  }

  sendJson(response, 200, products);
}
