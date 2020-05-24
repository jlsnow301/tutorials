/**
 * @class AD300-5204
 * @quarter Fall 2019
 * @author Jeremiah Snow
 * @desc A method that accepts an array
 * and returns max using recursion.
 */
import java.util.Scanner;

public class AssignmentThree {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.print("Enter 7 integers, followed by a space: ");
        String inputLine = scan.nextLine();
        // Creating a second loop to avoid an endless while loop
        Scanner input = new Scanner(inputLine);
        int[] nums = new int[7];
        for(int i = 0; i < nums.length; i++)
            nums[i] = input.nextInt();
        System.out.println("The largest element is " + recursiveMax(nums));
    }
    
    // Recursive method passes the array and an index down
    public static int recursiveMax(int[] nums){
        return recursiveMax(nums, 0);
    }
    
    // Helper method finds the highest int using the index
    private static int recursiveMax(int[] nums, int index){
        if(index == nums.length)
            return 0;
        else
            return Math.max(nums[index], recursiveMax(nums, index + 1));
    }
    
}
