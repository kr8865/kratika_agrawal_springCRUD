package com.example.student.service;

import com.example.student.dto.StudentRequest;
import com.example.student.exception.DuplicateResourceException;
import com.example.student.exception.ResourceNotFoundException;
import com.example.student.model.Student;
import com.example.student.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Override
    public void addStudent(StudentRequest request) {
        log.info("Adding new student: {}", request.getEmail());
        if (studentRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new DuplicateResourceException("Student with email " + request.getEmail() + " already exists");
        }
        
        Student student = Student.builder()
                .name(request.getName())
                .email(request.getEmail())
                .course(request.getCourse())
                .build();
                
        studentRepository.save(student);
        log.info("Student added successfully");
    }

    @Override
    public List<Student> getAllStudents(int page, int size, String search, String sortBy) {
        log.info("Fetching students - page: {}, size: {}, search: {}, sortBy: {}", page, size, search, sortBy);
        int offset = (page - 1) * size;
        return studentRepository.findAll(size, offset, search, sortBy);
    }

    @Override
    public Student getStudentById(Integer id) {
        log.info("Fetching student with id: {}", id);
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    @Override
    public void updateStudent(Integer id, StudentRequest request) {
        log.info("Updating student with id: {}", id);
        Student existingStudent = getStudentById(id);

        if (!existingStudent.getEmail().equals(request.getEmail()) && 
            studentRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new DuplicateResourceException("Student with email " + request.getEmail() + " already exists");
        }

        existingStudent.setName(request.getName());
        existingStudent.setEmail(request.getEmail());
        existingStudent.setCourse(request.getCourse());

        studentRepository.update(existingStudent);
        log.info("Student updated successfully");
    }

    @Override
    public void deleteStudent(Integer id) {
        log.info("Deleting student with id: {}", id);
        Student existingStudent = getStudentById(id);
        studentRepository.deleteById(id);
        log.info("Student deleted successfully");
    }
}
