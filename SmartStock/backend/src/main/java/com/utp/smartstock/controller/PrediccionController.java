package com.utp.smartstock.controller;

import com.utp.smartstock.dto.PrediccionResponse;
import com.utp.smartstock.dto.SmartStockRequest;
import com.utp.smartstock.service.SmartStockService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Endpoint propio de la pasarela SmartStock360.
 *
 * React llama a POST /api/prediccion/smart-stock (nunca a Python directamente).
 * @Valid dispara las validaciones de rango del DTO antes de tocar el servicio.
 */
@RestController
@RequestMapping("/api/prediccion")
public class PrediccionController {

    private final SmartStockService smartStockService;

    public PrediccionController(SmartStockService smartStockService) {
        this.smartStockService = smartStockService;
    }

    @PostMapping("/smart-stock")
    public ResponseEntity<PrediccionResponse> predecirDemanda(
            @Valid @RequestBody SmartStockRequest request) {
        PrediccionResponse respuesta = smartStockService.predecirDemanda(request);
        return ResponseEntity.ok(respuesta);
    }
}
