package com.utp.smartstock.service;

import com.utp.smartstock.dto.PrediccionResponse;
import com.utp.smartstock.dto.SmartStockRequest;
import com.utp.smartstock.exception.PythonServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.RestTemplate;

/**
 * Capa de negocio: consume el modelo IA de Python vía RestTemplate.
 *
 * Responsabilidad: armar la petición POST hacia /predict/smart-stock,
 * traducir la respuesta al DTO tipado y convertir cualquier fallo de red
 * en una excepción de dominio manejable por el GlobalExceptionHandler.
 */
@Service
public class SmartStockService {

    private static final Logger log = LoggerFactory.getLogger(SmartStockService.class);
    private static final String PREDICT_PATH = "/predict/smart-stock";

    private final RestTemplate restTemplate;
    private final String pythonBaseUrl;

    public SmartStockService(RestTemplate restTemplate,
                             @Value("${python.api.base-url}") String pythonBaseUrl) {
        this.restTemplate = restTemplate;
        this.pythonBaseUrl = pythonBaseUrl;
    }

    public PrediccionResponse predecirDemanda(SmartStockRequest request) {
        String url = pythonBaseUrl + PREDICT_PATH;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<SmartStockRequest> httpEntity = new HttpEntity<>(request, headers);

        log.info("Consumiendo modelo IA -> POST {}", url);

        try {
            ResponseEntity<PrediccionResponse> response =
                    restTemplate.postForEntity(url, httpEntity, PrediccionResponse.class);

            PrediccionResponse body = response.getBody();
            if (body == null || body.getPrediccion() == null) {
                throw new PythonServiceException("El servicio Python respondió sin predicción.");
            }

            log.info("Predicción recibida: {} (confianza {})",
                    body.getPrediccion(), body.getConfianza());
            return body;

        } catch (ResourceAccessException ex) {
            // Python apagado o timeout
            log.error("No hay conexión con el servicio Python: {}", ex.getMessage());
            throw new PythonServiceException(
                    "No se pudo conectar con el modelo IA (Python en " + pythonBaseUrl
                            + "). Verifica que esté ejecutándose.");
        } catch (RestClientResponseException ex) {
            // Python respondió con 4xx/5xx (por ejemplo, validación pydantic)
            log.error("El servicio Python devolvió {}: {}",
                    ex.getStatusCode(), ex.getResponseBodyAsString());
            throw new PythonServiceException(
                    "El modelo IA rechazó la solicitud: " + ex.getStatusText());
        }
    }
}
