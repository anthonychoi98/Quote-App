
package com.Anthony.server.model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Quote{
    private String book_title;
    private String author;
    private String quote;
    private int chapter;
    private String comment;
    private Date date;

    public Quote(){
        this.book_title = "";
        this.author = "";
        this.quote = "";
        this.chapter = 0;
        this.comment = "";
        this.date = null;
    }

    public Quote(String book_title, String author, String quote, int chapter, String comment, Date date){
        this.book_title = book_title;
        this.author = author;
        this.quote = quote;
        this.chapter = chapter;
        this.comment = comment;
        this.date = date;
    }

    


}