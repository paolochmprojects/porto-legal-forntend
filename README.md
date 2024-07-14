# Porto legal Frontend

Desarrollado con TypeScript, Vue, Vite, Vue-Router y Pinia.

## Extensiones de VSCode

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Levantamiento de Proyecto

```sh
npm install
```

### Correr servidor de desarrollo

```sh
npm run dev
```

### Revision de tipos, compilación y optimización

```sh
npm run build
```

## Variables de Entorno

Se requiere el archivo `.env` con la variable de entorno `VITE_API_URL` para la URL del backend de la aplicación, concadenando `/api` al final, por ejemplo `http://localhost/api`. El `env.example` es un archivo de ejemplo de `.env`.
