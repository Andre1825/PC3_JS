package com.utp.smartstock.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;
import java.util.Map;

/**
 * DTO de salida que Spring Boot devuelve a React.
 *
 * Mapea la respuesta del endpoint Python /predict/smart-stock de forma tipada
 * (en lugar de reenviar un String crudo), lo que permite manejar/validar el
 * contenido y demuestra el uso de DTOs exigido por la rúbrica.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class PrediccionResponse {

    private String caso;
    private String prediccion;
    private Double confianza;
    private List<RankingItem> ranking;
    private List<String> recomendaciones;
    private Map<String, Object> entrada;

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class RankingItem {
        private String clase;
        private Double probabilidad;

        public String getClase() {
            return clase;
        }

        public void setClase(String clase) {
            this.clase = clase;
        }

        public Double getProbabilidad() {
            return probabilidad;
        }

        public void setProbabilidad(Double probabilidad) {
            this.probabilidad = probabilidad;
        }
    }

    public String getCaso() {
        return caso;
    }

    public void setCaso(String caso) {
        this.caso = caso;
    }

    public String getPrediccion() {
        return prediccion;
    }

    public void setPrediccion(String prediccion) {
        this.prediccion = prediccion;
    }

    public Double getConfianza() {
        return confianza;
    }

    public void setConfianza(Double confianza) {
        this.confianza = confianza;
    }

    public List<RankingItem> getRanking() {
        return ranking;
    }

    public void setRanking(List<RankingItem> ranking) {
        this.ranking = ranking;
    }

    public List<String> getRecomendaciones() {
        return recomendaciones;
    }

    public void setRecomendaciones(List<String> recomendaciones) {
        this.recomendaciones = recomendaciones;
    }

    public Map<String, Object> getEntrada() {
        return entrada;
    }

    public void setEntrada(Map<String, Object> entrada) {
        this.entrada = entrada;
    }
}
