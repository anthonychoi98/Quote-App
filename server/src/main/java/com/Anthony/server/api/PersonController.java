package com.Anthony.server.api;
import com.Anthony.server.model.*;
import com.Anthony.server.service.PersonService;
import com.mashape.unirest.http.exceptions.UnirestException;

import java.util.List;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;  

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

    @PostMapping("/add")
    public void addPerson(@RequestBody Person person){
        personService.addPerson(person);
    }

    @PostMapping("addQuote")
    //public void addQuote(@RequestBody String booktitle, @RequestBody String quote, @RequestBody int chapter, @RequestBody Date date){
    public void addQuote(@RequestBody String booktitle) throws ParseException{

        String quote = "hello world";

        String date1 = "01/28/2020";
        Date date = new SimpleDateFormat("dd/MM/yyyy").parse(date1);  

        personService.insertQuote("ssw", quote, 12, date);
    }

    @GetMapping("/getQuotes")
    public List<String> getQuotes(){
        List<String> list = new ArrayList<>();
        list.add("h");
        personService.getQuotes();
        return list;
    }

    @GetMapping("/api/hello")
    public String hello() {
        return "Hello, the time at the server is now " + new Date() + "\n";
    }
    

    @GetMapping("/get")
    public List<Person> getAllPeople(){
        return personService.getAllPeople();
    }



}