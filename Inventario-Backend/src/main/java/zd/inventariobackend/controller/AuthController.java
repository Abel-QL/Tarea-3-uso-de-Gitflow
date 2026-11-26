package zd.inventariobackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import zd.inventariobackend.repository.IUserRepository;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
//autentificacion
    private final IUserRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public record LoginRequest(String username, String password) {
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.username() == null || request.username().isBlank() || request.password() == null || request.password().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Usuario y contraseña requeridos"));
        }

        return usuarioRepository.findByUsername(request.username()).filter(u -> passwordEncoder.matches(request.password(), u.getPassword())).<ResponseEntity<?>>map(u -> ResponseEntity.ok(Map.of("username", u.getUsername(), "role", u.getRole(), "mensaje", "Login exitoso"))).orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Credenciales inválidas")));
    }
}