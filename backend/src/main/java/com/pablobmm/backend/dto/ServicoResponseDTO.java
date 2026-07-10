package com.pablobmm.backend.dto;

import java.math.BigDecimal;

public record ServicoResponseDTO(
        Long id,
        String nome,
        BigDecimal preco,
        Integer duracaoMinutos
) {
}