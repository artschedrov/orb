package com.example.server;

import com.example.server.enumeration.Status;
import com.example.server.model.Server;
import com.example.server.repo.ServerRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);

	}

//	@Bean
//	CommandLineRunner run(ServerRepo serverRepo) {
//		return args -> {
////			serverRepo.save(new Server(
////					null,
////					"192.168.1.160",
////					"Fedora Server",
////					"16 GB",
////					"Virtual server",
////					Status.SERVER_UP
////			));
////			serverRepo.save(new Server(
////					null,
////					"192.122.1.16",
////					"Ubuntu Server",
////					"8 GB",
////					"Virtual server",
////					Status.SERVER_UP
////			));
//			serverRepo.findAll();
//		};
//	}

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:4200"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
				"Access-Control-Request-Method", "Accept", "Jwt-Token", "Authorization", "Origin, Accept",
				"X-Requested-With", "Access-Control-Request-Headers", "Access-Control-Allow-Origin"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
				"Access-Control-Allow-Credentials", "Filename", "Accept", "Jwt-Token", "Authorization"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(urlBasedCorsConfigurationSource);
	}

}
