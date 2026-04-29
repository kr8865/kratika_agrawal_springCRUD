package com.example.student.repository;

import com.example.student.model.Student;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Repository
@RequiredArgsConstructor
public class StudentRepositoryImpl implements StudentRepository {

    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<Student> rowMapper = (rs, rowNum) -> Student.builder()
            .id(rs.getInt("id"))
            .name(rs.getString("name"))
            .email(rs.getString("email"))
            .course(rs.getString("course"))
            .createdAt(rs.getTimestamp("created_at"))
            .build();

    @Override
    public int save(Student student) {
        String sql = "INSERT INTO students (name, email, course) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, student.getName(), student.getEmail(), student.getCourse());
    }

    @Override
    public List<Student> findAll(int limit, int offset, String search, String sortBy) {
        StringBuilder sql = new StringBuilder("SELECT * FROM students");
        List<Object> params = new ArrayList<>();

        if (search != null && !search.trim().isEmpty()) {
            sql.append(" WHERE LOWER(name) LIKE LOWER(?)");
            params.add("%" + search + "%");
        }

        if (sortBy != null && !sortBy.trim().isEmpty()) {
            if (sortBy.equalsIgnoreCase("name")) {
                sql.append(" ORDER BY name ASC");
            } else if (sortBy.equalsIgnoreCase("course")) {
                sql.append(" ORDER BY course ASC");
            } else {
                sql.append(" ORDER BY id ASC");
            }
        } else {
            sql.append(" ORDER BY id ASC");
        }

        sql.append(" LIMIT ? OFFSET ?");
        params.add(limit);
        params.add(offset);

        return jdbcTemplate.query(sql.toString(), rowMapper, params.toArray());
    }

    @Override
    public Optional<Student> findById(Integer id) {
        String sql = "SELECT * FROM students WHERE id = ?";
        try {
            Student student = jdbcTemplate.queryForObject(sql, rowMapper, id);
            return Optional.ofNullable(student);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public Optional<Student> findByEmail(String email) {
        String sql = "SELECT * FROM students WHERE email = ?";
        try {
            Student student = jdbcTemplate.queryForObject(sql, rowMapper, email);
            return Optional.ofNullable(student);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public int update(Student student) {
        String sql = "UPDATE students SET name = ?, email = ?, course = ? WHERE id = ?";
        return jdbcTemplate.update(sql, student.getName(), student.getEmail(), student.getCourse(), student.getId());
    }

    @Override
    public int deleteById(Integer id) {
        String sql = "DELETE FROM students WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
