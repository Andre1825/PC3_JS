# SmartStock360 · Guía de arranque (3 capas)

CASO 4 — Predicción de demanda e inventario.
Arquitectura: **React (5173) → Spring Boot (8080) → Python FastAPI (8001) → RandomForest**

> Levanta los servicios en este orden: **1) Python → 2) Spring Boot → 3) React**.

---

## 1. Modelo IA (Python FastAPI) — puerto 8001

```bash
# desde la carpeta raíz SmartStock/
python -m venv venv
venv\Scripts\activate            # Windows
pip install -r requirements.txt
uvicorn app:app --reload --port 8001
```

Verifica: http://localhost:8001/docs (debe existir `POST /predict/smart-stock`).

## 2. Pasarela (Spring Boot) — puerto 8080

Requisitos: **JDK 17** y **Maven**.

```bash
cd backend
mvn spring-boot:run
```

Prueba rápida con Postman / curl:

```bash
curl -X POST http://localhost:8080/api/prediccion/smart-stock ^
  -H "Content-Type: application/json" ^
  -d "{\"precio\":129.90,\"stock_actual\":80,\"ventas_7d\":420,\"descuento_pct\":20,\"temporada\":2,\"dias_sin_reabastecer\":18,\"rating_producto\":4.6}"
```

## 3. Frontend (React + Vite) — puerto 5173

```bash
cd frontend
npm install
npm run dev
```

Abre http://localhost:5173

---

## Flujo de datos (resumen)

1. **React** captura las 7 variables en un formulario validado (rangos).
2. **Axios** hace `POST /api/prediccion/smart-stock` a **Spring Boot** (nunca a Python directo).
3. **Spring Boot** valida con `@Valid` el DTO, y vía **RestTemplate** hace `POST` a
   `http://localhost:8001/predict/smart-stock`.
4. **Python** ejecuta el RandomForest y devuelve `prediccion`, `confianza`, `ranking`, `recomendaciones`.
5. **Spring Boot** mapea la respuesta a un DTO tipado y la retorna a React.
6. **React** pinta la tarjeta de predicción, el semáforo de reposición y las recomendaciones.

## Estructura

```
SmartStock/
├── app.py                  # Servicio Python (ya entregado)
├── requirements.txt
├── INICIO_RAPIDO.md        # este archivo
├── GUIA_SUSTENTACION.md    # Fase 4: argumentos para la exposición
├── backend/                # Spring Boot (pasarela)
│   ├── pom.xml
│   └── src/main/java/com/utp/smartstock/
│       ├── controller/PrediccionController.java
│       ├── service/SmartStockService.java
│       ├── dto/{SmartStockRequest,PrediccionResponse}.java
│       ├── config/{CorsConfig,RestTemplateConfig}.java
│       └── exception/{PythonServiceException,GlobalExceptionHandler}.java
└── frontend/               # React + Vite
    └── src/
        ├── services/{apiClient,smartStockService}.js
        ├── hooks/{useSmartStock,useProductoForm}.js
        ├── components/{ProductForm,PredictionCard,AlertBadge,RankingBars,RecommendationList,ProductPanel,ProductTable,Navbar}.jsx
        ├── pages/{Dashboard,Catalogo}.jsx
        └── data/productosSimulados.js
```
