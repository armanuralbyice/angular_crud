package com.alby.hotelservice.configs;


import com.alby.hotelservice.service.UserService;
import com.alby.hotelservice.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
     if(StringUtils.isEmpty(authHeader) || !authHeader.startsWith("Bearer ")) {
         filterChain.doFilter(request, response);
         return;
     }
     final String jwt;
     jwt= authHeader.substring(7);
     final String userEmail;
     userEmail = jwtUtil.extractUsername(jwt);
     if(StringUtils.isNotEmpty(userEmail) && SecurityContextHolder.getContext().getAuthentication() == null) {
         UserDetails userDetails = userService.userDetailsService().loadUserByUsername(userEmail);
         if(jwtUtil.validateToken(jwt, userDetails)) {
             SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
             UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                     userDetails, null, userDetails.getAuthorities()
             );
             authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
             securityContext.setAuthentication(authToken);
             SecurityContextHolder.setContext(securityContext);
         }
     }
     filterChain.doFilter(request, response);

    }
}