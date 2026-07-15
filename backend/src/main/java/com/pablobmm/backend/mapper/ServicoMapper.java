package com.pablobmm.backend.mapper;

import com.pablobmm.backend.dto.ServicoRequestDTO;
import com.pablobmm.backend.dto.ServicoResponseDTO;
import com.pablobmm.backend.entity.Servico;
import org.springframework.stereotype.Component;

@Component
public class ServicoMapper {

    public Servico paraEntidade(ServicoRequestDTO dto) {
        Servico servico = new Servico();

        servico.setNome(dto.nome());
        servico.setPreco(dto.preco());
        servico.setDuracaoMinutos(dto.duracaoMinutos());

        return servico;
    }

    public ServicoResponseDTO paraResponseDTO(Servico servico) {
        return new ServicoResponseDTO(
                servico.getId(),
                servico.getNome(),
                servico.getPreco(),
                servico.getDuracaoMinutos()
        );
    }

    public void atualizarEntidade(
            ServicoRequestDTO dto,
            Servico servico
    ) {
        servico.setNome(dto.nome());
        servico.setPreco(dto.preco());
        servico.setDuracaoMinutos(dto.duracaoMinutos());
    }
}