# Nursing Knowledge IA

## Documentación general y técnica

Nursing Knowledge IA es una aplicación web orientada a apoyar la práctica de enfermería mediante la organización de información de pacientes, herramientas de trabajo clínico y una interfaz de asistencia con inteligencia artificial.

El proyecto se divide en dos componentes:

- **Nursing-Knowledge-IA-Front:** interfaz web de acceso, administración y espacio de trabajo clínico.
- **Nursing-Knowledge-IA-Back:** API que permite gestionar usuarios y pacientes y verificar credenciales mediante MongoDB.

> **Estado del proyecto:** en desarrollo. El backend dispone de operaciones de gestión y autenticación, mientras que el espacio clínico del frontend contiene funcionalidades de demostración y datos locales. No debe interpretarse que todas las pantallas están conectadas a la base de datos ni que existe una solución clínica lista para producción.

## 1. ¿Para qué sirve?

La aplicación busca centralizar herramientas útiles para estudiantes y profesionales de enfermería en un mismo entorno:

- Organizar información básica de pacientes.
- Facilitar el registro de notas de enfermería mediante el formato SOAP.
- Presentar planes de cuidados relacionados con NANDA, NOC y NIC.
- Registrar y consultar signos vitales en la interfaz clínica.
- Realizar cálculos de goteo y velocidad de infusión.
- Ofrecer una interfaz de consulta y análisis asistido por IA.
- Administrar cuentas de administradores, médicos y personal de enfermería.

**Importante:** el apoyo mediante IA y las calculadoras no sustituyen el criterio profesional, los protocolos institucionales ni la validación de un profesional habilitado.

## 2. Usuarios contemplados

El backend contempla cuatro tipos de usuarios, almacenados en colecciones independientes:

| Tipo de usuario | Colección MongoDB | Datos específicos |
|---|---|---|
| Administrador | `admins` | Nivel de acceso (`accessLevel`) |
| Médico | `doctors` | Registro, matrícula y especialidad |
| Enfermero/a | `nurses` | Institución, año de cursado y legajo |
| Paciente | `patients` | Identificador, edad, sexo, diagnóstico actual y fecha de ingreso |

La existencia de estos tipos de usuario **no implica que haya permisos implementados por rol**. En el código proporcionado no se observa protección de los endpoints mediante sesiones, tokens o comprobaciones de autorización.

## 3. Funcionalidades

### 3.1. Inicio de sesión

La pantalla de acceso permite introducir correo electrónico y contraseña y mostrar u ocultar la contraseña.

El frontend envía las credenciales a `POST /login`. El backend:

1. Valida que correo y contraseña sean cadenas no vacías.
2. Busca el correo en las cuatro colecciones de usuarios.
3. Comprueba la contraseña contra el hash almacenado.
4. Devuelve el usuario sin su contraseña y el nombre de su colección.

Las contraseñas creadas mediante los servicios de alta se almacenan utilizando **PBKDF2-HMAC-SHA256**, con sal aleatoria de 16 bytes y 600.000 iteraciones.

> El inicio de sesión actual verifica credenciales, pero no emite un token ni establece una sesión autenticada. El uso de `credentials: 'include'` en el frontend no implementa por sí mismo una sesión.

### 3.2. Panel de administración

El componente `AdminPanel` permite crear:

- Administradores.
- Médicos.
- Personal de enfermería.

Actualmente utiliza un selector de tipo de registro y un área de texto para enviar un objeto JSON al endpoint correspondiente. Muestra mensajes de éxito, errores de validación y problemas de conexión.

El panel todavía no ofrece formularios específicos por tipo de usuario ni pantallas para listar, editar o eliminar registros.

### 3.3. Gestión de usuarios y pacientes desde la API

La API incluye:

- Alta, actualización y eliminación de administradores.
- Alta, listado, búsqueda, actualización y eliminación de médicos.
- Alta, listado, búsqueda, actualización y eliminación de enfermeros.
- Alta, listado, búsqueda, actualización y eliminación de pacientes.

Las actualizaciones se realizan mediante `PUT` y requieren **todos los campos** del tipo de registro, no solamente los que se desean modificar.

### 3.4. Espacio de trabajo clínico

Según la estructura y las funciones disponibles en `src/views/landing.html`, la interfaz clínica contempla:

| Funcionalidad | Descripción | Alcance observado |
|---|---|---|
| Lista de pacientes | Selección del paciente activo y visualización de datos | Utiliza un arreglo local con pacientes de ejemplo |
| Nuevo paciente | Formulario para agregar pacientes a la interfaz | Actualiza el estado local; no se evidencia conexión con `POST /patients` |
| Signos vitales | Datos como presión arterial, frecuencia cardíaca, frecuencia respiratoria, saturación y temperatura | Gestión local en la vista |
| Notas SOAP | Secciones subjetiva, objetiva, análisis y plan | Edición y guardado local |
| NANDA, NOC y NIC | Presentación de diagnósticos, resultados e intervenciones de enfermería | Estructura de datos en la vista; no se observa persistencia específica en la API |
| Calculadora de goteo | Calcula gotas por minuto y mililitros por hora a partir de volumen, tiempo y factor de goteo | Herramienta de interfaz pendiente de validación clínica |
| Chat con IA | Envío de consultas y presentación de respuestas | Se observa una función de llamada a Gemini; requiere configuración y verificación |
| Análisis y generación asistida | Funciones para analizar SOAP y generar un PAE | Integración prevista en la vista; no demuestra funcionamiento validado |
| Personalización visual | Modo oscuro, barra lateral y ventanas modales | Funcionalidades de interfaz |

> Solo se proporcionó un esquema parcial de `landing.html`. Los detalles de su integración con Gemini, la configuración de la clave y su comportamiento completo deben verificarse en el archivo original.

## 4. Lenguajes y tecnologías

### Backend

| Tecnología | Uso |
|---|---|
| **Python 3.14 o superior** | Lenguaje principal del servidor |
| **Flask** | Framework para construir la API HTTP |
| **Flask-CORS** | Configuración de solicitudes entre frontend y backend |
| **MongoDB** | Base de datos documental |
| **PyMongo** | Acceso a MongoDB desde Python |
| **dotenv / python-dotenv** | Carga de variables de entorno |
| **Werkzeug** | Excepciones y utilidades HTTP |
| **hashlib, hmac y secrets** | Hash de contraseñas, comparación segura y generación de sal |
| **uv** | Gestión del entorno y dependencias a partir de `pyproject.toml` y `uv.lock` |

### Frontend

| Tecnología | Uso |
|---|---|
| **JavaScript** | Lógica de la interfaz |
| **JSX** | Definición de componentes React |
| **React 19** | Construcción de la pantalla de acceso y del panel administrativo |
| **React DOM** | Renderizado de la aplicación |
| **Vite 8** | Servidor de desarrollo y compilación |
| **HTML y CSS** | Estructura y presentación visual |
| **Fetch API** | Solicitudes HTTP al backend |
| **ESLint** | Análisis estático del código JavaScript y JSX |

La vista clínica se encuentra en un archivo HTML independiente y contiene lógica JavaScript propia. No está implementada como un componente React dentro de `App.jsx`.

## 5. Arquitectura del sistema

### 5.1. Flujo general

```text
Usuario
   │
   ▼
Frontend: React / vista HTML
   │
   │ Solicitudes HTTP con JSON
   ▼
API Flask
   │
   ▼
Controladores → Servicios → Repositorios
                                │
                                ▼
                             MongoDB
```

Este flujo representa la comunicación prevista para las funciones conectadas a la API. Las operaciones locales de la vista clínica no recorren necesariamente todas estas capas.

### 5.2. Capas del backend

- **Rutas:** definen las URL, los métodos HTTP y la lectura del cuerpo JSON.
- **Controladores:** validan la estructura de los datos y generan respuestas HTTP.
- **Servicios:** contienen reglas de negocio, validaciones y hash de contraseñas durante el alta.
- **Repositorios:** ejecutan consultas, inserciones, actualizaciones y eliminaciones en MongoDB.
- **Modelos:** describen las entidades del dominio mediante clases Python.
- **Configuración y conexión:** cargan el entorno e inicializan el acceso a la base de datos.

### 5.3. Organización de archivos

```text
Nursing-Knowledge-IA-Back/
├── pyproject.toml
├── uv.lock
├── .python-version
└── src/
    ├── app.py
    └── nursing_knowledge_ia_back/
        ├── config/
        ├── controllers/
        ├── database/
        ├── models/
        ├── repositories/
        ├── routes/
        └── services/

Nursing-Knowledge-IA-Front/
├── package.json
├── package-lock.json
├── vite.config.js
├── public/
└── src/
    ├── App.jsx
    ├── App.css
    ├── main.jsx
    ├── index.css
    ├── assets/
    └── views/
        ├── admin_panel.html
        └── landing.html
```

`admin_panel.html` está vacío en los archivos compartidos. El panel administrativo implementado se encuentra dentro de `App.jsx`.

## 6. Datos principales

### Campos comunes

Los registros de administradores, médicos, enfermeros y pacientes incluyen:

| Campo | Tipo esperado por los controladores | Descripción |
|---|---|---|
| `name` | Cadena | Nombre |
| `lastname` | Cadena | Apellido |
| `email` | Cadena | Correo electrónico |
| `password` | Cadena | Contraseña recibida para alta o actualización |
| `createdAt` | Cadena ISO 8601 en JSON | Fecha de creación |
| `active` | Booleano | Estado del registro |

### Campos adicionales por entidad

| Entidad | Campos |
|---|---|
| Administrador | `accessLevel`: entero |
| Médico | `register`, `enrollment`, `especialitation`: cadenas |
| Enfermero/a | `institution`, `ageCourse`, `file`: cadenas |
| Paciente | `pid`: cadena; `age`: entero no negativo; `sex`: cadena; `currentDiagnosis`: cadena; `dateOfEntry`: fecha ISO 8601 |

El nombre `especialitation` se conserva porque es el que utiliza la API actual.

Los controladores rechazan campos adicionales en las operaciones de alta y actualización de estas entidades. Para administradores, médicos y enfermeros, los servicios exigen contraseñas de al menos ocho caracteres. El servicio de pacientes exige una contraseña no vacía, pero no aplica actualmente ese mínimo de longitud.

El campo `active` se almacena, aunque el repositorio de login no comprueba su valor antes de autenticar.

## 7. API HTTP

**Dirección local de desarrollo:** `http://localhost:8080`

Los endpoints se registran sin prefijo `/api`. Las solicitudes con cuerpo deben utilizar `Content-Type: application/json`.

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/login` | Verificar credenciales |
| `POST` | `/admins` | Crear administrador |
| `PUT` | `/admins/<email>` | Actualizar administrador por correo |
| `DELETE` | `/admins/<email>` | Eliminar administrador por correo |
| `POST` | `/doctors` | Crear médico |
| `GET` | `/doctors` | Listar médicos |
| `GET` | `/doctors/<register>` | Buscar médico por registro |
| `PUT` | `/doctors/<register>` | Actualizar médico |
| `DELETE` | `/doctors/<register>` | Eliminar médico |
| `POST` | `/nurses` | Crear enfermero/a |
| `GET` | `/nurses` | Listar enfermeros |
| `GET` | `/nurses/<file>` | Buscar enfermero/a por legajo |
| `PUT` | `/nurses/<file>` | Actualizar enfermero/a |
| `DELETE` | `/nurses/<file>` | Eliminar enfermero/a |
| `POST` | `/patients` | Crear paciente |
| `GET` | `/patients` | Listar pacientes |
| `GET` | `/patients/<pid>` | Buscar paciente por identificador |
| `PUT` | `/patients/<pid>` | Actualizar paciente |
| `DELETE` | `/patients/<pid>` | Eliminar paciente |

### Ejemplo de inicio de sesión

```http
POST /login
Content-Type: application/json
```

```json
{
  "email": "usuario@institucion.org",
  "password": "UnaClaveDeEjemplo123!"
}
```

Respuesta ilustrativa:

```json
{
  "user": {
    "_id": "identificador_del_usuario",
    "name": "Ana",
    "lastname": "Perez",
    "email": "usuario@institucion.org",
    "active": true
  },
  "collection": "nurses"
}
```

El objeto `user` incluye los campos almacenados del usuario, salvo `password`; el ejemplo omite otros campos por brevedad.

### Ejemplo de creación de enfermero/a

```http
POST /nurses
Content-Type: application/json
```

```json
{
  "name": "Ana",
  "lastname": "Perez",
  "email": "ana@institucion.org",
  "password": "UnaClaveDeEjemplo123!",
  "createdAt": "2026-01-15T10:00:00",
  "active": true,
  "institution": "Institucion de Salud",
  "ageCourse": "Tercer año",
  "file": "ENF-001"
}
```

Respuesta prevista por el controlador:

```json
{
  "message": "Enfermero creado correctamente"
}
```

### Códigos de respuesta

| Código | Uso previsto |
|---|---|
| `200` | Consulta, actualización, eliminación o login correcto |
| `201` | Registro creado |
| `400` | JSON o datos inválidos |
| `401` | Credenciales incorrectas |
| `404` | Registro no encontrado o no actualizado/eliminado |
| `409` | Registro duplicado según la comprobación del servicio |
| `500` | Error interno |

Los controladores gestionan estos estados, pero algunas inconsistencias de repositorios y serialización pueden impedir que las respuestas coincidan siempre con lo previsto.

## 8. Instalación y ejecución local

### 8.1. Requisitos

- Python **3.14 o superior**.
- `uv` instalado para gestionar el backend.
- Node.js compatible con Vite 8; revisar los requisitos de motor de la versión instalada.
- npm.
- MongoDB accesible y un usuario con los permisos necesarios.
- Ambos proyectos descargados en el equipo.

### 8.2. Configurar el backend

Desde la carpeta del servidor:

```bash
cd Proyectos/Nursing-Knowledge-IA-Back
uv sync
```

Crear un archivo `.env` en esa misma carpeta, reemplazando los valores de ejemplo:

```dotenv
DB_NAME=nursing-knowledge-api
DB_USER=usuario_mongodb
DB_PASSWORD=CAMBIAR_POR_UNA_CLAVE_SEGURA
DB_PORT=27017
DB_HOST=localhost
```

Consideraciones de la configuración actual:

- `LoadEnv()` busca `.env` en el directorio de trabajo; ejecutar desde la raíz del backend.
- `GetUri()` utiliza `localhost` directamente: **`DB_HOST` todavía no se lee**.
- La URI utiliza `authSource=admin`; el usuario MongoDB debe estar configurado para esa autenticación.
- El inicializador devuelve una instancia de `Database`, aunque los repositorios esperan un `MongoClient`.
- Los repositorios usan el nombre fijo `nursing_knowledge_ia`, distinto del `DB_NAME` del ejemplo.

**Antes de probar operaciones de base de datos, debe unificarse este contrato de conexión:** pasar un `MongoClient` a los repositorios o adaptarlos para recibir la instancia `Database`, y utilizar de forma consistente el nombre configurado. Cambiar únicamente el archivo `.env` no resuelve esta incompatibilidad.

Para iniciar el servidor:

```bash
uv run python src/app.py
```

El archivo `src/app.py` configura Flask en el puerto `8080` con modo depuración. El comando de proyecto definido en `pyproject.toml` ejecuta actualmente una función que imprime un saludo, no inicia la API.

> El servidor de desarrollo y `debug=True` no deben utilizarse en producción.

### 8.3. Configurar el frontend

Desde otra terminal:

```bash
cd Proyectos/Nursing-Knowledge-IA-Front
npm ci
npm run dev
```

Abrir la dirección indicada por Vite, normalmente:

```text
http://localhost:5173
```

En desarrollo, `App.jsx` dirige las solicitudes al puerto `8080` del mismo hostname del navegador. Flask permite CORS para:

- `http://localhost:5173`
- `http://127.0.0.1:5173`

El acceso desde una IP de red, otro dominio o un puerto diferente requiere ajustar CORS y la exposición del servidor.

### 8.4. Compilación y revisión del frontend

```bash
npm run lint
npm run build
npm run preview
```

- `lint`: analiza JavaScript y JSX.
- `build`: genera los archivos de producción en `dist/`.
- `preview`: permite revisar localmente esa compilación.

En producción, el frontend usa rutas relativas al mismo origen. Es necesario configurar el servidor web o un proxy inverso para dirigir las rutas de la API hacia Flask. También debe verificarse cómo se publicará la vista `landing.html`, ya que la navegación actual apunta a una ruta dentro de `src/` y no hay una configuración explícita de compilación multipágina.

## 9. Limitaciones e incidencias conocidas

### Integración entre frontend y backend

1. **Nombres de colección distintos:** el backend devuelve `admins`, `doctors`, `nurses` y `patients`, pero `App.jsx` comprueba los nombres en singular. Esto impide que el flujo normal de login seleccione correctamente el panel o la navegación posterior.
2. **Conexión incompatible:** `InitConnection()` devuelve `Database`, mientras que los repositorios utilizan el argumento como `MongoClient`.
3. **Nombre de base no unificado:** los repositorios apuntan a `nursing_knowledge_ia`, aunque la configuración permite otro nombre.
4. **Persistencia clínica pendiente:** no se observan endpoints específicos para notas SOAP, signos vitales, planes NANDA/NOC/NIC o historial del chat.
5. **Navegación y empaquetado pendientes:** debe sustituirse o configurarse la referencia directa a `/src/views/landing.html` para el despliegue.

### Seguridad y consistencia de datos

- No se observa autenticación persistente ni autorización en los endpoints de gestión.
- Los métodos de actualización de los cuatro tipos de usuario envían `password` al repositorio sin aplicar el hash usado en el alta. Esto puede almacenar contraseñas en texto plano y romper el login posterior.
- El login no rechaza usuarios con `active: false`.
- Los repositorios devuelven errores como objetos o cadenas en lugar de propagarlos consistentemente; algunos servicios pueden informar éxito sin comprobar que la inserción se haya realizado.
- Las consultas de médicos y enfermeros pueden incluir un `_id` de tipo `ObjectId`, que requiere conversión antes de responder con JSON.
- Las fechas aceptadas como `date` en llamadas internas deben normalizarse a un tipo compatible con BSON antes de persistir.
- Las actualizaciones se basan en `modified_count`; una actualización con datos idénticos puede informarse como no realizada aunque el registro exista.
- Se comprueban duplicados desde los servicios, pero no se observa creación de índices únicos que garantice esa condición frente a solicitudes simultáneas.
- No se incluyen pruebas automatizadas en los archivos proporcionados.

## 10. Recomendaciones antes de producción

1. Corregir las incompatibilidades de conexión, base de datos y nombres de colección.
2. Implementar sesiones seguras o tokens y permisos verificados en el servidor.
3. Aplicar hash a todas las escrituras de contraseñas, incluidas las actualizaciones.
4. Añadir índices únicos y un manejo uniforme de errores de persistencia.
5. Validar que todos los datos devueltos sean serializables y que no se expongan secretos.
6. Integrar la vista clínica con endpoints persistentes y controles de acceso a pacientes.
7. Mover las llamadas a servicios de IA al backend si requieren claves privadas. No colocar claves secretas en código entregado al navegador.
8. Establecer límites de solicitudes, registros de auditoría, copias de seguridad y comunicaciones HTTPS.
9. Incorporar pruebas unitarias, de integración y de los flujos completos del frontend.
10. Validar cálculos, recomendaciones y resultados de IA con personal clínico competente.
11. Definir medidas de consentimiento, minimización de datos y protección de información sanitaria según la normativa aplicable.

Los archivos `.env` no deben compartirse ni versionarse. Si las credenciales compartidas corresponden a un entorno real, deben reemplazarse.

## 11. Glosario

- **SOAP:** formato de documentación clínica basado en información subjetiva, objetiva, análisis y plan.
- **PAE:** Proceso de Atención de Enfermería.
- **NANDA:** clasificación de diagnósticos de enfermería.
- **NOC:** clasificación de resultados de enfermería.
- **NIC:** clasificación de intervenciones de enfermería.
- **API:** interfaz mediante la cual el frontend solicita operaciones al servidor.
- **CRUD:** operaciones de creación, lectura, actualización y eliminación.
- **Hash de contraseña:** resultado de una función de derivación que permite verificar contraseñas sin almacenarlas en texto plano.

## 12. Resumen

Nursing Knowledge IA combina una API Python con Flask y MongoDB, una interfaz React y un espacio clínico HTML con herramientas de enfermería y funciones previstas de asistencia mediante IA. Su objetivo es apoyar la organización del trabajo y el acceso a información, pero el estado actual requiere completar la integración, corregir inconsistencias y reforzar la seguridad antes de utilizar datos reales o desplegarse en un entorno asistencial.
