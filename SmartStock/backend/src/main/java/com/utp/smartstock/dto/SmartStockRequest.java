package com.utp.smartstock.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * DTO de entrada que recibe Spring Boot desde React.
 *
 * Los rangos replican EXACTAMENTE las validaciones del modelo Python
 * (pydantic Field ge/le), de modo que una petición inválida se rechaza
 * en la pasarela antes de gastar una llamada al servicio de IA.
 */
public class SmartStockRequest {

    @NotNull(message = "precio es obligatorio")
    @DecimalMin(value = "1", message = "precio mínimo es 1")
    @DecimalMax(value = "5000", message = "precio máximo es 5000")
    private Double precio;

    @NotNull(message = "stock_actual es obligatorio")
    @Min(value = 0, message = "stock_actual mínimo es 0")
    @Max(value = 10000, message = "stock_actual máximo es 10000")
    @JsonProperty("stock_actual")
    private Integer stockActual;

    @NotNull(message = "ventas_7d es obligatorio")
    @Min(value = 0, message = "ventas_7d mínimo es 0")
    @Max(value = 5000, message = "ventas_7d máximo es 5000")
    @JsonProperty("ventas_7d")
    private Integer ventas7d;

    @NotNull(message = "descuento_pct es obligatorio")
    @DecimalMin(value = "0", message = "descuento_pct mínimo es 0")
    @DecimalMax(value = "90", message = "descuento_pct máximo es 90")
    @JsonProperty("descuento_pct")
    private Double descuentoPct;

    @NotNull(message = "temporada es obligatorio")
    @Min(value = 0, message = "temporada válida: 0, 1 o 2")
    @Max(value = 2, message = "temporada válida: 0, 1 o 2")
    private Integer temporada;

    @NotNull(message = "dias_sin_reabastecer es obligatorio")
    @Min(value = 0, message = "dias_sin_reabastecer mínimo es 0")
    @Max(value = 120, message = "dias_sin_reabastecer máximo es 120")
    @JsonProperty("dias_sin_reabastecer")
    private Integer diasSinReabastecer;

    @NotNull(message = "rating_producto es obligatorio")
    @DecimalMin(value = "1", message = "rating_producto mínimo es 1")
    @DecimalMax(value = "5", message = "rating_producto máximo es 5")
    @JsonProperty("rating_producto")
    private Double ratingProducto;

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Integer getStockActual() {
        return stockActual;
    }

    public void setStockActual(Integer stockActual) {
        this.stockActual = stockActual;
    }

    public Integer getVentas7d() {
        return ventas7d;
    }

    public void setVentas7d(Integer ventas7d) {
        this.ventas7d = ventas7d;
    }

    public Double getDescuentoPct() {
        return descuentoPct;
    }

    public void setDescuentoPct(Double descuentoPct) {
        this.descuentoPct = descuentoPct;
    }

    public Integer getTemporada() {
        return temporada;
    }

    public void setTemporada(Integer temporada) {
        this.temporada = temporada;
    }

    public Integer getDiasSinReabastecer() {
        return diasSinReabastecer;
    }

    public void setDiasSinReabastecer(Integer diasSinReabastecer) {
        this.diasSinReabastecer = diasSinReabastecer;
    }

    public Double getRatingProducto() {
        return ratingProducto;
    }

    public void setRatingProducto(Double ratingProducto) {
        this.ratingProducto = ratingProducto;
    }
}
