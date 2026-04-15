# Teleprompter simple

Aplicación web estática (sin dependencias) para usar como teleprompter en grabaciones.

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
