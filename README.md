# SmartStock360 📦

> Predicción de demanda e inventario con Machine Learning, servida a través de una arquitectura de 3 capas: **React → Spring Boot → Python (FastAPI + RandomForest)**.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3-6DB33F?logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-17-007396?logo=openjdk&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.5-F7931E?logo=scikitlearn&logoColor=white)

---

## 📑 Tabla de contenidos

- [Descripción](#-descripción)
- [Arquitectura](#-arquitectura)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Requisitos previos](#-requisitos-previos)
- [Puesta en marcha](#-puesta-en-marcha)
- [Variables de entorno](#-variables-de-entorno)
- [API](#-api)
- [Flujo de datos](#-flujo-de-datos)
- [Despliegue](#-despliegue)
- [Autor](#-autor)

---

## 📖 Descripción

**SmartStock360** clasifica la demanda de un producto a partir de 7 variables de negocio
(precio, stock, ventas recientes, descuento, temporada, días sin reabastecer y rating) y
devuelve una **predicción**, un **nivel de confianza**, un **ranking de probabilidades** y
**recomendaciones accionables** para la gestión de inventario.

El diseño demuestra el patrón **frontend → pasarela → servicio de IA**, donde cada capa tiene
una responsabilidad única y React nunca invoca al modelo de Python de forma directa.

| Predicción                    | Significado                                    |
| ----------------------------- | ---------------------------------------------- |
| `DEMANDA_ALTA_REABASTECER`    | Reabastecer en las próximas 48 h 🔴            |
| `DEMANDA_MEDIA_MONITOREAR`    | Monitorear y preparar pedido moderado 🟡       |
| `DEMANDA_BAJA_OPTIMIZAR`      | Evitar sobrestock, revisar precio/promoción 🟢 |

---

## 🏗 Arquitectura

```
┌──────────────┐   HTTP    ┌──────────────────┐  RestTemplate  ┌────────────────────┐
│    React     │  ──────▶  │   Spring Boot    │   ──────────▶  │  Python FastAPI    │
│  Vite :5173  │  ◀──────  │  Pasarela :8080  │   ◀──────────  │  RandomForest :8001│
└──────────────┘   JSON    └──────────────────┘     JSON       └────────────────────┘
     UI                     Validación @Valid                     Modelo ML entrenado
                            DTOs + CORS                           en memoria (sklearn)
```

- **React (5173)** captura y valida las 7 variables en un formulario.
- **Spring Boot (8080)** actúa como **pasarela**: valida el DTO con `@Valid`, reenvía al
  servicio de IA mediante `RestTemplate` y mapea la respuesta a un DTO tipado.
- **Python FastAPI (8001)** entrena en el arranque un modelo `RandomForestClassifier` y expone
  la predicción vía REST.

---

## 🧰 Stack tecnológico

| Capa       | Tecnologías                                                        |
| ---------- | ----------------------------------------------------------------- |
| Frontend   | React 18, Vite 5, React Router 6, Axios                           |
| Pasarela   | Java 17, Spring Boot 3.3 (Web, Validation), Maven, RestTemplate   |
| Servicio IA| Python 3.11, FastAPI, Uvicorn, scikit-learn, NumPy, Pydantic      |
| Infra      | Docker (multi-stage), Render                                       |

---

## 🗂 Estructura del proyecto

```
SmartStock360/
└── SmartStock/
    ├── INICIO_RAPIDO.md              # Guía breve de arranque
    ├── python-service/              # Servicio de IA (FastAPI + RandomForest)
    │   ├── app.py
    │   ├── requirements.txt
    │   └── Dockerfile
    ├── backend/                     # Pasarela Spring Boot
    │   ├── pom.xml
    │   ├── Dockerfile
    │   └── src/main/java/com/utp/smartstock/
    │       ├── controller/PrediccionController.java
    │       ├── service/SmartStockService.java
    │       ├── dto/{SmartStockRequest,PrediccionResponse}.java
    │       ├── config/{CorsConfig,RestTemplateConfig}.java
    │       └── exception/{PythonServiceException,GlobalExceptionHandler}.java
    └── frontend/                    # UI React + Vite
        └── src/
            ├── services/{apiClient,smartStockService}.js
            ├── hooks/{useSmartStock,useProductoForm}.js
            ├── components/*.jsx
            ├── pages/{Dashboard,Catalogo}.jsx
            └── data/productosSimulados.js
```

---

## ✅ Requisitos previos

| Herramienta | Versión mínima |
| ----------- | -------------- |
| Python      | 3.11           |
| JDK         | 17             |
| Maven       | 3.9            |
| Node.js     | 18 (con npm)   |

> Alternativa: **Docker** para levantar los servicios sin instalar las dependencias localmente.

---

## 🚀 Puesta en marcha

Levanta los servicios **en este orden**: `1) Python → 2) Spring Boot → 3) React`.
Todos los comandos se ejecutan desde `SmartStock/`.

### 1. Servicio de IA — Python FastAPI (`:8001`)

```bash
cd python-service
python -m venv venv
venv\Scripts\activate            # Windows
# source venv/bin/activate       # macOS / Linux
pip install -r requirements.txt
uvicorn app:app --reload --port 8001
```

Documentación interactiva (Swagger UI): <http://localhost:8001/docs>
Health check: <http://localhost:8001/health>

### 2. Pasarela — Spring Boot (`:8080`)

```bash
cd backend
mvn spring-boot:run
```

Prueba rápida:

```bash
curl -X POST http://localhost:8080/api/prediccion/smart-stock \
  -H "Content-Type: application/json" \
  -d '{"precio":129.90,"stock_actual":80,"ventas_7d":420,"descuento_pct":20,"temporada":2,"dias_sin_reabastecer":18,"rating_producto":4.6}'
```

### 3. Frontend — React + Vite (`:5173`)

```bash
cd frontend
npm install
npm run dev
```

Abre <http://localhost:5173>.

---

## 🔐 Variables de entorno

### Pasarela (Spring Boot)

| Variable                | Por defecto             | Descripción                                 |
| ----------------------- | ----------------------- | ------------------------------------------- |
| `PORT`                  | `8080`                  | Puerto de la pasarela                       |
| `PYTHON_API_BASE_URL`   | `http://localhost:8001` | URL base del servicio de IA                 |
| `CORS_ALLOWED_ORIGIN`   | `http://localhost:5173` | Origen permitido para el frontend           |

### Frontend (Vite)

| Variable            | Por defecto                  | Descripción                        |
| ------------------- | ---------------------------- | ---------------------------------- |
| `VITE_API_BASE_URL` | `http://localhost:8080/api`  | URL base de la pasarela Spring Boot |

> Define las variables del frontend en un archivo `.env` dentro de `frontend/`.

---

## 🔌 API

### `POST /api/prediccion/smart-stock` (Spring Boot)

Endpoint público que consume el frontend. Valida los rangos antes de invocar al modelo.

**Request**

| Campo                 | Tipo    | Rango  | Descripción                                   |
| --------------------- | ------- | ------ | --------------------------------------------- |
| `precio`              | number  | 1–5000 | Precio del producto                           |
| `stock_actual`        | integer | 0–10000| Unidades en stock                             |
| `ventas_7d`           | integer | 0–5000 | Ventas de los últimos 7 días                  |
| `descuento_pct`       | number  | 0–90   | Descuento aplicado (%)                         |
| `temporada`           | integer | 0–2    | 0 = normal, 1 = campaña, 2 = feriado/alta      |
| `dias_sin_reabastecer`| integer | 0–120  | Días desde el último reabastecimiento         |
| `rating_producto`     | number  | 1–5    | Valoración media del producto                 |

**Response `200 OK`**

```json
{
  "caso": "SmartStock360",
  "prediccion": "DEMANDA_ALTA_REABASTECER",
  "confianza": 0.87,
  "ranking": [
    { "clase": "DEMANDA_ALTA_REABASTECER", "probabilidad": 0.87 },
    { "clase": "DEMANDA_MEDIA_MONITOREAR", "probabilidad": 0.10 },
    { "clase": "DEMANDA_BAJA_OPTIMIZAR",   "probabilidad": 0.03 }
  ],
  "recomendaciones": [
    "Reabastecer en las próximas 48 horas.",
    "Mantener promoción si el margen lo permite.",
    "Mostrar alerta roja en el dashboard."
  ],
  "entrada": { "precio": 129.9, "stock_actual": 80, "...": "..." }
}
```

> El servicio de Python expone además otros modelos de demostración (`/predict/utp-risk`,
> `/predict/fraud-shield`, `/predict/cyber-sentinel`, `/predict/talent-match`) y las rutas
> auxiliares `/health` y `/metadata`. SmartStock360 solo consume `/predict/smart-stock`.

---

## 🔄 Flujo de datos

1. **React** captura las 7 variables en un formulario validado por rangos.
2. **Axios** envía `POST /api/prediccion/smart-stock` a **Spring Boot** (nunca a Python directo).
3. **Spring Boot** valida el DTO con `@Valid` y, vía **RestTemplate**, llama a
   `POST http://localhost:8001/predict/smart-stock`.
4. **Python** ejecuta el `RandomForest` y devuelve `prediccion`, `confianza`, `ranking` y `recomendaciones`.
5. **Spring Boot** mapea la respuesta a un DTO tipado y la retorna a React.
6. **React** pinta la tarjeta de predicción, el semáforo de reposición y las recomendaciones.

---

## ☁ Despliegue

Ambos servicios de backend incluyen un `Dockerfile` listo para producción:

- `backend/Dockerfile` — build multi-stage con Maven + JRE 17, expone el puerto `8080`.
- `python-service/Dockerfile` — imagen `python:3.11-slim`, expone el puerto `8001`.

Los servicios están preparados para **Render**: leen `PORT`, `PYTHON_API_BASE_URL` y
`CORS_ALLOWED_ORIGIN` desde variables de entorno, evitando URLs hardcodeadas.

```bash
# Build local de imágenes
docker build -t smartstock-python ./python-service
docker build -t smartstock-gateway ./backend
```

---

## 👤 Autor

**André Quispe** — UTP, Ingeniería de Software · JavaScript Avanzado (Semana 15, PC3).
