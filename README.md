# Teleprompter simple

Aplicación web estática (sin dependencias) para usar como teleprompter en grabaciones.

## Para hacerlo fácil (como para un niño)

Imagina que esto es un cartel gigante que sube solo para que puedas leer mientras grabas.

### Paso 1: Sube la carpeta a GitHub

- Crea un repositorio en GitHub.
- Sube estos archivos tal cual (`index.html`, `styles.css`, `script.js`, `config.js`, `.github/workflows/deploy-pages.yml`).

### Paso 2: Enciende la web en GitHub

- En tu repo entra a **Settings**.
- Luego entra a **Pages**.
- Donde dice **Source**, elige **GitHub Actions**.

### Paso 3: Espera un poquito

- Ve a la pestaña **Actions**.
- Espera a que termine una tarea llamada **Deploy static content to GitHub Pages** (tarda 1-3 minutos).

### Paso 4: Abre tu página

- Tu enlace será así:
  - `https://TU-USUARIO.github.io/TU-REPO/`

Si no sale a la primera, refresca con `Ctrl + F5`.

---

## Cambiar texto y velocidad sin programar

Solo abre `config.js` en GitHub, pulsa el lápiz ✏️, cambia lo que quieras y guarda.

```js
window.TELEPROMPTER_CONFIG = {
  appTitle: 'Mi Teleprompter',
  defaultText: 'Hola, hoy voy a grabar este video...',
  speed: { min: 10, max: 180, default: 45 },
  fontSize: { min: 24, max: 96, default: 52 },
  shortcuts: true
};
```

- `appTitle`: nombre que ves arriba.
- `defaultText`: texto que aparece al abrir.
- `speed.default`: qué tan rápido sube el texto.
- `fontSize.default`: tamaño de letra.

Guardas, esperas que termine **Actions**, y listo ✅.

---

## Usarlo en tu compu (muy fácil)

1. Abre `index.html` con doble click.
2. Escribe tu guion.
3. Pulsa **Iniciar**.
4. Lee y graba.

Botones importantes:
- **Iniciar/Pausar**: arranca o frena.
- **Reiniciar**: vuelve al inicio.
- **Espejo**: da vuelta horizontal.
- **Pantalla completa**: para verlo grande.

## Atajos

- `Espacio`: iniciar/pausar.
- `R`: reiniciar.
- `M`: espejo.
- `F`: pantalla completa.

## Si no aparece nada

1. Revisa que estés en la rama `main` o `master`.
2. Revisa **Actions** (si sale rojo, falló).
3. En **Settings → Pages** confirma **GitHub Actions**.
4. Espera 1-3 minutos y refresca.

## Archivos

- `index.html`: la pantalla.
- `styles.css`: colores y diseño.
- `script.js`: comportamiento de botones y scroll.
- `config.js`: tu configuración fácil.
- `.github/workflows/deploy-pages.yml`: publica la web automáticamente.
