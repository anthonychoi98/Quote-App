
package com.Anthony.server.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Book{
    private String id;
    public String title;
    public String author;
    public String username;

    public Book(){
        this.title = "";
        this.author = "";
        this.username = "";
    }

    public Book(String title, String author, String username){
        this.title = title;
        this.author = author;
        this.username = username;
    }

    


}