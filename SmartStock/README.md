# UTP IA Models API - Java Script Avanzado Semana 15

API lista para conectar con Spring Boot.

## Ejecutar

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8001
```

Swagger: http://localhost:8001/docs

## Endpoints

- POST /predict/utp-risk
- POST /predict/fraud-shield
- POST /predict/cyber-sentinel
- POST /predict/smart-stock
- POST /predict/talent-match

## Arquitectura esperada

React -> Spring Boot -> Python FastAPI -> Modelo ML -> Spring Boot -> React
