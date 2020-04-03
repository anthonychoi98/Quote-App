package com.Anthony.server.dao;
import com.Anthony.server.model.*;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import org.springframework.stereotype.Repository;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;


@Repository("fakeDao")
public class FakePersonDataAccessService implements PersonDao {

    private static List<Person> DB = new ArrayList<Person>();
    private static List<String> list = new ArrayList<String>();

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Override
    public int insertPerson(UUID id, Person person) {
        DB.add(new Person(id, person.getName()));
        return 1;
    }

    @Override
    public int insertQuote(String title, String author, String quote, int chapter, Date date){
        chapter = 11;
        
        jdbcTemplate.update(
            "insert into quotes (book_title, author, quote, chapter, date) values(?,?,?,?,?)",
            title, author, quote, chapter, date);

        return 1;
    }

    @Override
    public List<Quote> getQuotes(List<Quote>list){

        String sql = "SELECT * FROM quotes";


        return(jdbcTemplate.query(
                sql,
                (rs, rowNum) ->
                        new Quote(
                                rs.getString("book_title"),
                                rs.getString("author"),
                                rs.getString("quote"),
                                rs.getInt("chapter"),
                                rs.getDate("date")
                        )
        ));
        
    }

    @Override
    public int insertBook(String booktitle, String author){
        return 1;
    }

    @Override
    public List<Book> getBooks(List<Book>list){

        String sql = "select * FROM books";

        list = jdbcTemplate.query(
                sql,
                (rs, rowNum) ->
                        new Book(
                                rs.getString("book_title"),
                                rs.getString("author")
                        ));
        
        return list;
    }

    @Override
    public boolean login(String email, String password){
        String sql = "select email, password from users where " + email + " = email;";
        
        String userEmail = jdbcTemplate.query(sql, rs.getString("email"));
        




        return false;
    }











    @Override
    public List<Person> selectAllPeople() {
        return DB;
    }

    @Override
    public String getCountryTotals() throws UnirestException{
        HttpResponse<String> response = Unirest.get("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php")
        .header("x-rapidapi-host", "coronavirus-monitor.p.rapidapi.com")
        .header("x-rapidapi-key", "297d53ca0cmsh8efec2eafa3848cp18bc1ajsnfab3cd3b11bb")
        .asString();

        return response.getBody();
    }

    @Override
    public String getTotals() throws UnirestException{

        HttpResponse<String> response = Unirest.get("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php")
        .header("x-rapidapi-host", "coronavirus-monitor.p.rapidapi.com")
        .header("x-rapidapi-key", "297d53ca0cmsh8efec2eafa3848cp18bc1ajsnfab3cd3b11bb")
        .asString();
        
        return response.getBody();
    }

} 