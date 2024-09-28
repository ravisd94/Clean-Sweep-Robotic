package com.example.clean_sweep_robotic;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "Hello World! This is the Clean Sweep Robotic Application.";
    }
}
