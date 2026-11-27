# Sistema de Inventario

Aplicación web para administrar productos, hecha con Spring Boot, Angular y MySQL. Incluye login con Spring Security.

## Tecnologías

- **Backend:** Java 17+, Spring Boot, Spring Security, Spring Data JPA, MySQL
- **Frontend:** Angular y Bootstrap
- **Control de versiones:** Git y GitHub con Git Flow

## Estructura

```text
Tarea 3/
├── Inventario-Backend/    # API REST (Spring Boot)
├── inventario-Frontend/   # Aplicación Angular
└── README.md
```

## Requisitos

- JDK 17 o superior
- Node.js 18+ y Angular CLI
- MySQL 8.0+ en el puerto 3306

## Cómo ejecutarlo

1. Clona el repositorio:

```bash
git clone https://github.com/Abel-QL/Tarea-3-uso-de-Gitflow.git
cd "Tarea 3"
```

2. Crea el archivo `Inventario-Backend/src/main/resources/application-local.properties` con tus datos de MySQL:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/inventariosystem_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_CONTRASEÑA
```

3. Inicia el backend (queda en `http://localhost:8080`):

```bash
cd Inventario-Backend
./mvnw spring-boot:run
```

4. Inicia el frontend (queda en `http://localhost:4200`):

```bash
cd inventario-Frontend
npm install
ng serve
```

## Usuario por defecto

- **Usuario:** `admin`
- **Contraseña:** `admin123`

## API

| Método | Endpoint | Descripción |
| --- | --- | --- |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/productos` | Listar productos |
| GET | `/api/productos/{id}` | Obtener un producto |
| POST | `/api/productos` | Crear producto |
| PUT | `/api/productos/{id}` | Actualizar producto |
| DELETE | `/api/productos/{id}` | Eliminar producto |

Las rutas de `/api/productos` requieren autenticación Basic si la vas a probar en postman y eso.

## Validaciones

- **name:** obligatorio, máximo 50 caracteres
- **descripcion:** obligatoria, máximo 70 caracteres
- **price:** obligatorio, mayor que 0
- **stock:** obligatorio, entero mayor o igual a 0

## Git Flow

Ramas permanentes: `main`, `qa` y `dev`. Cada funcionalidad se desarrolló en una rama `feature/*` y se integró con Pull Requests.