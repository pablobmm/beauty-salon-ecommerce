package com.pablobmm.backend.controller;

import com.pablobmm.backend.entity.Servico;
import com.pablobmm.backend.service.ServicoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servicos")
@CrossOrigin(origins = "http://localhost:5173")
public class ServicoController {

    private final ServicoService service;

    public ServicoController(ServicoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Servico> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Servico buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Servico atualizarPorId(@PathVariable Long id,
                                  @RequestBody Servico servico) {
        return service.atualizarPorId(id,servico);
    }

    @PostMapping
    public Servico salvar(@RequestBody Servico servico) {
        return service.salvar(servico);
    }
}