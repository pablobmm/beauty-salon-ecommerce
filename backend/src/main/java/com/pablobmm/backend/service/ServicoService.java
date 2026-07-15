package com.pablobmm.backend.service;

import com.pablobmm.backend.dto.ServicoRequestDTO;
import com.pablobmm.backend.dto.ServicoResponseDTO;
import com.pablobmm.backend.entity.Servico;
import com.pablobmm.backend.mapper.ServicoMapper;
import com.pablobmm.backend.repository.ServicoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicoService {

    private final ServicoRepository repository;
    private final ServicoMapper mapper;

    public ServicoService(ServicoRepository repository,
                          ServicoMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<ServicoResponseDTO> listarTodos() {
        return repository.findAll()
                .stream()
                .map(mapper::paraResponseDTO)
                .toList();
    }

    public ServicoResponseDTO buscarPorId(Long id) {
        Servico servico = buscarEntidadePorId(id);
        return mapper.paraResponseDTO(servico);
    }

    public ServicoResponseDTO salvar(ServicoRequestDTO dto) {
        Servico servico = mapper.paraEntidade(dto);

        Servico servicoSalvo = repository.save(servico);

        return mapper.paraResponseDTO(servicoSalvo);
    }

    public ServicoResponseDTO atualizarPorId(Long id, ServicoRequestDTO dto) {
        Servico servico = buscarEntidadePorId(id);

        mapper.atualizarEntidade(dto,servico);

        Servico servicoAtualizado = repository.save(servico);

        return mapper.paraResponseDTO(servicoAtualizado);
    }

    public void deletar(Long id) {
        Servico servico = buscarEntidadePorId(id);
        repository.delete(servico);
    }

    private Servico buscarEntidadePorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
    }

}