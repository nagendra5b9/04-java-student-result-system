# Project 4: Collection Framework — Student Result System

## Overview
Demonstrates foundational Java Collections Framework structures:
- **`List<Student>` (ArrayList)**: Maintaining student result entries and supporting dynamic growth and index-based access.
- **`Map<String, Student>` (HashMap)**: $O(1)$ fast lookups by Unique Student ID.
- **`Map<String, Integer>` (LinkedHashMap)**: Maintaining subject name to score mappings in insertion order.
- **`Map<String, List<Student>>` (TreeMap)**: Aggregating and grouping students into sorted grade buckets (A+, A, B, C, D, F).
- **`Comparable<Student>` & `Comparator<Student>`**: Implementing natural performance sorting vs. custom criteria (alphabetical name, GPA).
- **Java Streams & Collectors**: Calculating class averages with `mapToDouble()`, filtering pass/fail students with predicates, and grouping with `Collectors.groupingBy()`.

## Directory Layout
```
04_collections_student_result/
├── src/main/java/com/learning/students/
│   ├── Student.java
│   ├── StudentResultSystem.java
│   └── StudentResultApplication.java
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── README.md
```

## Running the Java Application
```bash
javac -d bin src/main/java/com/learning/students/*.java
java -cp bin com.learning.students.StudentResultApplication
```
