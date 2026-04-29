package com.example.student.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Student {
    private Integer id;
    private String name;
    private String email;
    private String course;
    private Timestamp createdAt;
}
