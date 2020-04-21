package com.Anthony.server.api;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@RestController("/api")
public class PersonController {
    
    private final PersonService personService;

    @Autowired
    public PersonController(PersonService personService){
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

  /*  @PostMapping("/add")
    public void addPerson(@RequestBody Person person){
        personService.addPerson(person);
    }*/

    @PostMapping("addQuote")
    //public void addQuote(@RequestBody String booktitle, @RequestBody String quote, @RequestBody int chapter, @RequestBody Date date){
    public void addQuote(@RequestBody String data) throws ParseException{

        String quote = "hello world";
        String author = "haruki";
        String comment = "";
        String date1 = "01/28/2020";
        Date date = new SimpleDateFormat("dd/MM/yyyy").parse(date1);  

        personService.insertQuote("ssw", author, data, 12, comment, date);
    }

    @GetMapping("/getQuotes")
    public List<String> getQuotes(){
        List<Quote> quotes = new ArrayList<>();

        List<String> list = new ArrayList<String>();

        Gson gson = new Gson();
        
        quotes = personService.getQuotes(quotes);

        for(Quote quote : quotes){
            list.add(gson.toJson(quote));
        }
        
        return list;
    }

    @PostMapping("addBook")
    public void addBook(@RequestBody String data) throws ParseException{

        personService.insertBook("book_title", "author");
    }

    @GetMapping("/getBooks")
    public List<String> getBooks(){
        List<Book> books = new ArrayList<>();

        List<String> list = new ArrayList<String>();

        Gson gson = new Gson();
        
        books = personService.getBooks(books);

        for(Book book : books){
            list.add(gson.toJson(book));
        }
        
        return list;
    }

    @PostMapping("/login")
    public boolean login(@RequestBody String data){
        System.out.println("here is the data: " + data);
        JSONObject jsonObject = new JSONObject(data);
        //String username = jsonObject.getString("username"); 
        String email = jsonObject.getString("email"); 
        String password = jsonObject.getString("password"); 
        return personService.login(email, password);
    }  
    
    @PostMapping("/signup")
    public boolean signup(@RequestBody String data){

        JSONObject jsonObject = new JSONObject(data);
        String username = jsonObject.getString("username"); 
        String email = jsonObject.getString("email"); 
        String password = jsonObject.getString("password"); 
        
        return personService.signup(username, email, password);
    }
    

    @GetMapping("/get")
    public List<Person> getAllPeople(){
        return personService.getAllPeople();
    }



}