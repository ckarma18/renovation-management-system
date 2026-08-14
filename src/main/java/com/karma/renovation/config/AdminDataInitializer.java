package com.karma.renovation.config;

import com.karma.renovation.entity.AppUser;
import com.karma.renovation.entity.Role;
import com.karma.renovation.repository.AppUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminDataInitializer implements CommandLineRunner {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminDataInitializer(
            AppUserRepository appUserRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        String adminUsername = "admin";

        AppUser admin = appUserRepository
                .findByUsername(adminUsername)
                .orElse(null);

        if (admin == null) {

            admin = new AppUser();

            admin.setFullName("System Administrator");
            admin.setUsername("admin");
            admin.setEmail("admin@renova.com");
            admin.setRole(Role.ADMIN);
            admin.setEnabled(true);

            System.out.println("Default ADMIN account created.");

        } else {

            admin.setRole(Role.ADMIN);
            admin.setEnabled(true);

            System.out.println("Existing ADMIN account updated.");
        }

        admin.setPassword(
                passwordEncoder.encode("Admin@12345")
        );

        appUserRepository.save(admin);
    }
}