package com.Anthony.server.jwt;

import com.Anthony.server.jwt.filters.JwtRequestFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
    public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
        @Autowired
        private UserDetailsService myUserDetailsService;
        @Autowired
        private JwtRequestFilter jwtRequestFilter;

        @Autowired
        public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
            auth.userDetailsService(myUserDetailsService).passwordEncoder(passwordEncode());
        }

        @Bean
        public PasswordEncoder passwordEncode(){
            return new BCryptPasswordEncoder();
        }

        @Override
        @Bean
        public AuthenticationManager authenticationManagerBean() throws Exception {
            return super.authenticationManagerBean();
        }

        @Override
        protected void configure(HttpSecurity httpSecurity) throws Exception {
            httpSecurity.csrf().disable()
                    .authorizeRequests().antMatchers("/authenticate").permitAll()
                    .antMatchers("/personInfo").permitAll()
                    .antMatchers("/signup").permitAll().
                            anyRequest().authenticated().and().

            addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class).exceptionHandling();

            httpSecurity.cors();
        }

    }