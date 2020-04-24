package com.Anthony.server.dao;
import com.Anthony.server.model.*;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;


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

    //autowire a bcryptpasswordencoder

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String hashPassword(String plainTextPassword){
		return BCrypt.hashpw(plainTextPassword, BCrypt.gensalt());
    }

    @Override
    public boolean checkPass(String plainPassword, String hashedPassword) {
		if (BCrypt.checkpw(plainPassword, hashedPassword)){
            System.out.println("The password matches.");
            return true;
        }
		else{
            System.out.println("The password does not match.");
            return false;
        }
	}

    @Override
    public int insertQuote(String title, String author, String quote, int chapter, String comment, Date date){
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
                                rs.getString("comment"),
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

                // if(checkPass(password, userPassword)){
                //     //return authentication token
                //      return data.append(username, userPassword);
                //  }
                person.setPassword(userPassword);
                person.setUsername(username);

                return new ResponseEntity<Person>(person, HttpStatus.OK);
                
        }

        return new ResponseEntity<Person>(person, HttpStatus.OK);
    }

    @Override
    public boolean login(String email, String password){
        System.out.println("email is " + email + " and pwd is : " + password);

        String sql = "select email from users where " + email + " = email;";
        
        boolean emailExists = jdbcTemplate.queryForObject("SELECT EXISTS(SELECT 1 FROM users WHERE email = '" + email + "');", Boolean.class);

        //if email exists, try to match passwords
        if(emailExists){
            String passwordQuery = "select password from users where email = '" + email + "';";
    
            String userPassword = (String) jdbcTemplate.queryForObject(
                passwordQuery, String.class);
        
           if(checkPass(password, userPassword)){
               //return authentication token
                return true;
            }
            else{
                //invalid password
                return false;
            }
        }

        return false;
    }

    @Override
    public boolean signup(String username, String email, String password){
        System.out.println("signing up...."  + username);

        String sql = "select email from users where " + email + " = email;";
        
        //NOT SURE WHAT EMAIL PARAMETER IS FOR NEW OBJECT CLASS

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