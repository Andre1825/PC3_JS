package com.utp.smartstock.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

/**
 * Registra un RestTemplate con timeouts explícitos para consumir el servicio Python.
 * Sin timeouts, si Python cae la petición de React quedaría colgada indefinidamente.
 */
@Configuration
public class RestTemplateConfig {

    @Value("${python.api.connect-timeout}")
    private long connectTimeout;

    @Value("${python.api.read-timeout}")
    private long readTimeout;

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder
                .setConnectTimeout(Duration.ofMillis(connectTimeout))
                .setReadTimeout(Duration.ofMillis(readTimeout))
                .build();
    }
}
