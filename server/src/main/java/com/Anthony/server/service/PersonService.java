package com.Anthony.server.service;
import com.Anthony.server.dao.*;
import com.Anthony.server.model.*;
import com.mashape.unirest.http.exceptions.UnirestException;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    private final PersonDao personDao;

    @Autowired
    public PersonService(@Qualifier("fakeDao")PersonDao personDao) {
        this.personDao = personDao;
    }

    public int insertQuote(String booktitle, String quote, int chapter, Date date){
        return personDao.insertQuote(booktitle, quote, chapter, date);
    }

    public List<String> getQuotes(){
        return personDao.getQuotes();
    }
    

    public int addPerson(Person person){
        return personDao.insertPerson(person);
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