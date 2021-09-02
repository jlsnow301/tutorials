/**
 * @class AD300-5204
 * @quarter Fall 2019
 * @author Jeremiah Snow
 * @desc A method that returns a copy and mirror
 * of a stack.
 */
import java.util.Stack;

public class AssignmentFive {
    public static void main(String[] args) {
        // Fill the original stack
        Stack<Integer> origStack = new Stack<>();
        int[] arr = {5, 8, 16, 7, 9};
        for(int i = 0; i < arr.length; i++)
            origStack.push(arr[i]);
        
        // Prints the stack
        System.out.println("The original stack is: " + origStack);
        // Return a copy
        System.out.println("The copied stack is: " + copyStack(origStack));
        // Re-prints the original (rebuilt)
        System.out.println("The original stack is: " + origStack);
        // Return a mirror
        System.out.println("The mirrored stack is: " + mirror(origStack));
    }
    
    // Copies the stack into a backup
    public static Stack copyStack(Stack origStack){
        Stack<Integer> temp = new Stack<>();
        Stack<Integer> newStack = new Stack<>();
        int index = 0;
        while(!origStack.isEmpty())
            temp.push((int) origStack.pop());
        while(!temp.isEmpty()){
            index = temp.pop();
            newStack.push(index);
            origStack.push(index);
        }
        return newStack;
    }
    
    // Mirrors the stack
    public static Stack mirror(Stack origStack){
        Stack<Integer> temp = new Stack<>();
        Stack<Integer> newStack = new Stack<>();
        int index = 0;
        while(!origStack.isEmpty())
            temp.push((int) origStack.pop());
        while(!temp.isEmpty()){
            index = temp.pop();
            newStack.push(index);
            origStack.push(index);
        }
        while(!origStack.isEmpty()){
            index = (int) origStack.pop();
            newStack.push(index);
        }
        return newStack;
    }
}
