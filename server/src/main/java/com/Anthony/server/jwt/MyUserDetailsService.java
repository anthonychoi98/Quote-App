package com.Anthony.server.jwt;

import java.util.ArrayList;
import com.Anthony.server.api.*;
import com.Anthony.server.dao.*;
import com.Anthony.server.model.*;
import com.Anthony.server.service.PersonService;
import com.mashape.unirest.http.HttpMethod;
import com.mashape.unirest.http.exceptions.UnirestException;
import java.util.Date;
import java.util.List;

import org.apache.http.HttpStatus;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class MyUserDetailsService implements UserDetailsService {

    private final PersonDao personDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public MyUserDetailsService(@Qualifier("fakeDao") PersonDao personDao) {
        this.personDao = personDao;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException{
        boolean authenticated = false;
        ResponseEntity<Person> pi = personInfo(userName);
        Person person = pi.getBody();

        return new User(person.getUsername(), person.getPassword(), new ArrayList<>());
    }

    public ResponseEntity<org.springframework.http.HttpStatus> insertQuote(String booktitle, String author, String quote, int chapter, String comment, String username){
        return personDao.insertQuote(booktitle, author, quote, chapter, comment, username);
    }

    public ResponseEntity<org.springframework.http.HttpStatus> deleteQuote(String title, String author, int chapter, String quote, String comment, String username){
        return personDao.deleteQuote(title, author, chapter, quote, comment, username);
    }

    public List<Quote> getQuotes(String title, String author, String username){
        return personDao.getQuotes(title, author, username);
    }

    public ResponseEntity<org.springframework.http.HttpStatus> insertBook(String title, String author, String username){
        return personDao.insertBook(title, author, username);
    }

    public ResponseEntity<org.springframework.http.HttpStatus> deleteBook(String title, String author, String username){
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