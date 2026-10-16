# Cancha Go «Línea de juego» Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Renovar visualmente Cancha Go como una plataforma de reservas deportivas profesional sin alterar su comportamiento.

**Architecture:** Un sistema CSS global definirá la identidad, controles, accesibilidad y comportamiento responsive. Las plantillas existentes conservarán sus enlaces, bindings y condiciones; las hojas por componente solo definirán composiciones locales. Los activos de cancha vivirán en `public/` y se seleccionarán visualmente a partir de las categorías ya existentes.

**Tech Stack:** Angular 22, plantillas standalone, CSS, Bootstrap existente, activos locales estáticos.

**Spec:** `docs/superpowers/specs/2026-10-12-cancha-go-linea-de-juego-design.md`

## Global Constraints

- No modificar servicios, modelos, rutas, guards, autenticación, reservas, JSON Server, SSR ni lógica de negocio.
- No añadir dependencias, Tailwind, React ni librerías de UI.
- Usar azul marino, blanco/grises suaves y verde semántico; evitar glassmorphism y gradientes decorativos.
- Mantener las imágenes locales en `public/images/canchas/` con presentación 16:10 y sin alterar `db.json`.
- Mantener contraste, foco visible, labels y comportamiento con `prefers-reduced-motion`.

## Review Focus

- Catálogo con productos agotados: mantiene CTA deshabilitado y mensaje inequívoco tras el rediseño.
- Búsqueda y filtro: siguen mostrando un estado vacío claro cuando no hay coincidencias.
- Usuario no autenticado: Login y AuthGuard conservan su navegación actual.
- Reserva existente: fecha, hora, error y confirmación conservan sus bindings y no se solapan en móvil.
- Imágenes faltantes: cada tarjeta tiene una imagen local visible, dimensiones fijas y texto alternativo.

---

### Task 1: Activos locales y base visual compartida

**Files:**
- Create: `public/images/canchas/futbol-5.webp`
- Create: `public/images/canchas/futbol-7.webp`
- Create: `public/images/canchas/futbol-11.webp`
- Create: `public/images/canchas/basquet.webp`
- Create: `public/images/canchas/voley.webp`
- Create: `public/images/canchas/padel.webp`
- Modify: `src/styles.css`
- Modify: `src/app/app.html`

**Interfaces:**
- Consumes: Las categorías existentes de `Product` y los componentes actuales.
- Produces: Variables CSS `--cg-*`, controles compartidos y rutas locales `/images/canchas/*.webp` para plantillas visuales.

- [ ] **Step 1: Generar seis imágenes realistas de instalaciones vacías, con iluminación deportiva, encuadre horizontal 16:10 y una disciplina por archivo**

- [ ] **Step 2: Verificar que los seis archivos existan y compartan proporción de presentación**

Run: `Get-ChildItem public/images/canchas`

Expected: seis archivos locales de cancha, sin URLs de `placehold.co`.

- [ ] **Step 3: Implementar variables, reset de layout, botones, formularios, foco visible, `aria-live`, contenedores y media query de movimiento reducido en `src/styles.css`**

- [ ] **Step 4: Añadir enlace de salto a contenido y ancla principal identificable en `src/app/app.html`**

- [ ] **Step 5: Verificar build de estilos y ausencia de `transition: all`**

Run: `rg -n "transition: all|outline: none|placehold\.co" src public`

Expected: sin coincidencias de estilos prohibidos ni placeholders en la presentación.

### Task 2: Navegación, footer y Home

**Files:**
- Modify: `src/app/components/navbar/navbar.html`
- Modify: `src/app/components/navbar/navbar.css`
- Modify: `src/app/components/footer/footer.html`
- Modify: `src/app/components/footer/footer.css`
- Modify: `src/app/pages/home/home.html`
- Modify: `src/app/pages/home/home.css`

**Interfaces:**
- Consumes: Router links y estado `autenticado`/`menuAbierto` existentes de Navbar.
- Produces: Navegación responsive, hero editorial y secciones visuales de inicio sin cambios de TypeScript.

- [ ] **Step 1: Preservar todos los `routerLink`, acciones y condiciones existentes al reorganizar el HTML de navbar y footer en zonas pública/privada y columnas semánticas**

- [ ] **Step 2: Aplicar el patrón de línea de juego a navegación, footer, hero, categorías, destacados, pasos y CTA, usando solo contenido que no simule datos de negocio**

- [ ] **Step 3: Implementar la transformación móvil del menú, hero y secciones de Home en sus hojas CSS**

- [ ] **Step 4: Revisar el navbar por teclado y confirmar que los enlaces existentes siguen presentes**

Run: `npm test -- --watch=false --include=src/app/components/navbar/navbar.spec.ts`

Expected: PASS.

### Task 3: Catálogo, filtros y tarjetas de cancha

**Files:**
- Modify: `src/app/pages/productos/productos.html`
- Modify: `src/app/pages/productos/productos.css`
- Modify: `src/app/components/product-list/product-list.html`
- Modify: `src/app/components/product-list/product-list.css`
- Modify: `src/app/components/product-card/product-card.html`
- Modify: `src/app/components/product-card/product-card.css`
- Test: `src/app/pages/productos/productos.spec.ts`

**Interfaces:**
- Consumes: `[productos]`, `busqueda`, `categoriaSeleccionada`, `producto.stock`, `reservar()` y sus bindings existentes.
- Produces: Tarjetas de cancha consistentes con imagen local por categoría, estado disponible/agotada y filtros accesibles.

- [ ] **Step 1: Extender la prueba de Productos para confirmar que una emisión sigue ocultando carga y representa la tarjeta sin modificar el servicio**

- [ ] **Step 2: Ejecutar la prueba dirigida y confirmar que pasa antes del rediseño de plantillas**

Run: `npm test -- --watch=false --include=src/app/pages/productos/productos.spec.ts`

Expected: PASS.

- [ ] **Step 3: Reorganizar las plantillas para encabezado, filtros y tarjeta usando la categoría actual para elegir el activo local, conservando el binding de producto y el botón de reserva**

- [ ] **Step 4: Implementar estilos de imagen 16:10, precio, disponibilidad, agotado, CTA, foco, hover y grillas de 1/2/3 columnas**

- [ ] **Step 5: Ejecutar la prueba dirigida y comprobar el estado sin resultados con una búsqueda manual**

Run: `npm test -- --watch=false --include=src/app/pages/productos/productos.spec.ts`

Expected: PASS.

### Task 4: Flujos comerciales y formularios públicos

**Files:**
- Modify: `src/app/pages/ofertas/ofertas.html`
- Modify: `src/app/pages/ofertas/ofertas.css`
- Modify: `src/app/pages/tienda/tienda.html`
- Modify: `src/app/pages/tienda/tienda.css`
- Modify: `src/app/pages/contacto/contacto.html`
- Modify: `src/app/pages/contacto/contacto.css`
- Modify: `src/app/pages/login/login.html`
- Modify: `src/app/pages/login/login.css`
- Modify: `src/app/pages/mi-cuenta/mi-cuenta.html`
- Modify: `src/app/pages/mi-cuenta/mi-cuenta.css`

**Interfaces:**
- Consumes: Los bindings de formularios, `enviarFormulario()`, `iniciarSesion()` y router links existentes.
- Produces: Superficies comerciales, formularios y estado de cuenta coherentes con el catálogo.

- [ ] **Step 1: Mantener cada `ngModel`, `name`, tipo, submit, validación y routerLink mientras se reorganizan los formularios y CTAs**

- [ ] **Step 2: Aplicar estilos específicos de ofertas, tienda, contacto, login y cuenta usando variables globales, sin añadir datos funcionales**

- [ ] **Step 3: Verificar por inspección que cada input conserva un label, type y nombre correctos y que las alertas tienen `aria-live`**

### Task 5: Superficies privadas, reserva y estados

**Files:**
- Modify: `src/app/pages/dashboard/dashboard.html`
- Modify: `src/app/pages/dashboard/dashboard.css`
- Modify: `src/app/pages/reserva/reserva.html`
- Modify: `src/app/pages/reserva/reserva.css`
- Modify: `src/app/pages/mis-reservas/mis-reservas.html`
- Modify: `src/app/pages/mis-reservas/mis-reservas.css`
- Modify: `src/app/pages/not-found/not-found.html`
- Modify: `src/app/pages/not-found/not-found.css`

**Interfaces:**
- Consumes: Señales y propiedades existentes de Dashboard, Reserva y Mis Reservas; métodos de cierre y cancelación actuales.
- Produces: Panel, resumen de reserva y listado de reservas más claros sin modificar TypeScript.

- [ ] **Step 1: Preservar interpolaciones, `@if`, `@for`, eventos y botones existentes al añadir jerarquía visual a Dashboard, Reserva, Mis Reservas y 404**

- [ ] **Step 2: Aplicar estilos responsive para resumen de cancha, fecha/hora, reservas, estado vacío y cancelación sin ocultar acciones**

- [ ] **Step 3: Ejecutar las pruebas de guardia y reserva para confirmar los flujos privados**

Run: `npm test -- --watch=false --include=src/app/guards/auth-guard.spec.ts --include=src/app/pages/reserva/reserva.spec.ts --include=src/app/pages/mis-reservas/mis-reservas.spec.ts`

Expected: PASS.

### Task 6: Validación visual, accesibilidad y regresión completa

**Files:**
- Modify: archivos de Tasks 1–5 solo si la revisión visual detecta una regresión.

**Interfaces:**
- Consumes: Aplicación estilizada y rutas existentes.
- Produces: Evidencia de responsive, accesibilidad, funcionamiento y build.

- [ ] **Step 1: Revisar a 375 px, 768 px, 1024 px y 1440 px Inicio, Productos, Reserva, Mis Reservas y Dashboard**

- [ ] **Step 2: Comprobar carga de seis imágenes, menú móvil, búsqueda, filtro, Login, AuthGuard, cancelación, estados vacío/carga/error y 404**

- [ ] **Step 3: Ejecutar la suite final**

Run: `npm test -- --watch=false`

Expected: todas las pruebas PASS.

- [ ] **Step 4: Generar producción SSR**

Run: `npm run build`

Expected: build finalizado sin errores; documentar advertencias no bloqueantes.

- [ ] **Step 5: Realizar revisión final contra la lista visual del diseño y corregir solo desviaciones CSS/HTML observadas**
