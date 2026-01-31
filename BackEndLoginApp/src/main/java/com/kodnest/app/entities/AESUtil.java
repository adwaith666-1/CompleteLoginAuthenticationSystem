package com.kodnest.app.entities;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class AESUtil {
	 private static final String ALGORITHM = "AES";
	    private static final String SECRET_KEY = "1234567890123456"; // 16 bytes

	    public static String encrypt(String plainText) throws Exception {
	        SecretKeySpec key = new SecretKeySpec(SECRET_KEY.getBytes(), ALGORITHM);
	        Cipher cipher = Cipher.getInstance(ALGORITHM);
	        cipher.init(Cipher.ENCRYPT_MODE, key);
	        byte[] encrypted = cipher.doFinal(plainText.getBytes());
	        return Base64.getEncoder().encodeToString(encrypted);
	    }

	    public static String decrypt(String encryptedText) throws Exception {
	        SecretKeySpec key = new SecretKeySpec(SECRET_KEY.getBytes(), ALGORITHM);
	        Cipher cipher = Cipher.getInstance(ALGORITHM);
	        cipher.init(Cipher.DECRYPT_MODE, key);
	        byte[] decoded = Base64.getDecoder().decode(encryptedText);
	        return new String(cipher.doFinal(decoded));
	    }
}
