package com.Anthony.server.api;
import com.Anthony.server.jwt.MyUserDetailsService;
import com.Anthony.server.model.*;
import com.Anthony.server.service.PersonService;
import com.google.gson.Gson;
import com.mashape.unirest.http.exceptions.UnirestException;

import java.util.List;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@RestController("/api")
public class PersonController {
    
    private final MyUserDetailsService personService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public PersonController(MyUserDetailsService personService){
        this.personService = personService;
    }

    @GetMapping("/totals")
    public String getTotals() throws UnirestException{
        return personService.getTotals();
    }

    @GetMapping("/countrytotals")
    public String getStateTotals() throws UnirestException{
        return personService.getCountryTotals();
    }

    @PostMapping("addQuote")
    public ResponseEntity<HttpStatus> addQuote(@RequestBody String data) throws ParseException{

        Gson gson = new Gson();

        Quote quote =  gson.fromJson(data, Quote.class);

        return personService.insertQuote(quote.title, quote.author, quote.quote, quote.chapter, quote.comment, quote.username);
    }

    @DeleteMapping("/deleteQuote")
    public ResponseEntity<HttpStatus> deleteQuote(@RequestBody String data){
        System.out.println("deleting quote: " + data);

        Gson gson = new Gson();

        Quote quote = gson.fromJson(data, Quote.class);

        return personService.deleteQuote(quote.title, quote.author, quote.chapter, quote.quote, quote.comment, quote.username);
    }

    @PostMapping("/getQuotes")
    public List<String> getQuotes(@RequestBody String data){
        List<Quote> quotes = new ArrayList<>();

        List<String> list = new ArrayList<String>();
        Gson gson = new Gson();
        Book book = gson.fromJson(data, Book.class);

        System.out.println("getting quotes : username =" + book.title);

        quotes = personService.getQuotes(book.title, book.author, book.username);

        for(Quote quote : quotes){
            list.add(gson.toJson(quote));
        }
        
        return list;
    }

    @PostMapping("/addBook")
    public ResponseEntity<HttpStatus> addBook(@RequestBody String data) throws ParseException{
        System.out.println("adding book : " + data);

        Gson gson = new Gson();

        Book book = gson.fromJson(data, Book.class);

        return personService.insertBook(book.title, book.author, book.username);
    }

    @DeleteMapping("/deleteBook")
    public ResponseEntity<HttpStatus> deleteBook(@RequestBody String data){
        System.out.println("deleting book: " + data);

        Gson gson = new Gson();

        Book book = gson.fromJson(data, Book.class);

        return personService.deleteBook(book.title, book.author, book.username);
    }

    @PostMapping("/getBooks")
    public List<String> getBooks(@RequestBody String username){
        System.out.println("getting books");
        List<Book> books = new ArrayList<>();

        List<String> list = new ArrayList<String>();

        Gson gson = new Gson();
        
        books = personService.getBooks(username);

        for(Book book : books){
            System.out.println(book.title);
            list.add(gson.toJson(book));
        }
        
        return list;
    }

    @PostMapping("/personInfo")
    public ResponseEntity<Person> personInfo(@RequestBody String data){
        //use bcrypt to decode password before checking data 
        System.out.println("login data: " + data);
        return personService.personInfo(data);
    }

    // @PostMapping("/login")
    // public boolean login(@RequestBody String data){
    //     System.out.println("here is the data: " + data);
    //     JSONObject jsonObject = new JSONObject(data);
    //     //String username = jsonObject.getString("username"); 
    //     String email = jsonObject.getString("email"); 
    //     String password = jsonObject.getString("password"); 
    //     return personService.login(email, password);
    // }  
    
    @PostMapping("/signup")
    public boolean signup(@RequestBody String data){

        JSONObject jsonObject = new JSONObject(data);
        String username = jsonObject.getString("username"); 
        String email = jsonObject.getString("email"); 
        String password = jsonObject.getString("password"); 

        String encodedPassword = bCryptPasswordEncoder.encode(password);

        System.out.println("encoded password: " + encodedPassword);
        
        return personService.signup(username, email, encodedPassword);
    }


}