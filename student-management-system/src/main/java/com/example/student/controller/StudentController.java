package com.example.student.controller;

import com.example.student.dto.ApiResponse;
import com.example.student.dto.StudentRequest;
import com.example.student.model.Student;
import com.example.student.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> addStudent(@Valid @RequestBody StudentRequest request) {
        studentService.addStudent(request);
        return new ResponseEntity<>(new ApiResponse<>("success", "Student added successfully", null), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Student>>> getAllStudents(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String sortBy) {
        
        List<Student> students = studentService.getAllStudents(page, size, search, sortBy);
        return ResponseEntity.ok(new ApiResponse<>("success", "Students fetched successfully", students));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Student>> getStudentById(@PathVariable Integer id) {
        Student student = studentService.getStudentById(id);
        return ResponseEntity.ok(new ApiResponse<>("success", "Student fetched successfully", student));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> updateStudent(
            @PathVariable Integer id, 
            @Valid @RequestBody StudentRequest request) {
        
        studentService.updateStudent(id, request);
        return ResponseEntity.ok(new ApiResponse<>("success", "Student updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteStudent(@PathVariable Integer id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok(new ApiResponse<>("success", "Student deleted successfully", null));
    }
}
