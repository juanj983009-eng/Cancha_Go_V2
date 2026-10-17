# Cancha Go PC2

Aplicación Angular para consultar canchas deportivas y administrar reservas. Fue desarrollada para la PC2 / Semana 8 de JavaScript Avanzado.

## Tecnologías

- Angular 22 y TypeScript
- Bootstrap 5
- JSON Server para el catálogo REST
- LocalStorage para sesión y reservas del usuario
- SSR habilitado; las rutas que usan almacenamiento del navegador se renderizan en cliente

## Ejecución local

Instala las dependencias y levanta los dos procesos en terminales separadas:

```bash
npm install
npm run api
npm start
```

La aplicación estará disponible en `http://localhost:4200` y JSON Server en `http://localhost:3000/productos`. Durante `npm start`, Angular reenvía `/api/*` a JSON Server; por ello la interfaz y el servicio usan `/api/productos` tanto localmente como en producción.

## Catálogo en Vercel

Vercel publica funciones de solo lectura en `/api/productos` y `/api/productos/:id`. Ambas usan los mismos seis productos de `db.json`; no hay endpoints de escritura ni base de datos adicional. Las rutas Angular permanecen a cargo de SSR, mientras que el directorio `api/` se publica como funciones de Vercel.

## Cuenta de demostración

- Correo: `admin@canchago.com`
- Contraseña: `123456`

## Flujo de reserva

1. Ve a **Productos**, busca o filtra una cancha y selecciona **Reservar**.
2. Inicia sesión si aún no la tienes.
3. Escoge una fecha actual o futura y una hora disponible.
4. Confirma y consulta o cancela la reserva en **Mis reservas**.

El catálogo se consulta desde JSON Server. Las reservas se guardan en LocalStorage y se asocian al correo del usuario activo; no se simula un backend de reservas.

## Comprobaciones

```bash
npm test -- --watch=false
npm run test:api
npm run build
```

Para servir la salida SSR compilada:

```bash
npm run serve:ssr:cancha-go-pc2
```
