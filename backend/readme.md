# StudentHub Backend API

## 🚀 Descripción del Proyecto

StudentHub es una robusta API backend diseñada para la gestión centralizada de usuarios y perfiles de estudiantes. Ofrece un sistema de acceso restringido donde solo los administradores pueden crear y gestionar usuarios con roles definidos (admin, visit, catcher, editor), permitiendo una administración de acceso granular. Además, facilita la creación de perfiles de estudiantes personalizados y la gestión de archivos adjuntos, garantizando una operación eficiente y adaptada a diversas necesidades.

Esta API está construida con Node.js y TypeScript, utilizando Express.js para las rutas, Sequelize como ORM para interactuar con una base de datos PostgreSQL, y Winston para un registro de eventos avanzado. La gestión de archivos se integra con Google Drive, y el sistema cuenta con comunicación en tiempo real a través de Socket.IO.


## ✨ Características Principales

  - Autenticación y Autorización por Roles: Sistema de acceso restringido con roles (admin, visit, catcher, editor) manejados por JWTs. Solo administradores pueden crear nuevos usuarios.
  - Gestión de Usuarios: Funcionalidades para la creación, consulta y actualización de usuarios con roles definidos.
  - Gestión de Estudiantes: Creación y administración de perfiles detallados de estudiantes, incluyendo campos obligatorios y opcionales.
  - Manejo de Archivos: Integración con Google Drive para la subida y gestión de documentos adjuntos (imágenes, certificados, etc.) para los perfiles de estudiantes.
  - Manejo Centralizado de Errores: Utilidades para el manejo consistente de errores HTTP en toda la API.
  - Logging Robusto: Implementación de Winston para un registro detallado de eventos, con logs rotatorios diarios y manejo de excepciones/rechazos de promesas.
  - Validación de Datos: Uso de Joi para la validación de esquemas de datos en los payloads de las solicitudes.
  - Seguridad:
    - Cifrado de contraseñas con bcryptjs
    - Generación y verificación segura de JWTs.
    - Limitación de tasa (express-rate-limit) para prevenir ataques de fuerza bruta.
    - Manejo de CORS para la seguridad de la API. 
  - Base de Datos Relacional: Conexión y gestión de datos con PostgreSQL a través de Sequelize y Sequelize-TypeScript.
  - Desarrollo Eficiente: 
    - TypeScript para una tipificación estricta y mejor mantenibilidad.
    - Scripts de desarrollo con hot-reloading (tsx watch).
    - Pruebas unitarias y de integración con Vitest y Supertest.
    - Contenedorización con Docker para entornos de desarrollo y producción consistentes.

## ⚙️ Tecnologías Utilizadas

  - Lenguaje: TypeScript
  - Entorno de Ejecución: Node.js
  - Framework Web: Express.js
  - Base de Datos: PostgreSQL
  - ORM: Sequelize & Sequelize-TypeScript
  - Autenticación: JSON Web Tokens (JWT), bcryptjs
  - Validación de Datos: Joi, Validator
  - Logging: Winston, winston-daily-rotate-file
  - Manejo de Archivos: Multer, Google APIs (Google Drive)
  - Comunicación en Tiempo Real: Socket.IO
  - Fechas: Luxon
  - ID Generación: NanoID
  - Herramientas de Desarrollo:
    - tsx: Ejecución de TypeScript con hot-reloading.
    - pkgroll: Bundler/compilador para producción.
    - vitest: Framework de pruebas.
    - supertest: Para pruebas de integración HTTP.
  - Contenedorización: Docker

  ## 🛠️ Configuración y Ejecución Local

  Sigue estos pasos para poner en marcha el backend de StudentHub en tu entorno local.

Prerrequisitos
Asegúrate de tener instalado lo siguiente:
- Node.js (versión 18 o superior)
- npm (Node Package Manager)
- PostgreSQL (servidor de base de datos)
- Docker (opcional, para ejecutar la base de datos o la aplicación en contenedores)

1. Clonar el Repositorio

```ts
git clone <URL_DEL_REPOSITORIO>
cd studenthub/backend
```

2. Configurar Variables de Entorno
Crea un archivo .env en la raíz de la carpeta backend con las siguientes variables. Asegúrate de reemplazar los valores de ejemplo con tus propios secretos y configuraciones:

```ts
# Configuración de la base de datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_pg_user
DB_PASSWORD=your_pg_password
DB_DATABASE=studenthub_db
DB_DIALECT=postgres
DB_SYNCHRONIZE=true # Cuidado: en producción esto debe ser 'false'

# Secreto para JWT (JSON Web Tokens)
JWT_SECRET=your_super_secret_jwt_key

# Configuración de Google Drive (para subida de archivos)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=your_google_redirect_uri # (Ej: http://localhost:3000/api/oauth/callback)
GOOGLE_REFRESH_TOKEN=your_google_refresh_token

# Puerto del servidor
PORT=3000

# Nivel de logs (info, debug, warn, error)
LOG_LEVEL=info
```

Nota: Para obtener las credenciales de Google Drive (Client ID, Client Secret, Refresh Token), necesitas configurar un proyecto en Google Cloud Console y habilitar la API de Google Drive.

3. Instalar Dependencias
Navega a la carpeta backend y instala todas las dependencias:

```ts
npm install
```

4. Configurar la Base de Datos
Asegúrate de que tu servidor PostgreSQL esté en ejecución y que las credenciales en tu .env sean correctas. La aplicación intentará sincronizar los modelos con la base de datos al iniciar (si DB_SYNCHRONIZE es true).

## 🚀 Guía de Inicio Rápido (Primeros Pasos)
Para comenzar a interactuar con la API, sigue estos pasos secuenciales:

1. Iniciar la Aplicación en Modo Desarrollo

```ts
npm run dev
```
Esto iniciará el servidor en modo desarrollo con hot-reloading. Verás un mensaje en la consola indicando el puerto de escucha (ej., Servidor encendido en puerto 3000).

2. Registrar un Nuevo Usuario (Inicial)
Para crear el primer usuario (administrador), necesitamos deshabilitar temporalmente la verificación de token, ya que aún no tenemos uno.

  - Temporalmente, comenta la línea que usa verifyToken en el archivo src/routes/auth.route.ts o donde se esté aplicando como middleware para permitir el registro sin autenticación. Por ejemplo, si tienes algo como router.post('/register', verifyToken, authController.registerUser);, cámbialo a router.post('/register', authController.registerUser); solo por este paso.
  - Envía una solicitud POST a http://localhost:3000/api/auth/register con el siguiente cuerpo:

```ts
{
  "email": "cris.gallardos@gmail.com",
  "password": "cg9053",
  "role": "admin"
}
```

Nota: La contraseña debe tener un mínimo de 6 caracteres. Los roles disponibles son: admin, visit, catcher, editor.

3. Reintegrar la Verificación de Token
Una vez que el usuario administrador ha sido creado, vuelve a descomentar la línea de verifyToken en src/routes/auth.route.ts o donde la hayas comentado. ¡Esto es crucial para la seguridad!

4. Iniciar Sesión para Obtener un Token
Envía una solicitud POST a http://localhost:3000/api/auth/login con las credenciales del usuario recién creado:

```ts
{
  "email": "cris.gallardos@gmail.com",
  "password": "cg9053"
}
```

Esto te devolverá un JSON Web Token (JWT). Guarda este token, ya que lo necesitarás para todas las solicitudes protegidas de la API.


5. Crear Perfiles de Estudiantes
- Con tu JWT obtenido, ahora puedes crear perfiles de estudiantes. Envía una solicitud POST a http://localhost:3000/api/students. Asegúrate de incluir el JWT en el encabezado Authorization como Bearer <TU_TOKEN>.

Ejemplo de cuerpo de solicitud:

```ts
{
  "name": "Carlos",
  "lastname": "Pérez",
  "email": "carlos.perez@gmail.com",
  "rut": null,
  "birthdate": null,
  "sex": null,
  "address": null,
  "nationality": null,
  "source": null,
  "contact": null,
  "phone": "123456789",
  "contactdate": null,
  "call1": {
    "comment": null,
    "completed": false
  },
  "call2": {
    "comment": null,
    "completed": false
  },
  "call3": {
    "comment": null,
    "completed": false
  },
  "positivefeedback": null,
  "linkdni": null,
  "school": null,
  "course": null,
  "communicationpreference": null
}
```
Nota: Los campos name, lastname, email y phone son obligatorios.


Endpoints de Prueba
Una vez que tengas un token, puedes probar los siguientes endpoints:

Obtener todos los usuarios: GET http://localhost:3000/api/users (Requiere autenticación con JWT)

Obtener todos los estudiantes: GET http://localhost:3000/api/students (Requiere autenticación con JWT)

Explora la documentación de la API (Swagger) para más endpoints disponibles.

🧪 Ejecución de Pruebas
El proyecto incluye pruebas unitarias y de integración que se pueden ejecutar con Vitest.

npm test


🐳 Contenedorización con Docker
El proyecto incluye un Dockerfile para construir una imagen Docker de la aplicación.

Construir la imagen Docker

docker build -t studenthub-backend .


Ejecutar el contenedor Docker
Asegúrate de que tu base de datos PostgreSQL esté accesible desde el contenedor (puede ser otro contenedor Docker en la misma red o un servicio externo).

docker run -p 3000:3000 --env-file ./.env studenthub-backend

Nota: --env-file ./.env inyecta tus variables de entorno directamente en el contenedor.


🤝 Contribuciones
Las contribuciones son bienvenidas. Por favor, crea un pull request con tus cambios.