package com.pablobmm.backend.controller;

import com.pablobmm.backend.dto.ServicoRequestDTO;
import com.pablobmm.backend.dto.ServicoResponseDTO;
import com.pablobmm.backend.service.ServicoService;
import jakarta.validation.Valid;
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
    public List<ServicoResponseDTO> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ServicoResponseDTO buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public ServicoResponseDTO atualizarPorId(@PathVariable Long id,
                                  @Valid @RequestBody ServicoRequestDTO dto) {
        return service.atualizarPorId(id,dto);
    }

    @PostMapping
    public ServicoResponseDTO salvar(@Valid @RequestBody ServicoRequestDTO dto) {
        return service.salvar(dto);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        service.deletar(id);
    }
}