package com.utp.smartstock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Punto de entrada de la pasarela Spring Boot (CASO 4 - SmartStock360).
 *
 * Arquitectura:
 *   React (5173) -> Spring Boot (8080) -> Python FastAPI (8001) -> Modelo RandomForest
 *
 * Spring Boot NO predice: valida, ordena los datos y delega la predicción a Python.
 */
@SpringBootApplication
public class SmartStockApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartStockApplication.class, args);
    }
}
