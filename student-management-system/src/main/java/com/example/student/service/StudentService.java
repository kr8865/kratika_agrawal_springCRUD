package com.example.student.service;

import com.example.student.dto.StudentRequest;
import com.example.student.model.Student;

import java.util.List;

public interface StudentService {
    void addStudent(StudentRequest request);
    List<Student> getAllStudents(int page, int size, String search, String sortBy);
    Student getStudentById(Integer id);
    void updateStudent(Integer id, StudentRequest request);
    void deleteStudent(Integer id);
}
