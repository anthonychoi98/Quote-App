// package com.Anthony.server.jwt;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.NoOpPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;

// public class SecurityConfigurer extends WebSecurityConfigurerAdapter {
    
//     @Autowired
//     private MyUserDetailsService myUserDetailsService;
    
//     @Override
//     protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//         auth.userDetailsService(myUserDetailsService).passwordEncoder(passwordEncode());
//     }

//     @Bean
//     public PasswordEncoder passwordEncode(){
//         return new BCryptPasswordEncoder();
//     }
    
// } 