package com.example.clean_sweep_robotic.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "Hello SE-459! This is the Clean Sweep Robotic Application.";
    }
}
