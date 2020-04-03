
package com.Anthony.server.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Book{
    private String id;
    private String book_title;
    private String author;

    public Book(){
        this.book_title = "";
        this.author = "";
    }

    public Book(String book_title, String author){
        this.book_title = book_title;
        this.author = author;
    }

    


}