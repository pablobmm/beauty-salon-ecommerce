package com.pablobmm.backend.service;

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

    public List<Servico> listarTodos() {
        return repository.findAll();
    }

    public Servico salvar(Servico servico) {
        return repository.save(servico);
    }
}