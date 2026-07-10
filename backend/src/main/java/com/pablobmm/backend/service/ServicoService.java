package com.pablobmm.backend.service;

import com.pablobmm.backend.dto.ServicoRequestDTO;
import com.pablobmm.backend.dto.ServicoResponseDTO;
import com.pablobmm.backend.entity.Servico;
import com.pablobmm.backend.repository.ServicoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicoService {

    private final ServicoRepository repository;

    public ServicoService(ServicoRepository repository) {
        this.repository = repository;
    }

    public List<ServicoResponseDTO> listarTodos() {
        return repository.findAll()
                .stream()
                .map(this::converterParaResponse)
                .toList();
    }

    public ServicoResponseDTO buscarPorId(Long id) {
        Servico servico = buscarEntidadePorId(id);
        return converterParaResponse(servico);
    }

    public ServicoResponseDTO salvar(ServicoRequestDTO dto) {
        Servico servico = new Servico();

        servico.setNome(dto.nome());
        servico.setPreco(dto.preco());
        servico.setDuracaoMinutos(dto.duracaoMinutos());

        Servico salvo = repository.save(servico);

        return converterParaResponse(salvo);
    }

    public ServicoResponseDTO atualizarPorId(Long id, ServicoRequestDTO dto) {
        Servico servico = buscarEntidadePorId(id);

        servico.setNome(dto.nome());
        servico.setPreco(dto.preco());
        servico.setDuracaoMinutos(dto.duracaoMinutos());

        Servico atualizado = repository.save(servico);

        return converterParaResponse(atualizado);
    }

    public void deletar(Long id) {
        Servico servico = buscarEntidadePorId(id);
        repository.delete(servico);
    }

    private Servico buscarEntidadePorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
    }

    private ServicoResponseDTO converterParaResponse(Servico servico) {
        return new ServicoResponseDTO(
                servico.getId(),
                servico.getNome(),
                servico.getPreco(),
                servico.getDuracaoMinutos()
        );
    }
}