import java.util.LinkedList;
import java.util.Queue;

/**
 * @class AD325-5207
 * @quarter Winter 2020
 * @author Jeremiah Snow
 * @desc A radix sort algorithm.
 */
public class RadixSort {
    
    // Main method demo
    public static void main(String[] args) {
        // Create the array
        int[] list = {7843, 4568, 8765, 6543, 7865, 
            4532, 9987, 3241,6589, 6622, 1211};
        System.out.println("List before sorting:");
        for(int i = 0; i < list.length; i++){
            System.out.print(list[i] + " ");
        }
        System.out.println();
        sortList(list);
        for(int j = 0; j < list.length; j++){
            System.out.print(list[j] + " ");
        }
    } // End main
    
    // Radix implementation
    public static void sortList(int[] list){
        String temp;
        Integer number;
        int maxNum; 
        int num;
    
        // Create the queue of buckets
        Queue<Integer>[] bucket = (LinkedList<Integer>[])(new LinkedList[10]);

        // Create the bucket instances
        for(int i = 0; i <= 9; i++){
            bucket[i] = (Queue<Integer>)(new LinkedList<Integer>());
        }
        
        // Loop through the digits
        for(int j = 0; j <= 3; j++){
            for (int x = 0; x < list.length; x++){
                temp = String.valueOf(list[x]);
                maxNum = Character.digit(temp.charAt(3-j), 10);
                bucket[maxNum].add(list[x]);
            }
            num = 0;
            // Adds the list to the buckets
            for (int i = 0; i <= 9; i++){
                while (!(bucket[i].isEmpty())){
                    number = bucket[i].remove();
                    list[num] = number;
                    num++;
                }
            }
        }

    } // End sortList
    
    /* Get digits in number - helper function
    public static int getDigits(int num){
        return (int) (Math.log10(num) + 1);
    } // End getDigits
    
    // Find highest digits in list - helper function
    public static int getMaxDigits(int[] list){
        int highest = list[0];
        for(int i = 0; i <  list.length; i++){
            if(list[i] > highest){
                highest = list[i];
            }
        }
        return getDigits(highest);
    }*/
}
