package com.example.clean_sweep_robotic.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FloorController {

    @GetMapping("/floor")
    public String showFloor(Model model) {
        // Create a simple floor grid structure (2D array)
        String[][] floorGrid = {
            {"empty", "empty", "furniture", "empty", "empty"},
            {"empty", "furniture", "furniture", "furniture", "empty"},
            {"empty", "empty", "empty", "empty", "empty"},
            {"furniture", "empty", "furniture", "empty", "furniture"},
            {"empty", "empty", "empty", "empty", "empty"}
        };

        // Add the floor grid to the model
        model.addAttribute("floorGrid", floorGrid);

        return "floor"; // Return the name of the Thymeleaf template
    }

        @GetMapping("/start-vacuum")
    public String startVacuum(Model model) {
        return "";
    }
}
