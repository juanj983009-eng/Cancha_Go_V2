import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [

  {
    path: 'productos',
    renderMode: RenderMode.Client
  },

  {
    path: 'login',
    renderMode: RenderMode.Client
  },

  {
    path: 'dashboard',
    renderMode: RenderMode.Client
  },

  {
    path: 'reserva/:id',
    renderMode: RenderMode.Client
  },

  {
    path: 'mis-reservas',
    renderMode: RenderMode.Client
  },

  {
    path: '**',
    renderMode: RenderMode.Server
  }

];
