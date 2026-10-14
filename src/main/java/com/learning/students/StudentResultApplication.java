package com.learning.students;

import java.util.List;
import java.util.Map;

/**
 * Driver testing the Collection Framework Student Result System.
 */
public class StudentResultApplication {
    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("     JAVA COLLECTIONS: STUDENT RESULT SYSTEM      ");
        System.out.println("==================================================");

        StudentResultSystem system = new StudentResultSystem();

        // 1. Create and populate students with subject marks
        Student s1 = new Student("STU-101", "Aria Stark", "Computer Sci");
        s1.addSubjectScore("Mathematics", 95);
        s1.addSubjectScore("Data Structures", 92);
        s1.addSubjectScore("Algorithms", 88);
        s1.addSubjectScore("Database Systems", 94);

        Student s2 = new Student("STU-102", "Brandon Stark", "Robotics");
        s2.addSubjectScore("Mathematics", 78);
        s2.addSubjectScore("Robotics 101", 85);
        s2.addSubjectScore("Control Systems", 82);
        s2.addSubjectScore("Database Systems", 75);

        Student s3 = new Student("STU-103", "Daenerys Targaryen", "Aeronautics");
        s3.addSubjectScore("Mathematics", 89);
        s3.addSubjectScore("Aerodynamics", 96);
        s3.addSubjectScore("Thermodynamics", 91);
        s3.addSubjectScore("Avionics", 94);

        Student s4 = new Student("STU-104", "Jon Snow", "Computer Sci");
        s4.addSubjectScore("Mathematics", 62);
        s4.addSubjectScore("Data Structures", 58);
        s4.addSubjectScore("Algorithms", 64);
        s4.addSubjectScore("Database Systems", 70);

        Student s5 = new Student("STU-105", "Tyrion Lannister", "Economics");
        s5.addSubjectScore("Microeconomics", 98);
        s5.addSubjectScore("Game Theory", 99);
        s5.addSubjectScore("Econometrics", 92);
        s5.addSubjectScore("Financial Modeling", 95);

        system.registerStudent(s1);
        system.registerStudent(s2);
        system.registerStudent(s3);
        system.registerStudent(s4);
        system.registerStudent(s5);

        // 2. Display Leaderboard sorted by Collections.sort (Comparable)
        System.out.println("\n--- ACADEMIC LEADERBOARD (Sorted by Performance) ---");
        List<Student> leaderboard = system.getRankedLeaderboard();
        int rank = 1;
        for (Student s : leaderboard) {
            System.out.printf("Rank #%d | %s\n", rank++, s);
        }

        // 3. Batch Statistics via Streams
        System.out.println("\n--- BATCH STATISTICAL SUMMARY ---");
        System.out.printf("Total Enrolled Students: %d\n", system.getAllStudents().size());
        System.out.printf("Class Average Score:     %.2f%%\n", system.getBatchAveragePercentage());
        System.out.printf("Students Passing:        %d / %d (%.1f%%)\n",
                system.getPassCount(), system.getAllStudents().size(),
                ((double) system.getPassCount() / system.getAllStudents().size()) * 100);
        System.out.printf("Departments Represented: %s\n", system.getUniqueDepartments());

        // 4. Grouping by Grade (Map with List buckets)
        System.out.println("\n--- GRADE DISTRIBUTION BREAKDOWN ---");
        Map<String, List<Student>> gradeMap = system.groupByGrade();
        gradeMap.forEach((grade, students) -> {
            System.out.printf("Grade %-2s (%d students): %s\n", grade, students.size(),
                    students.stream().map(Student::getName).toList());
        });

        // 5. Direct Map Lookup (O(1))
        System.out.println("\n--- DIRECT MAP LOOKUP [ID: STU-103] ---");
        Student found = system.findById("STU-103");
        System.out.println("Result: " + found);
        System.out.println("Subject Marks Map: " + found.getSubjectMarks());
    }
}
