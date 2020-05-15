package com.Anthony.server.dao;
import com.Anthony.server.model.*;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.xml.ws.Response;

import org.json.JSONObject;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<HttpStatus> insertQuote(String title, String author, String quote, int chapter, String comment, String username){
        String sql = "insert into quotes (author, quote, chapter, comment, username, title) values('" + author + "','" + quote + "','" + chapter + "','" + comment + "','" + username + "','" + title + "')";

        int numofRowsAffected = jdbcTemplate.update(sql);
        
        if (numofRowsAffected > 0){
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        }

        return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<HttpStatus> deleteQuote(String title, String author, int chapter, String quote, String comment, String username){
        String sql = "DELETE FROM quotes WHERE title = '" + title + "' AND author = '" + author + "' AND chapter = '" + chapter + "' AND quote = '" + quote + "' AND comment = '" + comment + "' AND username = '" + username + "';";

        int numofRowsAffected = jdbcTemplate.update(sql);
        if (numofRowsAffected > 0){
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @Override
    public List<Quote> getQuotes(String title, String author, String username){

        String sql = "SELECT * FROM quotes WHERE username = '" + username + "' AND title ='" + title + "' AND author = '" + author + "';";

        return(jdbcTemplate.query(
                sql,
                (rs, rowNum) ->
                        new Quote(
                                rs.getString("title"),
                                rs.getString("author"),
                                rs.getString("quote"),
                                rs.getInt("chapter"),
                                rs.getString("comment"),
                                rs.getDate("date"),
                                rs.getString("username")
                        )
        ));
        
    }

    @Override
    public ResponseEntity<HttpStatus> insertBook(String title, String author, String username){
        int numofRowsAffected = jdbcTemplate.update(
                    "insert into books (title, author, username) values(?,?,?)",
                    title, author, username);

        if (numofRowsAffected > 0){
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<HttpStatus> deleteBook(String title, String author, String username){

        int numofRowsAffected = jdbcTemplate.update(
            "DELETE FROM books WHERE title = (?) AND author = (?) AND username = (?);", title, author, username);
        

        int num2 = jdbcTemplate.update(
            "DELETE FROM quotes WHERE title = (?) AND author = (?) AND username = (?);", title, author, username);

        if (numofRowsAffected > 0){
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @Override
    public List<Book> getBooks(String username){

        List<Book> list = new ArrayList<Book>();

        String sql = "select * FROM books where username = '" + username + "';";

        list = jdbcTemplate.query(
                sql,
                (rs, rowNum) ->
                        new Book(
                                rs.getString("title"),
                                rs.getString("author"),
                                rs.getString("username")
                        ));
        
        return list;
    }

    @Override 
    public ResponseEntity<Person>  personInfo(String username){
        Person person = new Person();

        System.out.println("username is " + username);
        String sql = "select username from users where " + username + " = username;";

        boolean userExists = jdbcTemplate.queryForObject("SELECT EXISTS(SELECT 1 FROM users WHERE username = '" + username + "');", Boolean.class);
        System.out.println(userExists);

        if(userExists){
            String passwordQuery = "select password from users where username = '" + username + "';";
    
            String userPassword = (String) jdbcTemplate.queryForObject(
                passwordQuery, String.class);

                person.setPassword(userPassword);
                person.setUsername(username);

                return new ResponseEntity<Person>(person, HttpStatus.OK);
                
        }

        return new ResponseEntity<Person>(person, HttpStatus.OK);
    }

    @Override
    public boolean signup(String username, String email, String password){
        System.out.println("signing up...."  + username);

        String sql = "select email from users where " + email + " = email;";
        
        boolean emailExists = jdbcTemplate.queryForObject("SELECT EXISTS(SELECT 1 FROM users WHERE email = '" + email + "');", Boolean.class);

        System.out.println("username  : " + username + " and email " + email);

        if(emailExists == false){
            jdbcTemplate.update(
            "insert into users (username, email, password) values(?,?,?)",
            username, email, password);
            return true;
        }

        System.out.println("email exists already");
        return false;
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