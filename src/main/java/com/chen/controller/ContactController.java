package com.chen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.chen.model.Contact;
import com.chen.service.IFirstService;

@Controller
public class ContactController {
	@Autowired
	private IFirstService firstService;
	
	@RequestMapping("/find.do")
	public ModelAndView findById() {
		ModelAndView mav = new ModelAndView("index");   
        Contact person = firstService.FindById(1);
        mav.addObject("perosn", person);   
        return mav;
	}
	
}
