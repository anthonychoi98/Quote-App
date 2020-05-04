
package com.Anthony.server.model;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Quote{
    public String title;
    public String author;
    public String quote;
    public int chapter;
    public String comment;
    public String username;

    public Quote(){
        this.title = "";
        this.author = "";
        this.quote = "";
        this.chapter = 0;
        this.comment = "";
    }

    public Quote(String title, String author, String quote, int chapter, String comment, Date date, String username){
        this.title = title;
        this.author = author;
        this.quote = quote;
        this.chapter = chapter;
        this.comment = comment;
        this.username = username;
    }

    public Quote(String title, String author, String quote, int chapter, String comment, String username){
        this.title = title;
        this.author = author;
        this.quote = quote;
        this.chapter = chapter;
        this.comment = comment;
        this.username = username;
    }



    


}