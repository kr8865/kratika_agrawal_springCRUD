# Student Management System - Spring Boot & JDBC

A complete end-to-end Spring Boot backend application for a Student Management System using Spring JDBC (no Hibernate/ORM) and PostgreSQL.

## Features & Tech Stack
- **Java 17+** & **Spring Boot 3.2.x**
- **Spring Web** (REST APIs)
- **Spring JDBC (JdbcTemplate)** for database operations
- **PostgreSQL** Database
- **Maven** for dependency management
- **Layered Architecture**: Controller -> Service -> Repository -> Model
- **Validation**: `@Valid` constraints (non-empty, email format)
- **Exception Handling**: `@ControllerAdvice` for robust error responses
- **Logging**: SLF4J
- **Bonus Features**: Pagination, Search by Name, Sorting (by Name or Course), Timestamp (created_at)

## Folder Structure
```
student-management-system/
├── pom.xml
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── example/
        │           └── student/
        │               ├── StudentManagementSystemApplication.java
        │               ├── controller/
        │               │   └── StudentController.java
        │               ├── dto/
        │               │   ├── ApiResponse.java
        │               │   └── StudentRequest.java
        │               ├── exception/
        │               │   ├── DuplicateResourceException.java
        │               │   ├── GlobalExceptionHandler.java
        │               │   └── ResourceNotFoundException.java
        │               ├── model/
        │               │   └── Student.java
        │               ├── repository/
        │               │   ├── StudentRepository.java
        │               │   └── StudentRepositoryImpl.java
        │               └── service/
        │                   ├── StudentService.java
        │                   └── StudentServiceImpl.java
        └── resources/
            ├── application.properties
            └── schema.sql
```

## SQL Schema
```sql
CREATE DATABASE student_db;

-- Run this inside student_db
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    course VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Application Properties
Ensure you update your PostgreSQL credentials in `src/main/resources/application.properties` before running the app.

## Sample Postman Requests & API Responses

### 1. Add Student
- **Method:** `POST`
- **URL:** `http://localhost:8080/students`
- **Body (JSON):**
  ```json
  {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "course": "Computer Science"
  }
  ```
- **Response (201 Created):**
  ```json
  {
      "status": "success",
      "message": "Student added successfully",
      "data": null
  }
  ```

### 2. Get All Students (with Pagination, Search, and Sorting)
- **Method:** `GET`
- **URL:** `http://localhost:8080/students?page=1&size=10&search=John&sortBy=name`
- **Response (200 OK):**
  ```json
  {
      "status": "success",
      "message": "Students fetched successfully",
      "data": [
          {
              "id": 1,
              "name": "John Doe",
              "email": "john.doe@example.com",
              "course": "Computer Science",
              "createdAt": "2026-04-29T10:15:30.000+00:00"
          }
      ]
  }
  ```

### 3. Get Student By ID
- **Method:** `GET`
- **URL:** `http://localhost:8080/students/1`
- **Response (200 OK):**
  ```json
  {
      "status": "success",
      "message": "Student fetched successfully",
      "data": {
          "id": 1,
          "name": "John Doe",
          "email": "john.doe@example.com",
          "course": "Computer Science",
          "createdAt": "2026-04-29T10:15:30.000+00:00"
      }
  }
  ```

### 4. Update Student
- **Method:** `PUT`
- **URL:** `http://localhost:8080/students/1`
- **Body (JSON):**
  ```json
  {
      "name": "John Doe Updated",
      "email": "john.doe.updated@example.com",
      "course": "Software Engineering"
  }
  ```
- **Response (200 OK):**
  ```json
  {
      "status": "success",
      "message": "Student updated successfully",
      "data": null
  }
  ```

### 5. Delete Student
- **Method:** `DELETE`
- **URL:** `http://localhost:8080/students/1`
- **Response (200 OK):**
  ```json
  {
      "status": "success",
      "message": "Student deleted successfully",
      "data": null
  }
  ```

### 6. Error Response (Example: Validation Failure)
- **Method:** `POST`
- **URL:** `http://localhost:8080/students`
- **Body (JSON):**
  ```json
  {
      "name": "",
      "email": "invalid-email",
      "course": ""
  }
  ```
- **Response (400 Bad Request):**
  ```json
  {
      "status": "error",
      "message": "Validation failed",
      "data": {
          "name": "Name cannot be empty",
          "email": "Invalid email format",
          "course": "Course cannot be empty"
      }
  }
  ```
