package com.Anthony.server.service;
import com.Anthony.server.dao.*;
import com.Anthony.server.model.*;
import com.mashape.unirest.http.exceptions.UnirestException;

import java.util.Date;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    private final PersonDao personDao;

    @Autowired
    public PersonService(@Qualifier("fakeDao")PersonDao personDao) {
        this.personDao = personDao;
    }

    public int insertQuote(String booktitle, String author, String quote, int chapter, String comment, Date date){
        return personDao.insertQuote(booktitle, author, quote, chapter, comment, date);
    }

    public List<Quote> getQuotes(List<Quote>list){
        return personDao.getQuotes(list);
    }
    

  /*  public int addPerson(Person person){
        return personDao.insertPerson(person);
    }*/

    public int insertBook(String booktitle, String author){
        return personDao.insertBook(booktitle, author);
    }

    public List<Book> getBooks(List<Book>list){
        return personDao.getBooks(list);
    }

    public ResponseEntity<Person> personInfo(String username){
        return personDao.personInfo(username);
    }

    public boolean login(String email, String password){
        return personDao.login(email, password);
    }

    public boolean signup(String username, String email, String password){
        return personDao.signup(username, email, password);
    }










    public List<Person> getAllPeople(){
        return personDao.selectAllPeople();
    }

    public String getTotals() throws UnirestException{
        return personDao.getTotals();
    }

    public String getCountryTotals() throws UnirestException{
        return personDao.getCountryTotals();
    }

}