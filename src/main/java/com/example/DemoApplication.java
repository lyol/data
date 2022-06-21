package com.example;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Slf4j
@SpringBootApplication(scanBasePackages = "com.example")
@EnableTransactionManagement
@EnableCaching
public class DemoApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		log.debug("开始启动服务：");
		SpringApplication.run(DemoApplication.class, args);
	}

	@Override
	public void configurePathMatch(PathMatchConfigurer configurer) {
		configurer.setUseRegisteredSuffixPatternMatch(true);
	}
}
