/**
 * @author Jeremiah Snow
 * @class AD300-5204
 * @desc This method stores an
 *  array into a HashMap.
 */
import java.util.*;
import java.io.*;
public class AssignmentTwo {
    public static void main(String[] args) throws FileNotFoundException {
        // Create the scanners
        String[][] statesCapitals = new String[50][2];
        Scanner scan = new Scanner(new File("StatesCapitals.txt"));
        String line = "", state = "", capital = "", userInput = "";
        int count = 0;
        
        // Array population
        while(scan.hasNext()){
            line = scan.nextLine();
            StringTokenizer st = new StringTokenizer(line, "\t");
            state = st.nextToken();
            capital = st.nextToken();
            statesCapitals[count][0] = state;
            statesCapitals[count][1] = capital;
            count++;
        }
        // Convert to Hashmap
        Map<String, String> statesMap = new HashMap<>();
        for(int i = 0; i < statesCapitals.length; i++){
            statesMap.put(statesCapitals[i][0].toLowerCase(), 
                    statesCapitals[i][1].toLowerCase());
        }
        
        // Prompt user for input
        Scanner input = new Scanner(System.in);
        System.out.print("Type the name of a state, or type done to exit: ");
        userInput = input.next();
        userInput.toLowerCase();
        while(!userInput.equals("done")){
            if(statesMap.containsKey(userInput)){
                System.out.println("The capital of " + capitalizeWord(userInput)
                        + " is " + capitalizeWord(statesMap.get(userInput)) 
                        + ".");
            }    
            else
                System.out.println("No such state with the name " 
                        + capitalizeWord(userInput) + "!");
            System.out.println("\nType another state to continue, or type "
                        + "done to exit: ");
            userInput = input.next();    
        }
    }
    
    // Capitalizes names since we used toLowerCase()
    public static String capitalizeWord(String word){
        char initial = word.charAt(0);
        return Character.toUpperCase(initial) + word.substring(1);
    }
    
}
