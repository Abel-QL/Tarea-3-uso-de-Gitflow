package zd.inventariobackend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import zd.inventariobackend.model.User;
import zd.inventariobackend.repository.IUserRepository;

@Configuration
public class DataInitializer {
//creamos un usuario por defecto
    @Bean
    CommandLineRunner initAdmin(IUserRepository repo, PasswordEncoder encoder) {
        return args -> {
            if (repo.findByUsername("admin").isEmpty()) {
                repo.save(new User(null, "admin", encoder.encode("admin123"), "ADMIN"));
            }
        };
    }
}