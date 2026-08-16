package com.karma.renovation.config;

import com.karma.renovation.entity.AppUser;
import com.karma.renovation.entity.Role;
import com.karma.renovation.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminDataInitializer
        implements CommandLineRunner {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    private final String adminUsername;
    private final String adminPassword;
    private final String adminEmail;
    private final String adminFullName;

    public AdminDataInitializer(
            AppUserRepository appUserRepository,
            PasswordEncoder passwordEncoder,

            @Value("${app.admin.username}")
            String adminUsername,

            @Value("${app.admin.password}")
            String adminPassword,

            @Value("${app.admin.email}")
            String adminEmail,

            @Value("${app.admin.full-name}")
            String adminFullName
    ) {

        this.appUserRepository =
                appUserRepository;

        this.passwordEncoder =
                passwordEncoder;

        this.adminUsername =
                adminUsername;

        this.adminPassword =
                adminPassword;

        this.adminEmail =
                adminEmail;

        this.adminFullName =
                adminFullName;
    }

    @Override
    public void run(
            String... args
    ) {

        AppUser admin =
                appUserRepository
                        .findByUsername(
                                adminUsername
                        )
                        .orElse(null);

        if (admin == null) {

            admin =
                    new AppUser();

            admin.setFullName(
                    adminFullName
            );

            admin.setUsername(
                    adminUsername
            );

            admin.setEmail(
                    adminEmail
            );

            admin.setRole(
                    Role.ADMIN
            );

            admin.setEnabled(true);

            System.out.println(
                    "Default ADMIN account created."
            );

        } else {

            admin.setFullName(
                    adminFullName
            );

            admin.setEmail(
                    adminEmail
            );

            admin.setRole(
                    Role.ADMIN
            );

            admin.setEnabled(true);

            System.out.println(
                    "Existing ADMIN account updated."
            );
        }

        admin.setPassword(
                passwordEncoder.encode(
                        adminPassword
                )
        );

        appUserRepository.save(admin);
    }
}