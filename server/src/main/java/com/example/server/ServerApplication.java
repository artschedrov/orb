package com.example.server;

import com.example.server.enumeration.Status;
import com.example.server.model.Server;
import com.example.server.repo.ServerRepo;
import org.apache.catalina.filters.CorsFilter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);

	}

	@Bean
	CommandLineRunner run(ServerRepo serverRepo) {
		return args -> {
			serverRepo.save(new Server(
					null,
					"192.168.1.160",
					"Fedora Server",
					"16 GB",
					"Virtual server",
					"http://localhost:8080/server/image/server.png",
					Status.SERVER_UP
			));
			serverRepo.save(new Server(
					null,
					"192.122.1.16",
					"Ubuntu Server",
					"8 GB",
					"Virtual server",
					"http://localhost:8080/server/image/server.png",
					Status.SERVER_UP
			));
		};
	}

//	@Bean
//	public CorsFilter corsFilter() {
//		UrlBasedCorsConfigurationSource
//	}

}
