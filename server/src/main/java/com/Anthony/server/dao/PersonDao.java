package com.Anthony.server.dao;
import com.Anthony.server.model.*;
import com.mashape.unirest.http.exceptions.UnirestException;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface PersonDao {

    ResponseEntity<HttpStatus> insertQuote(String title, String author, String quote, int chapter, String comment, String username);

    ResponseEntity<HttpStatus> deleteQuote(String title, String author, int chapter, String quote, String comment, String username);

    List<Quote> getQuotes(String title, String author, String username);

    List<Book> getBooks(String username);

    ResponseEntity<HttpStatus> insertBook(String title, String author, String username);

    ResponseEntity<HttpStatus> deleteBook(String title, String author, String username);
    
    ResponseEntity<Person> personInfo(String username);

    boolean signup(String username, String email, String password);

    String getTotals() throws UnirestException;

    String getCountryTotals() throws UnirestException;



}