package com.kodnest.app.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kodnest.app.entities.User;
import com.kodnest.app.repository.UserRepo;

@Service
public class LoginService {
	UserRepo repo;
    private final PasswordEncoder passwordEncoder;

    public LoginService(UserRepo repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }
	
	public User authenticate(String username , String password) {
		User user = repo.findByUsername(username);
		 if (user == null) {
		        throw new RuntimeException("invalid credentials");
		    }

		    try {
		        // decrypt password from DB
		        // compare with entered password
		        if (passwordEncoder.matches(password, user.getPassword())) {
		            return user;
		        } else {
		            throw new RuntimeException("invalid credentials");
		        }

		    } catch (Exception e) {
		        throw new RuntimeException("invalid credentials");
		    }
	}
	
	 public void createUser(String username, String password) {
	        String hashed = passwordEncoder.encode(password);
	        User user = new User(username, hashed);
	        repo.save(user);
	    }
}
