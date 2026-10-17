import { routes } from './app.routes';
import { Productos } from './pages/productos/productos';
import { NotFound } from './pages/not-found/not-found';

describe('SPA routes', () => {
  it('loads the product catalogue through the Angular router', () => {
    expect(routes.find(route => route.path === 'productos')?.component).toBe(Productos);
  });

  it('preserves the Angular 404 page as the final fallback', () => {
    expect(routes.at(-1)).toMatchObject({ path: '**', component: NotFound });
  });
});
