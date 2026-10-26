# Around The U.S. — React + API REST

## Descripción

Aplicación web interactiva para explorar y compartir fotografías de lugares, construida con **React 19** y **TypeScript**. Es la migración del proyecto original (JavaScript/TypeScript con Programación Orientada a Objetos) al paradigma declarativo y basado en componentes de React, desarrollada como parte del programa de desarrollo web de TripleTen.

La aplicación consume una API REST para persistir todos los datos: perfil de usuario, avatar y tarjetas de lugares, con "me gusta" y eliminación sincronizados en tiempo real, sin recargar la página.

## Tecnologías

- React 19 + TypeScript
- Vite (bundler y servidor de desarrollo)
- Context API de React para estado global
- CSS3 con metodología BEM
- ESLint (`typescript-eslint`, `eslint-plugin-react-hooks`)
- API REST (`fetch`, `async/await`)

## Funcionalidades

- Carga inicial del usuario y las tarjetas desde el servidor (`Promise.all`)
- Estado global del usuario actual vía **Context API**, disponible en toda la aplicación sin prop drilling
- Edición de perfil (nombre y descripción) mediante **componente controlado** (`useState`)
- Cambio de avatar mediante **componente no controlado** (`useRef`)
- Creación de nuevas tarjetas mediante formulario controlado; la tarjeta nueva aparece primero en la lista
- Sistema de "me gusta" sincronizado con el servidor, con estado visual real (`isLiked`)
- Eliminación de tarjetas con **ventana de confirmación previa**; el botón de eliminar solo aparece en tarjetas del usuario propietario
- Vista ampliada de imagen en ventana emergente
- Sistema de ventanas emergentes (popups) unificado, controlado por estado en `App.tsx`
- Manejo de errores de red con `try...catch` en todas las llamadas a la API

## Arquitectura

El estado y la lógica de negocio viven en `App.tsx`, que actúa como "cerebro" de la aplicación: carga los datos iniciales, mantiene el usuario actual, las tarjetas y el popup activo, y expone las funciones de actualización a través de `CurrentUserContext`.

| Componente          | Responsabilidad                                                 |
| ------------------- | --------------------------------------------------------------- |
| `App`               | Estado global, llamadas a la API, provee el contexto            |
| `Header` / `Footer` | Presentación estática                                           |
| `Main`              | Perfil, lista de tarjetas, orquesta qué popup abrir             |
| `Card`              | Renderiza una tarjeta; determina si el usuario es dueño         |
| `Popup`             | Wrapper genérico de ventana emergente (título opcional, cierre) |
| `EditProfile`       | Formulario controlado de perfil                                 |
| `EditAvatar`        | Formulario no controlado (`useRef`) de avatar                   |
| `NewCard`           | Formulario controlado de nueva tarjeta                          |
| `RemoveCard`        | Confirmación antes de eliminar                                  |
| `ImagePopup`        | Vista ampliada de imagen                                        |

Los componentes de formulario (`EditProfile`, `EditAvatar`, `NewCard`, `RemoveCard`) consumen `CurrentUserContext` para acceder directamente a las funciones que llaman a la API, evitando pasar callbacks manualmente por cada nivel del árbol.

### Estructura de carpetas

web-around/
├── src/
│ ├── components/
│ │ ├── App.tsx
│ │ ├── Header/Header.tsx
│ │ ├── Footer/Footer.tsx
│ │ └── Main/
│ │ ├── Main.tsx
│ │ ├── Card/Card.tsx
│ │ └── Popup/
│ │ ├── Popup.tsx
│ │ ├── EditProfile/EditProfile.tsx
│ │ ├── EditAvatar/EditAvatar.tsx
│ │ ├── NewCard/NewCard.tsx
│ │ ├── RemoveCard/RemoveCard.tsx
│ │ └── ImagePopup/ImagePopup.tsx
│ ├── contexts/
│ │ └── CurrentUserContext.tsx
│ ├── interfaces/
│ │ ├── UserData.ts
│ │ ├── CardData.ts
│ │ ├── CurrentUserContextType.ts
│ │ ├── ModalData.ts
│ │ └── ApiConfig.ts
│ ├── utils/
│ │ └── api.ts
│ ├── blocks/ # estilos BEM heredados del proyecto POO
│ ├── vendor/ # normalize.css y fonts.css
│ ├── images/
│ ├── index.css
│ └── main.tsx
├── index.html
├── vite.config.ts
└── package.json

## Lo aprendido

- Context API para estado global sin prop drilling
- Diferencia entre componentes controlados (`useState`) y no controlados (`useRef`), y cuándo usar cada uno
- Actualización inmutable de arreglos de estado (`.map()`, `.filter()`, spread)
- Reestructuración de tipos por dominio (`interfaces/UserData.ts`, `CardData.ts`) en lugar de un archivo único
- Coordinación de formularios con llamadas asíncronas a la API y cierre automático de popups tras éxito

## Estado del proyecto

Integración completa con la API REST. Todas las funcionalidades del brief (conexión, contexto, likes/borrado, edición de perfil, avatar, nueva tarjeta) y de la lista de comprobación (confirmación de borrado) están implementadas y verificadas con `npx tsc -b --noEmit`.

## Autor

Dara Rangel
