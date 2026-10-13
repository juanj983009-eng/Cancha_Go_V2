import { Product } from './product';

export interface Reservation {
  id: string;
  productoId: Product['id'];
  productoNombre: string;
  fecha: string;
  hora: string;
  precio: number;
  usuario: string;
}