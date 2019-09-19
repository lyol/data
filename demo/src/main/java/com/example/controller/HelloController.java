package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.pojo.CityCodeDO;
import com.example.service.CityCodeService;

@RestController
@RequestMapping("hello")
public class HelloController {

	@Autowired
	CityCodeService cityCodeService;

	@GetMapping("/index")
	public String page(Model model) {
		return "index";
	}

	@RequestMapping("/query")
	@ResponseBody
	public CityCodeDO query(String id) {
		CityCodeDO city = cityCodeService.findById(id);
		return city;
	}
}
