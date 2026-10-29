# Tripleten web_project_around_full

# Around The U.S. — Full Stack

## Descripción

Aplicación web para explorar y compartir fotografías de lugares. Es la versión completa del proyecto: un front end en **React + TypeScript** y un back end en **Express + MongoDB**, juntos en un mismo repositorio. Se desarrolla como parte del programa de desarrollo web de TripleTen.

Los usuarios pueden registrarse, iniciar sesión, editar su perfil y su avatar, publicar tarjetas con fotos, dar o quitar "me gusta" y eliminar sus propias tarjetas.

## Funcionalidades

- Registro e inicio de sesión de usuarios
- Rutas protegidas: sin sesión, cualquier ruta lleva a `/signin`; con sesión, `/signin` y `/signup` llevan a `/`
- Sesión persistente: el token se guarda en `localStorage` y se valida al recargar la página
- Cierre de sesión
- Encabezado distinto para visitantes y usuarios autenticados (muestra el correo del usuario)
- Ventana informativa (`InfoTooltip`) con el resultado del registro y los errores de inicio de sesión
- Edición del perfil (nombre y descripción) y del avatar
- Creación de tarjetas; la nueva aparece primero
- "Me gusta" por usuario, con contador, guardado en el servidor
- Eliminación de tarjetas propias con ventana de confirmación
- Vista ampliada de imágenes
- Ventanas emergentes que se cierran con el botón ✖ o con un clic fuera de ellas

## Tecnologías y técnicas

**Front end (`client/`)**

- React 19 y TypeScript
- Vite como bundler y servidor de desarrollo
- React Router (`BrowserRouter`, `Routes`, `Navigate`) para rutas y redirecciones
- Context API (`CurrentUserContext`) para el estado del usuario
- Componentes controlados (`useState`) y no controlados (`useRef`)
- `fetch` con `async/await` y manejo de errores con `try...catch`
- CSS con metodología BEM
- ESLint (`typescript-eslint`, `eslint-plugin-react-hooks`) y Prettier

**Back end (`server/`)**

- Node.js con Módulos ES y Express 5
- TypeScript en modo estricto
- MongoDB y Mongoose: esquemas, validación y validador de URL con expresión regular
- Operadores `$addToSet` y `$pull` para gestionar los "me gusta" sin duplicados
- `cors` con el origen del front end configurado
- Middleware centralizado de manejo de errores
- `tsx` para recarga automática en desarrollo

**Autenticación:** el registro, el inicio de sesión y la comprobación del token usan la API de autenticación de TripleTen (solución temporal). Las tarjetas y el perfil vienen de la API propia.

## Cómo ejecutarlo

Requisitos: Node.js y MongoDB en ejecución en `mongodb://127.0.0.1:27017/aroundb`.

```bash
npm run install:all
npm run dev:server
npm run dev:client
```

| Parte              | Dirección             |
| ------------------ | --------------------- |
| API (Express)      | http://localhost:3001 |
| Aplicación (React) | http://localhost:3000 |

Cada comando de desarrollo va en su propia terminal.

## Estructura del proyecto

```
web_project_around_full/
├── client/        aplicación de React
│   └── src/
│       ├── components/   App, Header, Main, Card, Popup, Login, Register,
│       │                 ProtectedRoute, InfoTooltip, etc.
│       ├── contexts/     CurrentUserContext
│       ├── interfaces/   tipos de TypeScript por dominio
│       ├── utils/        api.ts (API propia) y auth.ts (API de autenticación)
│       └── blocks/       estilos BEM
├── server/        API de Express
│   └── src/
│       ├── controllers/  lógica de cada ruta
│       ├── models/       esquemas de Mongoose
│       ├── routes/       qué URL llega a qué controlador
│       └── middleware/   manejo de errores
└── package.json   scripts de la raíz
```

## Rutas de la API

### Usuarios

| Método | Ruta               | Qué hace                              |
| ------ | ------------------ | ------------------------------------- |
| GET    | `/users`           | Devuelve todos los usuarios           |
| GET    | `/users/me`        | Devuelve el usuario actual            |
| GET    | `/users/:id`       | Devuelve un usuario por su `_id`      |
| POST   | `/users`           | Crea un usuario                       |
| PATCH  | `/users/me`        | Actualiza el perfil (`name`, `about`) |
| PATCH  | `/users/me/avatar` | Actualiza el avatar                   |

### Tarjetas

| Método | Ruta | Qué
