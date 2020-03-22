
package com.Anthony.server.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Totals{
    private int total_cases;
    private int total_deaths;
    private int total_recovered;
    private int new_cases;
    private int new_deaths;

    public Totals(@JsonProperty("total_cases")int total_cases, @JsonProperty("total_deaths")int total_deaths, @JsonProperty("total_recovered")int total_recovered,
    @JsonProperty("new_cases")int new_cases, @JsonProperty("new_deaths")int new_deaths){
        this.total_cases = total_cases;
        this.total_deaths = total_deaths;
        this.total_recovered = total_recovered;
        this.new_cases = new_cases;
        this.new_deaths = new_deaths;
    }

    


}