package com.kodnest.app.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kodnest.app.entities.UserDto;
import com.kodnest.app.services.LoginService;

@RestController
@RequestMapping("/reg")
@CrossOrigin
public class RegisterController {

	LoginService loginService;

	public RegisterController(LoginService loginService) {
		super();
		this.loginService = loginService;
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody UserDto userdto) {
		 try {
		        loginService.createUser(
		            userdto.getUsername(),
		            userdto.getPassword()
		        );

		        Map<String, String> response = new HashMap<>();
		        response.put("message", "User registered successfully");

		        return ResponseEntity.status(HttpStatus.CREATED).body(response);

		    } catch (Exception e) {
		        Map<String, String> error = new HashMap<>();
		        error.put("message", e.getMessage());

		        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
		    } 
	}
}
