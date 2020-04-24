package com.Anthony.server.dao;
import com.Anthony.server.model.*;
import com.mashape.unirest.http.exceptions.UnirestException;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface PersonDao {

    String hashPassword(String plainTextPassword);
    boolean checkPass(String plainPassword, String hashedPassword);

    int insertQuote(String title, String author, String quote, int chapter, String comment, Date date);

    List<Person>selectAllPeople();

    List<Quote> getQuotes(List<Quote>list);

    List<Book> getBooks(List<Book>list);

    int insertBook(String booktitle, String author);

    boolean login(String email, String password);
    
    ResponseEntity<Person> personInfo(String username);

    boolean signup(String username, String email, String password);

    String getTotals() throws UnirestException;

    String getCountryTotals() throws UnirestException;



}