package com.pablobmm.backend.dto;

import com.pablobmm.backend.enums.Especialidade;

public record ProfissionalResponseDTO(
        Long id,
        String nome,
        String telefone,
        Especialidade Especialidade
) {
}
