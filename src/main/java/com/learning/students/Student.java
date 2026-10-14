package com.learning.students;

import java.util.*;

/**
 * Represents a student with multiple subject scores.
 * Demonstrates: Map usage (subject -> marks), Set (enrolled subjects), and Comparable.
 */
public class Student implements Comparable<Student> {
    private final String id;
    private final String name;
    private final String department;
    private final Map<String, Integer> subjectMarks; // Subject -> Score (0-100)

    public Student(String id, String name, String department) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.subjectMarks = new LinkedHashMap<>();
    }

    public void addSubjectScore(String subject, int marks) {
        if (marks < 0 || marks > 100) {
            throw new IllegalArgumentException("Marks must be between 0 and 100.");
        }
        subjectMarks.put(subject, marks);
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public Map<String, Integer> getSubjectMarks() { return Collections.unmodifiableMap(subjectMarks); }

    public int getTotalMarks() {
        return subjectMarks.values().stream().mapToInt(Integer::intValue).sum();
    }

    public double getPercentage() {
        if (subjectMarks.isEmpty()) return 0.0;
        return (double) getTotalMarks() / subjectMarks.size();
    }

    public double getGpa() {
        double pct = getPercentage();
        if (pct >= 90) return 4.0;
        if (pct >= 80) return 3.5;
        if (pct >= 70) return 3.0;
        if (pct >= 60) return 2.5;
        if (pct >= 50) return 2.0;
        return 0.0;
    }

    public String getLetterGrade() {
        double pct = getPercentage();
        if (pct >= 90) return "A+";
        if (pct >= 80) return "A";
        if (pct >= 70) return "B";
        if (pct >= 60) return "C";
        if (pct >= 50) return "D";
        return "F";
    }

    public boolean isPassed() {
        // Must score at least 40 in each subject
        return subjectMarks.values().stream().allMatch(m -> m >= 40);
    }

    /**
     * Natural ordering: Descending by Total Marks / Percentage.
     */
    @Override
    public int compareTo(Student other) {
        return Double.compare(other.getPercentage(), this.getPercentage());
    }

    @Override
    public String toString() {
        return String.format("%-8s | %-16s | %-10s | %3d pts | %5.1f%% | Grade: %-2s | Status: %s",
                id, name, department, getTotalMarks(), getPercentage(), getLetterGrade(),
                (isPassed() ? "PASS" : "FAIL"));
    }
}
