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

    int insertQuote(String title, String author, String quote, int chapter, Date date);

    List<Person>selectAllPeople();

    List<Quote> getQuotes(List<Quote>list);

    List<Book> getBooks(List<Book>list);

    int insertBook(String booktitle, String author);

    boolean login(String email, String password);





    String getTotals() throws UnirestException;

    String getCountryTotals() throws UnirestException;



}