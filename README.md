# Teleprompter simple

Aplicación web estática (sin dependencias) para usar como teleprompter en grabaciones.

## Características

- Editor de texto integrado.
- Modo presentación con desplazamiento automático.
- Control de velocidad y tamaño de fuente.
- Efecto espejo horizontal para cámaras frontales.
- Atajos de teclado para iniciar/pausar y reiniciar.
- Botón de pantalla completa.
- Configuración plug & play desde `config.js` (sin tocar lógica).

## Configuración plug & play

Edita `config.js` para personalizar la app desde el propio repo de GitHub.

```js
window.TELEPROMPTER_CONFIG = {
  appTitle: 'Mi Teleprompter',
  defaultText: 'Mi guion inicial...',
  speed: { min: 10, max: 180, default: 45 },
  fontSize: { min: 24, max: 96, default: 52 },
  shortcuts: true
};
```

Con esto puedes cambiar título, texto por defecto, rangos y valores iniciales sin tocar `script.js`.

## Cómo usarlo (rápido)

1. Abre `index.html` en tu navegador.
2. Escribe o pega tu guion en el panel izquierdo.
3. Ajusta **Velocidad** y **Tamaño de fuente**.
4. Pulsa **Iniciar** para comenzar el desplazamiento.
5. Usa **Espejo** si grabas con cámara frontal.

## Atajos

- `Espacio`: iniciar/pausar.
- `R`: reiniciar al inicio.
- `M`: activar/desactivar espejo.
- `F`: pantalla completa.

## Probarlo en local

No requiere instalación.

### Opción A: abrir archivo directamente

- Haz doble click en `index.html`.

### Opción B: levantar servidor local recomendado

```bash
python3 -m http.server 8000
```

Luego abre: `http://localhost:8000`.

## Checklist de pruebas manuales

1. **Carga inicial**
   - Verifica que aparece el texto por defecto de `config.js` y el botón diga `Iniciar`.
2. **Scroll**
   - Pulsa `Iniciar` y confirma que el texto sube de forma continua.
   - Pulsa `Pausar` y confirma que se detiene.
3. **Velocidad**
   - Mueve el slider y valida que cambia la rapidez del scroll.
4. **Fuente**
   - Ajusta el tamaño y verifica cambio inmediato.
5. **Reiniciar**
   - Pulsa `Reiniciar` y valida que vuelve a empezar desde abajo.
6. **Espejo**
   - Activa/desactiva `Espejo` y valida inversión horizontal.
7. **Pantalla completa**
   - Pulsa `Pantalla completa` o `F` y comprueba entrada/salida del modo.
8. **Atajos**
   - Prueba `Espacio`, `R`, `M`, `F` (fuera del textarea).
9. **Responsive**
   - Reduce ancho de ventana y comprueba que el layout se adapta.

## Publicarlo en GitHub Pages

Este repositorio incluye el workflow `.github/workflows/deploy-pages.yml` para publicar automáticamente en GitHub Pages.

### Pasos en GitHub

1. Sube este código a tu repositorio.
2. Ve a **Settings → Pages**.
3. En **Build and deployment**, selecciona **Source: GitHub Actions**.
4. Haz push a la rama `main` (o `master`).
5. Ve a la pestaña **Actions** y espera a que termine `Deploy static content to GitHub Pages`.
6. Tu URL quedará así:
   - `https://TU-USUARIO.github.io/TU-REPO/`

## Si no aparece nada en GitHub Pages

1. Confirma que hiciste push a `main` o `master`.
2. Revisa en **Actions** si el workflow falló.
3. Asegúrate de que en **Settings → Pages** esté seleccionado **GitHub Actions**.
4. Espera 1-3 minutos tras el deploy (a veces tarda en propagarse).
5. Fuerza recarga del navegador (`Ctrl+F5`).

> Nota: se usan rutas relativas (`styles.css`, `config.js` y `script.js`), por lo que funciona correctamente en subruta de GitHub Pages.
