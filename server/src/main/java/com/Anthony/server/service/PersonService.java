package com.Anthony.server.service;
import com.Anthony.server.dao.*;
import com.Anthony.server.model.*;
import com.mashape.unirest.http.exceptions.UnirestException;

import java.util.Date;
import java.util.List;

import javax.xml.ws.Response;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    private final PersonDao personDao;

    @Autowired
    public PersonService(@Qualifier("fakeDao")PersonDao personDao) {
        this.personDao = personDao;
    }

    public ResponseEntity<HttpStatus> insertQuote(String booktitle, String author, String quote, int chapter, String comment, String username){
        return personDao.insertQuote(booktitle, author, quote, chapter, comment, username);
    }

    public ResponseEntity<HttpStatus> deleteQuote(String title, String author, int chapter, String quote, String comment, String username){
        return personDao.deleteQuote(title, author, chapter, quote, comment, username);
    }

    public List<Quote> getQuotes(String title, String author, String username){
        return personDao.getQuotes(title, author, username);
    }
    

    public ResponseEntity<HttpStatus> insertBook(String title, String author, String username){
        System.out.println("person service.java " + title + author);
        return personDao.insertBook(title, author, username);
    }

    public ResponseEntity<HttpStatus> deleteBook(String title, String author, String username){
        return personDao.deleteBook(title, author, username);
    }

    public List<Book> getBooks(String username){
        return personDao.getBooks(username);
    }

    public ResponseEntity<Person> personInfo(String username){
        return personDao.personInfo(username);
    }

    // public boolean login(String email, String password){
    //     return personDao.login(email, password);
    // }

    public boolean signup(String username, String email, String password){
        return personDao.signup(username, email, password);
    }










    public String getTotals() throws UnirestException{
        return personDao.getTotals();
    }

    public String getCountryTotals() throws UnirestException{
        return personDao.getCountryTotals();
    }

}