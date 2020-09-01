package com.tudinh.kltn.filter;

import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

public class JWTClient {

    static final String URL_LOGIN = "http://localhost:9999/login";

    // POST Login
    // @return "Authorization string".
    public static String postLogin(String username, String password) {

        // Request Header
        HttpHeaders headers = new HttpHeaders();

        // Request Body
        MultiValueMap<String, String> parametersMap = new LinkedMultiValueMap<String, String>();
        parametersMap.add("username", username);
        parametersMap.add("password", password);

        // Request Entity
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parametersMap, headers);

        // RestTemplate
        RestTemplate restTemplate = new RestTemplate();

        // POST Login
        ResponseEntity<String> response = null;
        boolean flatError = false;

        try {
            response = restTemplate.exchange(URL_LOGIN, //
                    HttpMethod.POST, requestEntity, String.class);
        } catch (Exception e) {
            flatError = true;
        }

        if (flatError) {
            return "";
        }

        HttpHeaders responseHeaders = response.getHeaders();

        List<String> list = responseHeaders.get("Authorization");
        return list == null || list.isEmpty() ? null : list.get(0);
    }
}