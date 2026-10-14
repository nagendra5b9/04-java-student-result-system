package com.learning.students;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service managing Student Results using Java Collections:
 * - List (ArrayList) for sequence preservation
 * - Map (HashMap) for O(1) primary key lookup
 * - Map (TreeMap) for sorted aggregations
 * - Set (HashSet) for tracking distinct courses/departments
 * - Stream API for filtering, mapping, and summaries
 */
public class StudentResultSystem {
    private final List<Student> studentList = new ArrayList<>();
    private final Map<String, Student> studentMap = new HashMap<>();

    public void registerStudent(Student student) {
        if (studentMap.containsKey(student.getId())) {
            throw new IllegalArgumentException("Student ID already registered: " + student.getId());
        }
        studentList.add(student);
        studentMap.put(student.getId(), student);
    }

    public Student findById(String id) {
        return studentMap.get(id);
    }

    public List<Student> getAllStudents() {
        return new ArrayList<>(studentList);
    }

    /**
     * Demonstrates Collections.sort() using Comparable (Natural Rank).
     */
    public List<Student> getRankedLeaderboard() {
        List<Student> copy = new ArrayList<>(studentList);
        Collections.sort(copy); // uses compareTo (descending GPA)
        return copy;
    }

    /**
     * Demonstrates custom Comparator (Alphabetical by name).
     */
    public List<Student> getStudentsSortedByName() {
        return studentList.stream()
                .sorted(Comparator.comparing(Student::getName))
                .collect(Collectors.toList());
    }

    /**
     * Demonstrates grouping using Collectors.groupingBy().
     */
    public Map<String, List<Student>> groupByGrade() {
        return studentList.stream()
                .collect(Collectors.groupingBy(Student::getLetterGrade, TreeMap::new, Collectors.toList()));
    }

    public double getBatchAveragePercentage() {
        return studentList.stream()
                .mapToDouble(Student::getPercentage)
                .average()
                .orElse(0.0);
    }

    public long getPassCount() {
        return studentList.stream().filter(Student::isPassed).count();
    }

    public Set<String> getUniqueDepartments() {
        return studentList.stream()
                .map(Student::getDepartment)
                .collect(Collectors.toSet());
    }
}
