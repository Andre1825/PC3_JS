package com.utp.smartstock.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Traduce las excepciones de la aplicación a respuestas JSON coherentes,
 * de modo que React siempre reciba un cuerpo de error legible.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /** Errores de validación de rangos del DTO -> 400 con detalle por campo. */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errores = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errores.put(error.getField(), error.getDefaultMessage());
        }
        Map<String, Object> body = baseBody(HttpStatus.BAD_REQUEST, "Datos de entrada inválidos");
        body.put("errores", errores);
        return ResponseEntity.badRequest().body(body);
    }

    /** Fallo al consumir Python -> 502 Bad Gateway (la pasarela no pudo cumplir). */
    @ExceptionHandler(PythonServiceException.class)
    public ResponseEntity<Map<String, Object>> handlePython(PythonServiceException ex) {
        Map<String, Object> body = baseBody(HttpStatus.BAD_GATEWAY, ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(body);
    }

    /** Red de seguridad para cualquier otro error no previsto. */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneric(Exception ex) {
        Map<String, Object> body = baseBody(
                HttpStatus.INTERNAL_SERVER_ERROR, "Error interno: " + ex.getMessage());
        return ResponseEntity.internalServerError().body(body);
    }

    private Map<String, Object> baseBody(HttpStatus status, String mensaje) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now().toString());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("mensaje", mensaje);
        return body;
    }
}
