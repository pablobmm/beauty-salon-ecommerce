package com.pablobmm.backend.dto;

import com.pablobmm.backend.enums.Especialidade;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProfissionalRequestDTO(
        @NotBlank(message = "O nome é obrigatório")
        String nome,

        @NotNull(message = "O telefone é obrigatório")
        String telefone,

        @NotNull(message = "A especialidade é obrigatória")
        Especialidade especialidade
) {
}
