import { Routes } from '@angular/router';

import { Contacto } from './pages/contacto/contacto';
import { Dashboard } from './pages/dashboard/dashboard';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { MiCuenta } from './pages/mi-cuenta/mi-cuenta';
import { MisReservas } from './pages/mis-reservas/mis-reservas';
import { NotFound } from './pages/not-found/not-found';
import { Ofertas } from './pages/ofertas/ofertas';
import { Productos } from './pages/productos/productos';
import { Reserva } from './pages/reserva/reserva';
import { Tienda } from './pages/tienda/tienda';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'productos',
    component: Productos
  },

  {
    path: 'ofertas',
    component: Ofertas
  },

  {
    path: 'tienda',
    component: Tienda
  },

  {
    path: 'contacto',
    component: Contacto
  },

  {
    path: 'mi-cuenta',
    component: MiCuenta
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'reserva/:id',
    component: Reserva,
    canActivate: [authGuard]
  },

  {
    path: 'mis-reservas',
    component: MisReservas,
    canActivate: [authGuard]
  },

  {
    path: '**',
    component: NotFound
  }

];