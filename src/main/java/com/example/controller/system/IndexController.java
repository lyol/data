package com.example.controller.system;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.controller.BaseController;

@Controller
public class IndexController extends BaseController{

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("nickName", getUser().getNickName());
        return "index";
    }

}
