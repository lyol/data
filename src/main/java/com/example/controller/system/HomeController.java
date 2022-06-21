package com.example.controller.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.service.system.HomePageService;

@Controller
public class HomeController {
	@Autowired
	HomePageService homePageService;

    @GetMapping("/home/home")
    public String home() {
        return "home";
    }
   
}
