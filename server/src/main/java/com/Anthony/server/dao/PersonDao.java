package com.Anthony.server.dao;
import com.Anthony.server.model.*;
import com.mashape.unirest.http.exceptions.UnirestException;

import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface PersonDao {

    int insertPerson(UUID id, Person person);
    
    default int insertPerson(Person person){
        UUID id = UUID.randomUUID();
        return insertPerson(id, person);
    }

    int insertQuote(String quote, String title, int chapter, Date date);

    List<Person>selectAllPeople();

    List<String> getQuotes();

    String getTotals() throws UnirestException;

    String getCountryTotals() throws UnirestException;



}