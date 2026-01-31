package com.kodnest.app.controllers;

import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kodnest.app.entities.User;
import com.kodnest.app.services.LoginService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LoginController {
		LoginService loginService;
		

		public LoginController(LoginService loginService) {
			super();
			this.loginService = loginService;
		}
		
		@PostMapping("/login")
		public Map<String, String > login(@RequestBody Map<String,String> request) {
			Map<String, String> response = new HashMap<>();;
			try {
			String username = request.get("username");
			String password = request.get("password");
			User user = loginService.authenticate(username, password);
			
 
			response.put("username", user.getUsername());
			response.put("success", "Login succesfull");
			return response;
			}
			catch (Exception e) {
				// TODO: handle exception
				response.put("username", null);
				response.put("Failed", e.getMessage());
				return response;
			}
		}
}
