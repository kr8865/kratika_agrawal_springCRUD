package com.example.student.repository;

import com.example.student.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentRepository {
    int save(Student student);
    List<Student> findAll(int limit, int offset, String search, String sortBy);
    Optional<Student> findById(Integer id);
    Optional<Student> findByEmail(String email);
    int update(Student student);
    int deleteById(Integer id);
}
