# Cancha Go — Diseño visual «Línea de juego»

## Propósito y límites

Cancha Go pasará de una interfaz Bootstrap básica a una plataforma de reservas deportivas clara, profesional y adaptable. El trabajo es exclusivamente visual: no se modificarán servicios, modelos, guardias, rutas, autenticación, reservas, JSON Server, SSR ni reglas de negocio.

La interfaz debe comunicar con rapidez que una persona puede descubrir una cancha, conocer su disponibilidad y reservarla. El resultado debe conservar todos los flujos funcionales actuales.

## Dirección elegida

**Tesis visual.** Una señalética deportiva contemporánea guía al usuario desde la exploración hasta la reserva: espacios blancos para claridad, azul marino para estructura y verde para acciones y disponibilidad.

**Motivo de firma.** Líneas de juego sutiles —bordes rectos, divisores finos y acentos lineales inspirados en las marcas de una cancha— aparecen en el hero, cabeceras, filtros y resúmenes. No se usarán efectos de vidrio ni gradientes decorativos.

**Tipografía.** Se utilizará una pila sans-serif del sistema para evitar dependencias externas. Los titulares tendrán un peso alto, espaciado compacto y `text-wrap: balance`; los precios y cifras usarán números tabulares.

**Paleta.** Azul marino profundo para navegación y superficies de contraste; blanco y gris azulado para lectura; verde deportivo para disponibilidad y CTAs; rojo exclusivamente para errores, agotado y cancelación.

**Composición.** Inicio con hero fotográfico y estructura editorial. Catálogo con filtros en una barra y fichas de producto de altura estable. Las superficies privadas utilizarán resúmenes y listas claras, no rejillas decorativas repetidas.

**Responsive.** En móvil, el menú se convierte en un panel vertical, el hero reduce la información secundaria y las tarjetas pasan a una sola columna; filtros, formularios y acciones mantienen áreas táctiles cómodas. En tablet y escritorio se usan 2–3 columnas según el espacio disponible.

## Activos de cancha

Se crearán seis imágenes locales dentro de `public/images/canchas/`, una por disciplina: fútbol 5, fútbol 7, fútbol 11, básquet, vóley y pádel. Serán imágenes realistas de instalaciones deportivas vacías, con iluminación profesional y una composición horizontal uniforme de 16:10. Los activos se referenciarán en la presentación mediante una capa visual que relaciona cada categoría existente con su imagen; nombres, precios, stock, categorías y demás datos continuarán procediendo de `db.json` sin alteraciones.

Las imágenes tendrán dimensiones explícitas, `object-fit: cover`, carga diferida fuera del primer viewport y texto alternativo basado en el nombre existente de la cancha.

## Sistema compartido

`src/styles.css` definirá variables de color, espacios, radios, sombras, contenedores, focos visibles, controles de formulario, botones, mensajes y reducción de movimiento. Cada página conservará una hoja CSS limitada a su composición particular.

La barra de navegación separará enlaces de exploración de la zona de cuenta y ofrecerá estado activo visible. El footer contendrá marca, resumen breve, enlaces existentes e información útil sin datos inventados.

## Superficies

- **Inicio:** hero con fotografía local, propuesta, categorías, canchas destacadas, proceso de tres pasos y CTA final.
- **Productos:** encabezado editorial, filtros compactos, tarjetas de cancha consistentes, disponible/agotada inequívocos y estados de carga/error accesibles.
- **Ofertas y tienda:** misma escala tipográfica, bordes, CTA y tratamiento de precios que el catálogo.
- **Login, cuenta y contacto:** formularios legibles, etiquetas visibles, ayudas y alertas con contraste.
- **Dashboard, reserva y mis reservas:** resúmenes de información real existente, acciones visibles y estados vacíos cuidados; no se añadirán métricas ni datos inventados.
- **404:** composición sobria con código, explicación y retorno a inicio.

## Accesibilidad y calidad

Se mantendrán enlaces de navegación, botones semánticos y labels existentes. Se añadirán foco visible, contraste, `aria-live` para estados asíncronos, dimensiones para imágenes, transiciones específicas y `prefers-reduced-motion`. Se evitará `transition: all`, overflow horizontal y controles sin etiqueta.

## Validación

1. Revisar cada ruta a 375 px, 768 px, 1024 px y 1440 px.
2. Confirmar visualmente la carga local de seis imágenes, las tarjetas, filtros, formularios, estados vacíos, navbar y menú móvil.
3. Ejecutar `npm test -- --watch=false` y `npm run build`.
4. Confirmar que búsqueda, filtro, login, guardia, reserva, cancelación y SSR siguen funcionando.
