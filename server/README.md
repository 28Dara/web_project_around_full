# Around The U.S. — API REST con Express y MongoDB

## Descripción

Servidor back end para el proyecto "Alrededor de los EE. UU.", construido con **Node.js**, **Express** y **TypeScript**, y conectado a una base de datos **MongoDB** mediante **Mongoose**. Gestiona usuarios y tarjetas de fotos: crear, consultar, actualizar, borrar y dar o quitar "me gusta". Se desarrolla como parte del programa de desarrollo web de TripleTen.

## Tecnologías y técnicas

- Node.js con Módulos ES (`"type": "module"`)
- Express 5 (los errores de funciones `async` llegan solos al manejador de errores)
- TypeScript con modo estricto y compilación con `tsc`
- MongoDB y Mongoose: esquemas, modelos, validación de campos y validador personalizado con expresión regular para URLs
- Operadores `$addToSet` y `$pull` para gestionar los "me gusta" sin duplicados
- Middleware centralizado de manejo de errores y errores con código de estado (`Object.assign`)
- Middleware de autorización temporal (`req.user`) con extensión de tipos de TypeScript
- `tsx` para recarga automática en desarrollo
- ESLint (`typescript-eslint`), Prettier y EditorConfig

## Rutas disponibles

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

| Método | Ruta               | Qué hace                           |
| ------ | ------------------ | ---------------------------------- |
| GET    | `/cards`           | Devuelve todas las tarjetas        |
| POST   | `/cards`           | Crea una tarjeta (`name`, `link`)  |
| DELETE | `/cards/:id`       | Elimina una tarjeta                |
| PUT    | `/cards/:id/likes` | Da "me gusta" a una tarjeta        |
| DELETE | `/cards/:id/likes` | Quita el "me gusta" de una tarjeta |

Todas las rutas que devuelven tarjetas incluyen el campo `isLiked`, calculado según el usuario actual.

### Respuestas de error

| Estado | Cuándo ocurre                                                |
| ------ | ------------------------------------------------------------ |
| 400    | Datos inválidos o `_id` con formato incorrecto               |
| 404    | El usuario o la tarjeta no existen, o la dirección no existe |
| 500    | Error inesperado: `"Ha ocurrido un error en el servidor"`    |

Todas las respuestas de error tienen la forma `{ "message": "..." }`.

## Requisitos y scripts

Se necesita tener MongoDB en ejecución en `mongodb://127.0.0.1:27017/aroundb`.

| Comando         | Qué hace                                              |
| --------------- | ----------------------------------------------------- |
| `npm run dev`   | Inicia el servidor en `localhost:3000` con hot reload |
| `npm run build` | Compila `src/` a JavaScript en `dist/`                |
| `npm run start` | Inicia la versión compilada                           |
| `npm run lint`  | Revisa el código con ESLint                           |

## Arquitectura

```
web_project_around_express/
├── src/
│   ├── controllers/
│   │   ├── cards.ts
│   │   └── users.ts
│   ├── middleware/
│   │   └── error-handler.ts
│   ├── models/
│   │   ├── card.ts
│   │   └── user.ts
│   ├── routes/
│   │   ├── cards.ts
│   │   ├── index.ts
│   │   └── users.ts
│   ├── types/
│   │   └── express/
│   │       └── index.d.ts
│   └── app.ts
├── .editorconfig
├── .gitignore
├── eslint.config.js
├── package.json
└── tsconfig.json
```

- **models:** definen cómo es un usuario o una tarjeta y validan los datos.
- **controllers:** contienen la lógica de cada ruta.
- **routes:** deciden qué URL llega a qué controlador.
- **middleware:** manejo centralizado de errores.

## Nota sobre la autorización

Por ahora un middleware temporal asigna siempre el mismo usuario a cada petición (`req.user`). Se reemplazará cuando se implemente la autenticación real.

## Autor

Dara Rangel
