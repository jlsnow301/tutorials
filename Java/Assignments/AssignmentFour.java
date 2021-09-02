/**
 * @class AD300-5204
 * @quarter Fall 2019
 * @author Jeremiah Snow
 * @desc A method that prints two parallel
 * arrays without using built-in sorting methods.
 */
import java.util.Scanner;

public class AssignmentFour {
    public static void main(String[] args) {
        
        // First get the number of students
        Scanner scan = new Scanner(System.in);
        System.out.print("Enter the number of students: ");
        int numStudents = scan.nextInt();
        // Create parallel arrays
        String[] students = new String[numStudents];
        double[] grades = new double[numStudents];
        // Populate arrays
        for(int i = 0; i < numStudents; i++){
            System.out.print("Enter a student first name: ");
            students[i] = scan.next();
            System.out.print("Enter a grade: ");
            grades[i] = scan.nextInt();
        }
        
        // Print the arrays in descending order.
        double max = 0, current = 0;
        int index = 0, count = numStudents;
        System.out.println("Names in decreasing order of their grades are: ");
        // Set the highest
        for(int i = 0; i < numStudents; i++){
            if(grades[i] > max){
                max = grades[i];
                index = i;
            }
        }
        System.out.println(students[index] + " " + grades[index]);
        count--;
        
        // Now that we have the max, we can use i<max && i>current
        while(count > 0){
            for(int i = 0; i < numStudents; i++){
                if(grades[i] < max && grades[i] > current){
                    current = grades[i];
                    index = i;
                }
            }
            System.out.println(students[index] + " " + grades[index]);
            max = current;
            current = 0;
            count--;
        }
    }
}
