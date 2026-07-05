package com.utp.smartstock.exception;

/**
 * Excepción de dominio: representa cualquier fallo al consumir el servicio Python
 * (caído, timeout o respuesta inválida). El GlobalExceptionHandler la traduce
 * a una respuesta HTTP clara para React.
 */
public class PythonServiceException extends RuntimeException {

    public PythonServiceException(String message) {
        super(message);
    }
}
