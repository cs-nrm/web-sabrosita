# Medios Federales (Equativ / Smart AdServer) — APAGADO

> **Estado: comentado, no borrado.** Si hiciste pull y no ves anuncios de Medios
> Federales, es a propósito. Este documento dice qué hace ese código, dónde está
> comentado y cómo volver a encenderlo.

## Por qué está apagado

El recuadro de Medios Federales ocupaba el mismo hueco de las notas que
ShowHeroes/Exte. Se decidió regresar ShowHeroes/Exte y apagar Medios Federales
mientras se define dónde colocarlo. No está descartado: el código está entero y
probado, solo desconectado.

## Qué hace cuando está encendido

Pide un video programático a Equativ (red 4308) y lo pinta en un recuadro
flotante abajo a la izquierda, con una X para cerrarlo. El recuadro solo se ve
cuando llega creativo de verdad; si no llega, se queda invisible y sin capturar
clics.

Datos de Sabrosita:

| | |
|---|---|
| red | 4308 |
| siteId | 794552 |
| pageId | 2249307 |
| formato | 111268 ("Inline", plantilla video-read) |
| schain | `1.0,1!mediosfederales.com,794552,1,sabrositadigital,sabrositadigital.mx` |

Las líneas de `ads.txt` de Medios Federales **siguen puestas** en
`public/ads.txt`. No se tocaron: son declaraciones de vendedores, no etiquetas,
y quitarlas desautorizaría demanda.

## Dónde está comentado

| archivo | qué se comentó |
|---|---|
| `src/components/BaseHead.astro` | el import y `<SmartMediosFederales />` del head |
| `src/pages/index.astro` | el import y `<SmartInline />` |
| `src/pages/*/[slug].astro` (14 plantillas de nota) | el import y `<SmartInline />` |

Los componentes siguen en su sitio y funcionan:

- `src/components/head/SmartMediosFederales.astro` — carga `smart.js`, hace el
  `setup`, pide el anuncio y lo pinta.
- `src/components/SmartInline.astro` — el recuadro flotante y su CSS.

En las plantillas se usó `{/* */}` a propósito, no `<!-- -->`: el comentario de
Astro no llega al HTML publicado, el de HTML sí. Medios Federales revisa el HTML
con grep, y un `<!-- -->` les aparecería como si el código siguiera ahí.

## Cómo volver a encenderlo

1. Descomentar import y uso en `BaseHead.astro`.
2. Descomentar import y uso de `SmartInline` en las páginas donde deba salir.
   **No tiene que ser en todas**: el código solo pide anuncio donde existe el
   contenedor, así que agregarlo solo a las páginas que lo vayan a mostrar es lo
   correcto y evita pedir pujas que nunca se pintan.
3. Decidir el choque con ShowHeroes/Exte. Si se quedan los dos en las notas hay
   que moverle el sitio a uno, o quitar el otro, que es lo que había antes.

## Trampas, para no volver a tropezar

Todo esto se descubrió midiendo. No son suposiciones.

- **El contenedor no puede ir `display:none` mientras no hay anuncio.** La
  plantilla video-read mide el ancho del div para dimensionarse; oculto mide 0 y
  el video nunca se despliega. Por eso el recuadro vive transparente y con
  `pointer-events:none` hasta que hay creativo.
- **No sirve contar hijos del div para saber si hay anuncio.** Smart siempre mete
  sus `<script>` y un contenedor de 1px, haya video o no. Lo que distingue un
  creativo real es el alto: desplegado mide ~162px. Por eso se usa un
  `ResizeObserver` con umbral de 20px, y el toggle va en los dos sentidos: al
  terminar el video la plantilla vacía el div y el recuadro debe desaparecer.
- **El id va con I mayúscula**, idéntico en los tres lugares: el `tagId` del
  formato, el `<div id="Inline">` y la llamada de render. Los ids de HTML
  distinguen mayúsculas.
- **Con `renderMode: 2` hacen falta dos llamadas de render.** La que lleva el tag
  solo lo marca como pendiente; la que va sin argumentos es la que libera la
  cola. Sin la segunda, la petición no sale hasta que vence `renderModeTimeout`:
  medido en vivo, 5004 ms exactos de espera muerta.
- **`astro:page-load` se dispara con el evento `load`, no con
  `DOMContentLoaded`.** El `load` espera a todas las imágenes y a las otras redes
  de anuncios. Medido en vivo en una nota con caché fría: `DOMContentLoaded` a
  691 ms y `load` a 9547 ms, por culpa de sunmedia, tremorhub, richaudience y
  videoplaza. Por eso el código se registra en `DOMContentLoaded` para la carga
  directa y en `astro:page-load` para las navegaciones del ClientRouter, con un
  `WeakSet` que evita pedir dos veces por el mismo contenedor.
- **`ResizeObserver` no funciona en el navegador interno de Claude.** Un div que
  pasa de 100 a 400 px no dispara ni una vez. Si vas a comprobar que el recuadro
  aparece, hazlo en Chrome o no verás nada aunque esté bien.

## Pendiente con Medios Federales

Cuando se apagó, el video de KIA (inserción 13456937) **nunca llegó a verse**.
Equativ casa la inserción con Sabrosita —el `insid` viene en la petición— y
después la descarta al servir: devuelve `noad`. Se descartó que fuera el dominio,
el código o un tope de frecuencia; se comprobó en los dominios reales de los
cuatro sitios y solo se sirve en StereoCien (siteId 794551).

**La pregunta para Medios Federales sigue abierta:** por qué `nshow` descarta la
inserción 13456937 en el siteId 794552 cuando sí la sirve en el 794551. Si se
vuelve a encender esto sin resolver eso, el recuadro va a seguir sin aparecer.
