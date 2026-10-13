import { RenderMode } from '@angular/ssr';

import { serverRoutes } from './app.routes.server';

describe('serverRoutes', () => {
  it('renders the browser-loaded product catalogue on the client', () => {
    const productsRoute = serverRoutes.find(route => route.path === 'productos');

    expect(productsRoute?.renderMode).toBe(RenderMode.Client);
  });
});
